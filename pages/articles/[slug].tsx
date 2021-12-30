import React from 'react';
// Components
import Layout from '../../components/LayoutComponents/Layout';
import Main from '../../components/LayoutComponents/Main';
import MainArticle from '../../components/MainArticle';
// Querys
import { getAllArticles, getArticleComponents, getCategories, getMetadata, getMostVisitedArticles, getRelatedArticles, getSingleArticle } from '../../ApolloClient/querys';
// Const
import { DEFAULT_METADATA } from '../../const/defaultMetadata';
// Types
import { ArticleComponentType, ArticleType, LayoutProps } from '../../types/Types';
import RelatedArticles from '../../components/RelatedArticles';

type Props = {
    mainArticle: ArticleType
    layoutProps: LayoutProps
    articleComponents: ArticleComponentType[]
    relatedArticles: ArticleType[]
};

export default function ArticlePage({ mainArticle, layoutProps, articleComponents, relatedArticles }: Props) {
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
                <RelatedArticles articles={relatedArticles}/>
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
        const relatedArticles = await getRelatedArticles(article.data.getSingleArticle.categoryId);
        const components = await getArticleComponents(article.data.getSingleArticle.id);
        const categories = await getCategories();
        const metadata = await getMetadata();

        return {
            props: {
                mainArticle: article.data.getSingleArticle,
                relatedArticles: relatedArticles.data.getRelatedArticles,
                layoutProps: {
                    asideArticles: asideArticles.data.getMostVisitedArticles,
                    title: article.data.getSingleArticle.title + " - ",
                    categories: categories.data.getCategories,
                    ...metadata
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
                relatedArticles: [],
                layoutProps: {
                    asideArticles: [],
                    title: "",
                    categories: [],
                    ...DEFAULT_METADATA
                },
                articleComponents: []
            }
        }
    }
};