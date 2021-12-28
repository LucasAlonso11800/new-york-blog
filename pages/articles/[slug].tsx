import React from 'react';
// Components
import Layout from '../../components/LayoutComponents/Layout';
import Main from '../../components/LayoutComponents/Main';
import MainArticle from '../../components/MainArticle';
// Querys
import { getAllArticles, getArticleComponents, getMostVisitedArticles, getSingleArticle } from '../../Apollo/querys';
// Types
import { ArticleComponentType, ArticleType, LayoutProps } from '../../types/Types';

type Props = {
    mainArticle: ArticleType
    layoutProps: LayoutProps
    articleComponents: ArticleComponentType[]
};

export default function ArticlePage({ mainArticle, layoutProps, articleComponents }: Props) {
    return (
        <Layout {...layoutProps}>
            <Main>
                <MainArticle
                    title={mainArticle.title}
                    categoryName={mainArticle.categoryName}
                    categoryPath={mainArticle.categoryPath}
                    image={mainArticle.image}
                    authorName={mainArticle.authorName}
                    articleComponents={articleComponents}
                />
            </Main>
        </Layout>
    )
};

export async function getStaticPaths() {
    const articles = await getAllArticles();

    return {
        paths: articles.data.getAllArticles.map((article: ArticleType) => {
            return {
                params: {
                    slug: article.slug
                }
            }
        }),
        fallback: false
    };

};

type GetStaticPropsParams = {
    params: {
        slug: string,
    }
}

export async function getStaticProps({ params }: GetStaticPropsParams) {
    try {
        const article = await getSingleArticle(params.slug);
        const asideArticles = await getMostVisitedArticles();
        const components = await getArticleComponents(article.data.getSingleArticle.id);

        return {
            props: {
                mainArticle: article.data.getSingleArticle,
                layoutProps: {
                    asideArticles: asideArticles.data.getMostVisitedArticles,
                    title: article.data.getSingleArticle.title + " - "
                },
                articleComponents: components.data.getArticleComponents
            }
        }
    }
    catch (err) {
        console.log(err);
        return {
            props: {
                mainArticle: {},
                layoutProps: {
                    asideArticles: [],
                    title: ""
                },
                articleComponents: []
            }
        }
    }
};