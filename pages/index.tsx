import React from 'react';
// Components
import Layout from '../components/LayoutComponents/Layout';
import Main from '../components/LayoutComponents/Main';
import ArticlePreview from '../components/ArticlePreview';
import Pagination from '../components/Pagination';
// GraphQL
import { addApolloState, initializeApollo } from '../ApolloClient/NewApolloConfig';
import { useQuery } from '@apollo/client';
import { getCategories, getLatestArticles, getMetadata, getMostVisitedArticles, GET_LATEST_ARTICLES } from '../ApolloClient/querys';
// Types
import { ArticleType } from '../types/Types';

export default function HomePage() {
    const { data: { getLatestArticles: articles } } = useQuery(GET_LATEST_ARTICLES, { variables: { index: 1 } });

    return (
        <Layout title="">
            <Main>
                {articles.map((article: ArticleType, index: number) => {
                    return <ArticlePreview
                        key={article.id}
                        layout={index === 0 ? 'column' : 'row'}
                        title={article.title}
                        categoryName={article.categoryName}
                        categoryPath={article.categoryPath}
                        image={article.image}
                        authorName={article.authorName}
                        slug={article.slug}
                        description={article.description}
                    />
                })}
                <Pagination index={1} />
            </Main>
        </Layout>
    )
};

export async function getStaticProps() {
    const client = initializeApollo();
    try {
        await getLatestArticles(client, 1);
        await getMostVisitedArticles(client);
        await getCategories(client);
        await getMetadata(client);

        return addApolloState(client, {
            props: {}
        });
    }
    catch (err) {
        console.log(err)
        return addApolloState(client, {
            props: {}
        });
    }
};