import React from 'react';
// Components
import Main from '../../../components/LayoutComponents/Main';
import CategoryArticles from '../../../components/CategoryArticles';
import Pagination from '../../../components/Pagination';
import Layout from '../../../components/LayoutComponents/Layout';
// GraphQL
import { addApolloState, initializeApollo } from '../../../ApolloClient/NewApolloConfig';
import { useQuery } from '@apollo/client';
import { getCategories, getCategoryArticleCount, getCategoryArticles, getMetadata, getMostVisitedArticles, GET_CATEGORY_ARTICLES } from '../../../ApolloClient/querys';
// Types
import { CategoryType } from '../../../types/Types';

type Props = {
    category: CategoryType
    title: string
    articleCount: number
};

export default function CategoryPage({ category, title, articleCount }: Props) {
    const { data: { getCategoryArticles: articles } } = useQuery(GET_CATEGORY_ARTICLES, { variables: { categoryId: category.id, index: 1 } })
    return (
        <Layout title={title}>
            <Main>
                <CategoryArticles articles={articles} />
                <Pagination index={1} category={category.path} articleCount={articleCount} />
            </Main>
        </Layout>
    )
};

const client = initializeApollo();

export async function getStaticPaths() {
    const categories = await getCategories(client);
    return {
        paths: categories.data.getCategories.map((category: CategoryType) => {
            return {
                params: {
                    category: category.path
                }
            }
        }),
        fallback: false
    };

};

type GetStaticPropsParams = {
    params: {
        category: string,
    }
};

export async function getStaticProps({ params }: GetStaticPropsParams) {
    try {
        const categories = await getCategories(client);
        const category: CategoryType = categories.data.getCategories.find((category: CategoryType) => category.path === params.category);
        await getCategoryArticles(client, category.id, 1);
        const articleCount = await getCategoryArticleCount(client, category.id);

        await getMostVisitedArticles(client);
        await getMetadata(client);

        return addApolloState(client, {
            props: {
                articleCount: articleCount.data.getCategoryArticleCount,
                category,
                title: category.name + " - "
            }
        });
    }
    catch (err) {
        console.log(err);
        return addApolloState(client, {
            props: {
                articleCount: 0,
                category: {},
                title: ""
            }
        });
    }
};