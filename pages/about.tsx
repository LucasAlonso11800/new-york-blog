import React from 'react';
// Components
import Layout from '../components/LayoutComponents/Layout';
import Main from '../components/LayoutComponents/Main';
import MainArticle from '../components/MainArticle';
// Querys
import { getArticleComponents, getCategories, getMetadata, getMostVisitedArticles, getSingleArticle } from '../ApolloClient/querys';
// Const
import { DEFAULT_METADATA } from '../const/defaultMetadata';
// Types
import { ArticleComponentType, ArticleType, LayoutProps } from '../types/Types';

type Props = {
    layoutProps: LayoutProps,
    aboutArticle: ArticleType,
    articleComponents: ArticleComponentType[]
};

export default function AboutPage({ layoutProps, aboutArticle, articleComponents }: Props) {
    return (
        <Layout {...layoutProps}>
            <Main>
                <MainArticle 
                    title={aboutArticle.title}
                    image={aboutArticle.image}
                    articleComponents={articleComponents}
                    categoryName=""
                    categoryPath=""
                    authorName=""
                />
            </Main>
        </Layout>
    )
};

export async function getStaticProps() {
    try {
        const aboutArticle = await getSingleArticle("about");
        const components = await getArticleComponents(aboutArticle.data.getSingleArticle.id);
        const asideArticles = await getMostVisitedArticles();
        const categories = await getCategories();
        const metadata = await getMetadata();

        return {
            props: {
                aboutArticle: aboutArticle.data.getSingleArticle,
                layoutProps: {
                    asideArticles: asideArticles.data.getMostVisitedArticles,
                    title: "About ",
                    categories: categories.data.getCategories,
                    ...metadata
                },
                articleComponents: components.data.getArticleComponents
            }
        }
    }
    catch (err) {
        console.log(err)
        return {
            props: {
                aboutArticle: {},
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