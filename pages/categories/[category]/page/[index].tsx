import React from 'react'
// Components
import CategoryArticles from '../../../../components/CategoryArticles';
import Layout from '../../../../components/LayoutComponents/Layout';
import Main from '../../../../components/LayoutComponents/Main';
import Pagination from '../../../../components/Pagination';
// GraphQL
import { getCategories, getCategoryArticleCount, getCategoryArticles, getMetadata, getMostVisitedArticles, getTotalArticleCount, GET_CATEGORY_ARTICLES } from '../../../../ApolloClient/querys';
import { addApolloState, initializeApollo } from '../../../../ApolloClient/NewApolloConfig';
import { useQuery } from '@apollo/client';
// Const
import { CATEGORY_ARTICLE_LIMIT } from '../../../../const/Limits';
// Types
import { ArticleType, CategoryType } from '../../../../types/Types';

type Props = {
    category: CategoryType
    articleCount: number
    title: string
    index: number
    articles: ArticleType[]
};

export default function CategoryPage({ category, articleCount, title, index, articles }: Props) {
    return (
        <Layout title={title}>
            <Main>
                <CategoryArticles articles={articles} />
                <Pagination index={index} category={category.path} articleCount={articleCount} />
            </Main>
        </Layout>
    )
};

const client = initializeApollo();

export async function getStaticPaths() {
    const categories = await getCategories(client);
    const articleCount = await getTotalArticleCount(client);

    const paths: { params: { index: string, category: string } }[] = [];

    categories.data.getCategories.forEach((category: CategoryType) => {
        for (let i = 0; i < Math.ceil(articleCount.data.getTotalArticleCount / CATEGORY_ARTICLE_LIMIT); i++) {
            paths.push({
                params: {
                    index: (i + 1).toString(),
                    category: category.path
                },
            })

        }
    });

    return {
        paths,
        fallback: false
    };
};

type GetStaticPropsParams = {
    params: {
        category: string
        index: string
    }
}

export async function getStaticProps({ params }: GetStaticPropsParams) {
    try {
        const categories = await getCategories(client);
        const category: CategoryType = categories.data.getCategories.find((category: CategoryType) => category.path === params.category);
        const articles = await getCategoryArticles(client, category.id, parseInt(params.index));
        const articleCount = await getCategoryArticleCount(client, category.id);

        await getMostVisitedArticles(client);
        await getMetadata(client);

        return addApolloState(client, {
            props: {
                category,
                title: category.name + " - ",
                articleCount: articleCount.data.getCategoryArticleCount,
                index: parseInt(params.index),
                articles: articles.data.getCategoryArticles
            }
        });
    }
    catch (err) {
        console.log(err);
        return addApolloState(client, {
            props: {
                category: {},
                title: "",
                articleCount: 0,
                index: parseInt(params.index),
                articles: [],
                error: JSON.parse(JSON.stringify(err))
            }
        })
    };
};