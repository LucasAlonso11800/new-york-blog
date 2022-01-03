import React from 'react';
// Components
import ArticlePreview from '../../../../components/ArticlePreview';
import Layout from '../../../../components/LayoutComponents/Layout';
import Main from '../../../../components/LayoutComponents/Main';
import Pagination from '../../../../components/Pagination';
import SearchPageTitle from '../../../../components/SearchPageTitle';
// Querys
import { getCategories, getMetadata, getMostVisitedArticles, getSearchedArticleCount, getSearchedArticles } from '../../../../ApolloClient/querys';
// Const
import { DEFAULT_METADATA } from '../../../../const/defaultMetadata';
// Types
import { ArticleType, LayoutProps } from '../../../../types/Types';
import { GetServerSidePropsContext } from 'next';

type Props = {
    mainArticles: ArticleType[]
    layoutProps: LayoutProps
    index: number
    articleCount: number
    search: string
};

export default function SearchPage({ mainArticles, layoutProps, index, articleCount, search }: Props) {
    return (
        <Layout {...layoutProps}>
            <Main>
                <SearchPageTitle search={search} />
                <>
                    {mainArticles.map(article => {
                        return <ArticlePreview
                            key={article.id}
                            layout='row'
                            title={article.title}
                            categoryName={article.categoryName}
                            categoryPath={article.categoryPath}
                            image={article.image}
                            authorName={article.authorName}
                            slug={article.slug}
                            description={article.description}
                        />
                    })}
                </>
                <Pagination index={index} articleCount={articleCount} search={search} />
            </Main>
        </Layout>
    )
};

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    try {
        const articleCount = await getSearchedArticleCount(query.query as string);
        const mainArticles = await getSearchedArticles(query.query as string, parseInt(query.index as string));
        const asideArticles = await getMostVisitedArticles();
        const categories = await getCategories();
        const metadata = await getMetadata();

        return {
            props: {
                mainArticles: mainArticles.data.getSearchedArticles,
                layoutProps: {
                    asideArticles: asideArticles.data.getMostVisitedArticles,
                    title: `You searched for ${query.query} - `,
                    categories: categories.data.getCategories,
                    ...metadata
                },
                index: parseInt(query.index as string),
                articleCount: articleCount.data.getSearchedArticleCount,
                search: query.query
            }
        }
    }
    catch (err) {
        console.log(err);
        return {
            props: {
                mainArticles: [],
                layoutProps: {
                    asideArticles: [],
                    title: "",
                    categories: [],
                    ...DEFAULT_METADATA
                },
                index: parseInt(query.index as string),
                articleCount: 0,
            }
        }
    }
};