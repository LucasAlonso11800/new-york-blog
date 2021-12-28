import React from 'react'
// Components
import Layout from '../../components/LayoutComponents/Layout';
import Main from '../../components/LayoutComponents/Main';
import Pagination from '../../components/Pagination'
import ArticlePreview from '../../components/ArticlePreview';
// Querys
import { getCategories, getLatestArticles, getMostVisitedArticles, getTotalArticleCount } from '../../ApolloClient/querys';
// Const
import { ARTICLE_LIMIT_PER_PAGE } from '../../const/Limits';
// Types
import { ArticleType, LayoutProps } from '../../types/Types';

type Props = {
    mainArticles: ArticleType[]
    layoutProps: LayoutProps
    index: number
    articleCount: number
};

export default function LatestArticlesPage({ mainArticles, layoutProps, index, articleCount }: Props) {
    return (
        <Layout {...layoutProps}>
            <Main>
                <>
                    {mainArticles.map((article, index) => {
                        return <ArticlePreview
                            key={article.id}
                            layout={index === 0 ? 'column' : 'row'}
                            title={article.title}
                            categoryName={article.categoryName}
                            categoryPath={article.categoryPath}
                            image={article.image}
                            authorName={article.authorName}
                            slug={article.slug}
                        />
                    })}
                </>
                <Pagination index={index} articleCount={articleCount} />
            </Main>
        </Layout>
    );
};

export async function getStaticPaths() {
    try {
        const articleCount = await getTotalArticleCount();
        const paths: { params: { index: string } }[] = [];

        for (let i = 0; i < Math.ceil(articleCount.data.getTotalArticleCount / ARTICLE_LIMIT_PER_PAGE); i++) {
            paths.push({
                params: {
                    index: (i + 1).toString()
                }
            })
        };
        return {
            paths,
            fallback: false
        }
    }
    catch (err) {
        console.log(err);
        return {
            paths: [],
            fallback: false
        }
    }

};

type GetStaticPropsParams = {
    params: {
        index: string
    },
};

export async function getStaticProps({ params }: GetStaticPropsParams) {
    try {
        const articleCount = await getTotalArticleCount();
        const articles = await getLatestArticles(parseInt(params.index));
        const asideArticles = await getMostVisitedArticles();
        const categories = await getCategories();

        return {
            props: {
                mainArticles: articles.data.getLatestArticles,
                layoutProps: {
                    asideArticles: asideArticles.data.getMostVisitedArticles,
                    title: "",
                    categories: categories.data.getCategories
                },
                index: parseInt(params.index),
                articleCount
            }
        }
    }
    catch (err) {
        console.log(err)
        return {
            props: {
                mainArticles: [],
                layoutProps: {
                    asideArticles: [],
                    title: "",
                    categories: []
                },
                index: parseInt(params.index),
                articleCount: 0
            }
        }
    }
};