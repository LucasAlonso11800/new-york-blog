import React from 'react'
// Components
import CategoryArticles from '../../../../components/CategoryArticles';
import Layout from '../../../../components/LayoutComponents/Layout';
import Main from '../../../../components/LayoutComponents/Main';
import Pagination from '../../../../components/Pagination';
// Querys
import { getCategories, getCategoryArticleCount, getCategoryArticles, getMetadata, getMostVisitedArticles, getTotalArticleCount } from '../../../../ApolloClient/querys';
// Const
import { DEFAULT_METADATA } from '../../../../const/defaultMetadata';
import { CATEGORY_ARTICLE_LIMIT } from '../../../../const/Limits';
// Types
import { ArticleType, CategoryType, LayoutProps } from '../../../../types/Types';

type Props = {
    category: string
    categoryArticles: ArticleType[]
    categoryArticleCount: number
    layoutProps: LayoutProps
    index: number
};

export default function CategoryPage({ category, categoryArticles, categoryArticleCount, layoutProps, index }: Props) {
    return (
        <Layout {...layoutProps}>
            <Main>
                <CategoryArticles articles={categoryArticles} />
                <Pagination index={index} category={category} articleCount={categoryArticleCount} />
            </Main>
        </Layout>
    )
};

export async function getStaticPaths() {
    const categories = await getCategories();
    const articleCount = await getTotalArticleCount();
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
    console.log(paths)
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
    const title = params.category.substring(0, 1).toUpperCase() + params.category.substring(1) + " - ";
    try {
        const categories = await getCategories();
        const category: CategoryType = categories.data.getCategories.find((category: CategoryType) => category.path === params.category);
        const categoryArticles = await getCategoryArticles(category.id, parseInt(params.index));
        const categoryArticleCount = await getCategoryArticleCount(category.id);

        const asideArticles = await getMostVisitedArticles();
        const metadata = await getMetadata();

        return {
            props: {
                category: params.category,
                categoryArticles: categoryArticles.data.getCategoryArticles,
                categoryArticleCount: categoryArticleCount.data.getCategoryArticleCount,
                layoutProps: {
                    asideArticles: asideArticles.data.getMostVisitedArticles,
                    title,
                    categories: categories.data.getCategories,
                    ...metadata
                },
                index: parseInt(params.index)
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
                    categories: [],
                    ...DEFAULT_METADATA
                },
                index: parseInt(params.index)
            }
        }
    }
};