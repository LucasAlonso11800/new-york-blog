import React from 'react'
// Components
import Layout from '../../components/LayoutComponents/Layout';
import Main from '../../components/LayoutComponents/Main';
import Pagination from '../../components/Pagination'
import ArticlePreview from '../../components/ArticlePreview';
// GraphQL
import { useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from '../../ApolloClient/NewApolloConfig';
import { getCategories, getLatestArticles, getMetadata, getMostVisitedArticles, getTotalArticleCount, GET_LATEST_ARTICLES } from '../../ApolloClient/querys';
// Const
import { ARTICLE_LIMIT_PER_PAGE } from '../../const/Limits';
// Types
import { ArticleType } from '../../types/Types';

type Props = {
    index: number
    articleCount: number
};

export default function LatestArticlesPage({ index, articleCount }: Props) {
    const { data: { getLatestArticles: articles } } = useQuery(GET_LATEST_ARTICLES, { variables: { index } });

    return (
        <Layout title="">
            <Main>
                {articles.map((article: ArticleType, index: number) => {
                    return <ArticlePreview
                        key={article.id}
                        layout={index === 0 ? 'column' : 'row'}
                        title={article.title}
                        categoryName={article.categoryName}
                        categoryPath={article.categoryPath}
                        image={article.image}
                        authorName={article.authorName}
                        slug={article.slug}
                        description={article.description}
                    />
                })}
                <Pagination index={index} articleCount={articleCount} />
            </Main>
        </Layout>
    );
};

const client = initializeApollo();
export async function getStaticPaths() {
    try {
        const articleCount = await getTotalArticleCount(client);
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
        const articleCount = await getTotalArticleCount(client);
        await getLatestArticles(client, parseInt(params.index));

        await getMostVisitedArticles(client);
        await getCategories(client);
        await getMetadata(client)

        return addApolloState(client, {
            props: {
                index: parseInt(params.index),
                articleCount: articleCount.data.getTotalArticleCount
            }
        })
    }
    catch (err) {
        console.log(err)
        return addApolloState(client, {
            props: {
                index: parseInt(params.index),
                articleCount: 0
            }
        });
    }
};