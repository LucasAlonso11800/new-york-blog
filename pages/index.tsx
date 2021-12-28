import React from 'react';
// Components
import Layout from '../components/LayoutComponents/Layout';
import Main from '../components/LayoutComponents/Main';
import ArticlePreview from '../components/ArticlePreview';
import Pagination from '../components/Pagination';
// Querys
import { getLatestArticles, getMostVisitedArticles } from '../Apollo/querys';
// Types
import { ArticleType, LayoutProps } from '../types/Types';

type Props = {
    mainArticles: ArticleType[],
    layoutProps: LayoutProps,
    index: number
};

export default function HomePage({ index, mainArticles, layoutProps }: Props) {
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
                <Pagination index={index} />
            </Main>
        </Layout>
    )
};

export async function getStaticProps() {
    try {
        const mainArticles = await getLatestArticles(1);
        const asideArticles = await getMostVisitedArticles();

        return {
            props: {
                mainArticles: mainArticles.data.getLatestArticles,
                layoutProps: {
                    asideArticles: asideArticles.data.getMostVisitedArticles,
                    title: ""
                },
                index: 1
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
                    title: ""
                },
                index: 1
            }
        }
    }
};