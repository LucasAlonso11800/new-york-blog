import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
// Components
import Layout from '../components/LayoutComponents/Layout';
import Main from '../components/LayoutComponents/Main';
import ArticlePreview from '../components/ArticlePreview';
import Pagination from '../components/Pagination';
// GraphQL
import { addApolloState, initializeApollo } from '../ApolloClient/NewApolloConfig';
import { getCategories, getLatestArticles, getMetadata, getMostVisitedArticles } from '../ApolloClient/querys';
import { ApolloError } from '@apollo/client'
// Types
import { ArticleStatus, ArticleType } from '../types/Types';

type Props = {
    articles: ArticleType[],
    error: ApolloError
};

export default function HomePage({ articles, error }: Props) {
    const { setToastInfo } = useContext(GlobalContext);
    
    useEffect(() => {
        if (error) setToastInfo({ open: true, message: error.message, type: 'error' });
    }, []);

    return (
        <Layout title="">
            <Main>
                {articles.map((article, index) => (
                    <ArticlePreview
                        key={article.id}
                        layout={index === 0 ? 'column' : 'row'}
                        {...article}
                    />
                ))}
                <Pagination index={1} />
            </Main>
        </Layout>
    )
};

export async function getStaticProps() {
    const client = initializeApollo();
    try {
        const articles = await getLatestArticles(client, 1, ArticleStatus.ACCEPTED);
        await Promise.all([
            await getMostVisitedArticles(client),
            await getCategories(client),
            await getMetadata(client)
        ]);

        return addApolloState(client, {
            props: {
                articles: articles.data.getLatestArticles
            },
            revalidate: 60 * 60 * 24
        });
    }
    catch (err: any) {
        console.log(JSON.stringify(err, null, 2));
        return addApolloState(client, {
            props: {
                articles: [],
                error: JSON.parse(JSON.stringify(err))
            }
        });
    }
};