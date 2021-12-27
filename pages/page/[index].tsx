import React from 'react'
// Components
import Head from '../../components/LayoutComponents/Head';
import Main from '../../components/LayoutComponents/Main';
import Header from '../../components/LayoutComponents/Header';
import Aside from '../../components/LayoutComponents/Aside';
import Footer from '../../components/LayoutComponents/Footer';
import Pagination from '../../components/Pagination'
import ArticlePreview from '../../components/ArticlePreview';
// Querys
import { getLatestArticles, getMostVisitedArticles, getTotalArticleCount } from '../../Apollo/querys';
// Const
import { ARTICLE_LIMIT_PER_PAGE } from '../../const/Limits';
// Types
import { ArticleType } from '../../types/Types';

type Props = {
    mainArticles: ArticleType[],
    asideArticles: ArticleType[],
    index: number,
    articleCount: number
};

export default function LatestArticlesPage({ mainArticles, asideArticles, index, articleCount }: Props) {
    return (
        <div id="page-container">
            <Head title="" />
            <Header />
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
            <Aside articles={asideArticles} />
            <Footer />
        </div>
    )
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
        
        return {
            props: {
                mainArticles: articles.data.getLatestArticles,
                asideArticles: asideArticles.data.getMostVisitedArticles,
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
                asideArticles: [],
                index: parseInt(params.index),
                articleCount: 0
            }
        }
    }
};