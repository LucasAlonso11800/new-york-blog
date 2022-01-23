import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
// Components
import Layout from '../components/LayoutComponents/Layout';
import Main from '../components/LayoutComponents/Main';
import MainArticle from '../components/MainArticle';
// GraphQL
import { getArticleComponents, getCategories, getMetadata, getMostVisitedArticles, getSingleArticle } from '../ApolloClient/querys';
import { ApolloError } from '@apollo/client';
import { addApolloState, initializeApollo } from '../ApolloClient/NewApolloConfig';
// Types
import { ArticleComponentType, ArticleType } from '../types/Types';

type Props = {
    article: ArticleType
    articleComponents: ArticleComponentType[]
    error: ApolloError
};

export default function AboutPage({ article, articleComponents, error }: Props) {
    const { setToastInfo } = useContext(GlobalContext);
    useEffect(() => {
        if (error) setToastInfo({ open: true, message: error.message, type: 'error' });
    }, []);

    return (
        <Layout title="About - ">
            <Main>
                <MainArticle
                    title={article.title}
                    image={article.image}
                    articleComponents={articleComponents}
                    categoryName=""
                    categoryPath=""
                    authorName=""
                    createdAt={article.createdAt}
                    commentCount={0}
                />
            </Main>
        </Layout>
    )
};

export async function getStaticProps() {
    const client = initializeApollo();
    try {
        const article = await getSingleArticle(client, "about");
        const [articleComponents] = await Promise.all([
            await getArticleComponents(client, article.data.getSingleArticle.id),
            await getMostVisitedArticles(client),
            await getCategories(client),
            await getMetadata(client)
        ]);

        return addApolloState(client, {
            props: {
                article: article.data.getSingleArticle,
                articleComponents: articleComponents.data.getArticleComponents
            },
            revalidate: 60 * 60 * 24
        });
    }
    catch (err) {
        console.log(JSON.stringify(err, null, 2));
        return addApolloState(client, {
            props: {
                article: {},
                articleComponents: [],
                error: JSON.parse(JSON.stringify(err))
            }
        });
    }
};