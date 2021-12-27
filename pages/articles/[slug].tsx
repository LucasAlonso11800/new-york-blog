import React from 'react';
// Components
import Head from '../../components/LayoutComponents/Head';
import Header from '../../components/LayoutComponents/Header';
import Main from '../../components/LayoutComponents/Main';
import Aside from '../../components/LayoutComponents/Aside';
import Footer from '../../components/LayoutComponents/Footer';
import MainArticle from '../../components/MainArticle';
// Querys
import { getAllArticles, getArticleComponents, getMostVisitedArticles, getSingleArticle } from '../../Apollo/querys';
// Types
import { ArticleComponentType, ArticleType } from '../../types/Types';

type Props = {
    mainArticle: ArticleType
    asideArticles: ArticleType[]
    articleComponents: ArticleComponentType[]
};

export default function ArticlePage({ mainArticle, asideArticles, articleComponents }: Props) {
    return (
        <div id="page-container">
            <Head title={`${mainArticle.title} ||`} />
            <Header />
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
            <Aside articles={asideArticles} />
            <Footer />
        </div>
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
                asideArticles: asideArticles.data.getMostVisitedArticles,
                articleComponents: components.data.getArticleComponents
            }
        }
    }
    catch (err) {
        console.log(err);
        return {
            props: {
                mainArticle: {},
                asideArticles: []
            }
        }
    }
};