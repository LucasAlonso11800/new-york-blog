import React, { useEffect, useState } from 'react';
// Components
import Layout from '../../components/LayoutComponents/Layout';
import Main from '../../components/LayoutComponents/Main';
import MainArticle from '../../components/MainArticle';
import RelatedArticles from '../../components/RelatedArticles';
import CommentSection from '../../components/CommentSection';
import AdjacentArticles from '../../components/AdjacentArticles';
import CommentForm from '../../components/CommentForm';
// Querys
import { getAdjacentArticles, getAllArticles, getArticleComments, getArticleComponents, getCategories, getMetadata, getMostVisitedArticles, getRelatedArticles, getSingleArticle, GET_ARTICLE_COMMENTS } from '../../ApolloClient/querys';
// Mutations
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_VISIT } from '../../ApolloClient/mutations';
// Const
import { DEFAULT_METADATA } from '../../const/defaultMetadata';
// Types
import { ArticleComponentType, ArticleType, CommentType, LayoutProps } from '../../types/Types';
import LoadingIcon from '../../components/LoadingIcon';

type Props = {
    mainArticle: ArticleType
    layoutProps: LayoutProps
    articleComponents: ArticleComponentType[]
    relatedArticles: ArticleType[]
    adjacentArticles: ArticleType[]
    comments: CommentType[]
};

export default function ArticlePage(props: Props) {
    const { mainArticle, layoutProps, articleComponents, relatedArticles, adjacentArticles } = props;
    
    const [comments, setComments] = useState<CommentType[]>(props.comments);

    const [addVisit] = useMutation(ADD_VISIT);
    const [getComments, { loading }] = useLazyQuery(GET_ARTICLE_COMMENTS, {
        onCompleted: (result) => setComments(result.getArticleComments)
    });

    useEffect(() => {
        addVisit({
            variables: {
                articleId: mainArticle.id
            }
        });
    }, [mainArticle.id]);

    return (
        <Layout {...layoutProps}>
            <Main>
                <MainArticle
                    title={mainArticle.title}
                    categoryName={mainArticle.categoryName}
                    categoryPath={mainArticle.categoryPath}
                    image={mainArticle.image}
                    authorName={mainArticle.authorName}
                    articleComponents={articleComponents}
                />
                <AdjacentArticles articles={adjacentArticles} />
                <RelatedArticles articles={relatedArticles} />
                {loading ? <LoadingIcon /> : <></>}
                {!loading && comments && comments.length > 0 ? <CommentSection comments={comments} articleId={mainArticle.id} /> : <></>}
                <CommentForm articleId={mainArticle.id} author={null} isResponse='N' isResponseToCommentId={null} setFormOpen={null} getComments={getComments}/>
            </Main>
        </Layout>
    )
};

export async function getStaticPaths() {
    const articles = await getAllArticles();

    return {
        paths: articles.data.getAllArticles.map((article: ArticleType) => {
            return {
                params: {
                    slug: article.slug
                }
            }
        }),
        fallback: false
    };

};

type GetStaticPropsParams = {
    params: {
        slug: string,
    }
}

export async function getStaticProps({ params }: GetStaticPropsParams) {
    try {
        const article = await getSingleArticle(params.slug);
        const relatedArticles = await getRelatedArticles(article.data.getSingleArticle.categoryId);
        const adjacentArticles = await getAdjacentArticles(article.data.getSingleArticle.id);
        const components = await getArticleComponents(article.data.getSingleArticle.id);
        const comments = await getArticleComments(article.data.getSingleArticle.id);
        const asideArticles = await getMostVisitedArticles();
        const categories = await getCategories();
        const metadata = await getMetadata();

        return {
            props: {
                mainArticle: article.data.getSingleArticle,
                relatedArticles: relatedArticles.data.getRelatedArticles,
                adjacentArticles: adjacentArticles.data.getAdjacentArticles,
                articleComponents: components.data.getArticleComponents,
                comments: comments.data.getArticleComments,
                layoutProps: {
                    asideArticles: asideArticles.data.getMostVisitedArticles,
                    title: article.data.getSingleArticle.title + " - ",
                    categories: categories.data.getCategories,
                    ...metadata
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        return {
            props: {
                mainArticle: {},
                relatedArticles: [],
                adjacentArticles: [],
                articleComponents: [],
                comments: [],
                layoutProps: {
                    asideArticles: [],
                    title: "",
                    categories: [],
                    ...DEFAULT_METADATA
                }
            }
        }
    }
};