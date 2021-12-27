import React from 'react';
// Components
import Head from '../components/LayoutComponents/Head';
import Main from '../components/LayoutComponents/Main';
import ArticlePreview from '../components/ArticlePreview';
import Header from '../components/LayoutComponents/Header';
import Aside from '../components/LayoutComponents/Aside';
import Footer from '../components/LayoutComponents/Footer';
import Pagination from '../components/Pagination';
// Querys
import { getLatestArticles, getMostVisitedArticles } from '../Apollo/querys';
// Types
import { ArticleType } from '../types/Types';

type Props = {
    mainArticles: ArticleType[],
    asideArticles: ArticleType[],
    index: number
};

export default function HomePage({ index, mainArticles, asideArticles }: Props) {
    return (
        <div id="page-container">
            <Head title='' />
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
                <Pagination index={index} />
            </Main>
            <Aside articles={asideArticles}/>
            <Footer />
        </div>
    )
};

export async function getStaticProps() {
    try {
        const mainArticles = await getLatestArticles(1);
        const asideArticles = await getMostVisitedArticles();

        return {
            props: {
                mainArticles: mainArticles.data.getLatestArticles,
                asideArticles: asideArticles.data.getMostVisitedArticles,
                index: 1
            }
        }
    }
    catch (err) {
        console.log(err)
        return {
            props: {
                mainArticles: [],
                asideArticles: [],
                index: 1
            }
        }
    }
};