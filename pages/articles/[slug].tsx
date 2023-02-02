import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
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
import { getAdjacentArticles, getAllArticles, getArticleComponents, getCategories, getMetadata, getMostVisitedArticles, getRelatedArticles, getSingleArticle, GET_ARTICLE_COMMENTS } from '../../ApolloClient/querys';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from '../../ApolloClient/NewApolloConfig';
import { ADD_VISIT } from '../../ApolloClient/mutations';
// Types
import { ArticleComponentType, ArticleStatus, ArticleType, CommentType } from '../../types/Types';

type Props = {
    article: ArticleType
    relatedArticles: ArticleType[]
    adjacentArticles: ArticleType[]
    articleComponents: ArticleComponentType[]
    error: ApolloError
};

export default function ArticlePage({ article, relatedArticles, adjacentArticles, articleComponents, error }: Props) {
    const { setToastInfo } = useContext(GlobalContext);
    const [addVisit] = useMutation(ADD_VISIT);

    useEffect(() => {
        if (error) setToastInfo({ open: true, message: error.message, type: 'error' });
    }, []);

    const { data } = useQuery(GET_ARTICLE_COMMENTS, {
        variables: { articleId: article.id }
    });
    const comments: CommentType[] = data?.getArticleComments || [];

    useEffect(() => {
        addVisit({ variables: { articleId: article.id } });
    }, [article.id]);

    return (
        <Layout title={article.title + " - "}>
            <Main>
                <MainArticle
                    {...article}
                    articleComponents={articleComponents}
                    commentCount={comments ? comments.length : 0}
                />
                <ExternalLinksSection />
                <AdjacentArticles articles={adjacentArticles} />
                <RelatedArticles articles={relatedArticles} />
                {comments && comments.length > 0 ? <CommentSection comments={comments} articleId={article.id} /> : <></>}
                <CommentForm articleId={article.id} author={null} isResponse='N' isResponseToCommentId={null} setFormOpen={null} />
            </Main>
        </Layout>
    )
};

const client = initializeApollo();
export async function getStaticPaths() {
    const articles = await getAllArticles(client, ArticleStatus.ACCEPTED);

    return {
        paths: articles.data.getAllArticles.map((article: ArticleType) => ({
            params: { slug: article.slug }
        })),
        fallback: 'blocking'
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
        const [relatedArticles, adjacentArticles, articleComponents] = await Promise.all([
            await getRelatedArticles(client, article.data.getSingleArticle.categoryId),
            await getAdjacentArticles(client, article.data.getSingleArticle.id),
            await getArticleComponents(client, article.data.getSingleArticle.id),
            await getMostVisitedArticles(client),
            await getCategories(client),
            await getMetadata(client)
        ]);

        return addApolloState(client, {
            props: {
                article: article.data.getSingleArticle,
                relatedArticles: relatedArticles.data.getRelatedArticles,
                adjacentArticles: adjacentArticles.data.getAdjacentArticles,
                articleComponents: articleComponents.data.getArticleComponents,
            },
            revalidate: 60 * 60 * 24
        });
    }
    catch (err) {
        console.log(JSON.stringify(err, null, 2));;
        return addApolloState(client, {
            props: {
                article: {},
                relatedArticles: [],
                adjacentArticles: [],
                articleComponents: [],
                error: JSON.parse(JSON.stringify(err))
            }
        });
    }
};