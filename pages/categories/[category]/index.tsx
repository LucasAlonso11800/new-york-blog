import React from 'react';
// Components
import Main from '../../../components/LayoutComponents/Main';
import CategoryArticles from '../../../components/CategoryArticles';
import Pagination from '../../../components/Pagination';
import Layout from '../../../components/LayoutComponents/Layout';
// Querys
import { getCategories, getCategoryArticleCount, getCategoryArticles, getMostVisitedArticles } from '../../../ApolloClient/querys';
// Types
import { ArticleType, CategoryType, LayoutProps } from '../../../types/Types';

type Props = {
    category: string
    categoryArticles: ArticleType[]
    categoryArticleCount: number
    layoutProps: LayoutProps
};

export default function CategoryPage({ category, categoryArticles, categoryArticleCount, layoutProps }: Props) {
    return (
        <Layout {...layoutProps}>
            <Main>
                <CategoryArticles articles={categoryArticles} />
                <Pagination index={1} category={category} articleCount={categoryArticleCount}/>
            </Main>
        </Layout>
    )
};

export async function getStaticPaths() {
    const categories = await getCategories();
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
    const title = params.category.substring(0, 1).toUpperCase() + params.category.substring(1) + " - ";
    try {
        const categories = await getCategories();
        const category: CategoryType = categories.data.getCategories.find((category: CategoryType) => category.path === params.category);
        const categoryArticles = await getCategoryArticles(category.id, 1);
        const categoryArticleCount = await getCategoryArticleCount(category.id);

        const asideArticles = await getMostVisitedArticles();

        return {
            props: {
                category: params.category,
                categoryArticles: categoryArticles.data.getCategoryArticles,
                categoryArticleCount: categoryArticleCount.data.getCategoryArticleCount,
                layoutProps: {
                    asideArticles: asideArticles.data.getMostVisitedArticles,
                    title,
                    categories: categories.data.getCategories
                }
            }
        };
    }
    catch (err) {
        console.log(err);
        return {
            props: {
                category: params.category,
                categoryArticles: [],
                categoryArticleCount: 0,
                layoutProps: {
                    asideArticles: [],
                    title,
                    categories: []
                }
            }
        }
    }
};