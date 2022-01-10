import React, { useEffect } from 'react';
// Components
import Layout from '../../components/LayoutComponents/Layout';
import Main from '../../components/LayoutComponents/Main';
import MainArticle from '../../components/MainArticle';
import RelatedArticles from '../../components/RelatedArticles';
import CommentSection from '../../components/CommentSection';
import AdjacentArticles from '../../components/AdjacentArticles';
import CommentForm from '../../components/CommentForm';
import ExternalLinksSection from '../../components/ExternalLinksSection';
// Querys
import { getAdjacentArticles, getAllArticles, getArticleComments, getArticleComponents, getCategories, getMetadata, getMostVisitedArticles, getRelatedArticles, getSingleArticle, GET_ADJACENT_ARTICLES, GET_ARTICLE_COMMENTS, GET_ARTICLE_COMPONENTS, GET_RELATED_ARTICLES, GET_SINGLE_ARTICLE } from '../../ApolloClient/querys';
import { useMutation, useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from '../../ApolloClient/NewApolloConfig';
import { ADD_VISIT } from '../../ApolloClient/mutations';
// Types
import { ArticleType } from '../../types/Types';

type Props = {
    slug: string
}

export default function ArticlePage(props: Props) {
    const [addVisit] = useMutation(ADD_VISIT);

    const { data: { getSingleArticle: mainArticle } } = useQuery(GET_SINGLE_ARTICLE, { variables: { slug: props.slug } });
    const { data: { getArticleComments: comments } } = useQuery(GET_ARTICLE_COMMENTS, { variables: { articleId: mainArticle.id } });
    const { data: { getArticleComponents: articleComponents } } = useQuery(GET_ARTICLE_COMPONENTS, { variables: { articleId: mainArticle.id } });
    const { data: { getAdjacentArticles: adjacentArticles } } = useQuery(GET_ADJACENT_ARTICLES, { variables: { id: mainArticle.id } });
    const { data: { getRelatedArticles: relatedArticles } } = useQuery(GET_RELATED_ARTICLES, { variables: { categoryId: mainArticle.categoryId } });

    useEffect(() => {
        addVisit({ variables: { articleId: mainArticle.id } });
    }, [mainArticle.id]);

    return (
        <Layout title={mainArticle.title}>
            <Main>
                <MainArticle
                    title={mainArticle.title}
                    categoryName={mainArticle.categoryName}
                    categoryPath={mainArticle.categoryPath}
                    image={mainArticle.image}
                    authorName={mainArticle.authorName}
                    articleComponents={articleComponents}
                    createdAt={mainArticle.createdAt}
                    commentCount={comments ? comments.length : 0}
                />
                <ExternalLinksSection />
                <AdjacentArticles articles={adjacentArticles} />
                <RelatedArticles articles={relatedArticles} />
                {comments && comments.length > 0 ? <CommentSection comments={comments} articleId={mainArticle.id} /> : <></>}
                <CommentForm articleId={mainArticle.id} author={null} isResponse='N' isResponseToCommentId={null} setFormOpen={null} />
            </Main>
        </Layout>
    )
};

const client = initializeApollo();
export async function getStaticPaths() {
    const articles = await getAllArticles(client);

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
        const article = await getSingleArticle(client, params.slug);
        await getRelatedArticles(client, article.data.getSingleArticle.categoryId);
        await getAdjacentArticles(client, article.data.getSingleArticle.id);
        await getArticleComponents(client, article.data.getSingleArticle.id);
        await getArticleComments(client, article.data.getSingleArticle.id);
        await getMostVisitedArticles(client);
        await getCategories(client);
        await getMetadata(client);

        return addApolloState(client, {
            props: {
                slug: params.slug,
            }
        });
    }
    catch (err) {
        console.log(err);
        addApolloState(client, {
            props: {
                slug: params.slug,
            }
        });
    }
};