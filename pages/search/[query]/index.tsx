import React from 'react';
// Components
import ArticlePreview from '../../../components/ArticlePreview';
import Layout from '../../../components/LayoutComponents/Layout';
import Main from '../../../components/LayoutComponents/Main';
import Pagination from '../../../components/Pagination';
import SearchPageTitle from '../../../components/SearchPageTitle';
// GraphQL
import { useQuery } from '@apollo/client';
import { getCategories, getMetadata, getMostVisitedArticles, getSearchedArticleCount, getSearchedArticles, GET_SEARCHED_ARTICLES } from '../../../ApolloClient/querys';
import { addApolloState, initializeApollo } from '../../../ApolloClient/NewApolloConfig';
// Types
import { ArticleType } from '../../../types/Types';
import { GetServerSidePropsContext } from 'next';

type Props = {
    index: number
    articleCount: number
    search: string
    title: string
};

export default function SearchPage({ title, index, articleCount, search }: Props) {
    const { data: { getSearchedArticles: articles } } = useQuery(GET_SEARCHED_ARTICLES, { variables: { search, index } });

    return (
        <Layout title={title}>
            <Main>
                <SearchPageTitle search={search} />
                {articles.map((article: ArticleType) => {
                    return <ArticlePreview
                        key={article.id}
                        layout='row'
                        title={article.title}
                        categoryName={article.categoryName}
                        categoryPath={article.categoryPath}
                        image={article.image}
                        authorName={article.authorName}
                        slug={article.slug}
                        description={article.description}
                    />
                })}
                <Pagination index={index} articleCount={articleCount} search={search} />
            </Main>
        </Layout>
    )
};

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    const client = initializeApollo();
    try {
        const articleCount = await getSearchedArticleCount(client, query.query as string);
        await getSearchedArticles(client, query.query as string, 1);
        await getMostVisitedArticles(client);
        await getCategories(client);
        await getMetadata(client);

        return addApolloState(client, {
            props: {
                title: `You searched for ${query.query} - `,
                index: 1,
                articleCount: articleCount.data.getSearchedArticleCount,
                search: query.query
            }
        });
    }
    catch (err) {
        console.log(JSON.stringify(err, null, 2));;
        return {
            props: {
                title: "",
                index: 1,
                articleCount: 0,
                search: ""
            }
        }
    }
};