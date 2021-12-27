import React from 'react'
// Components
import Head from '../../components/LayoutComponents/Head';
import Main from '../../components/LayoutComponents/Main';
import Pagination from '../../components/Pagination'
import ArticlePreview from '../../components/ArticlePreview';
// GraphQL
import { client } from '../../const/ApolloConfig';
import { gql } from 'apollo-server-micro';
// Const
import { ARTICLE_LIMIT_PER_PAGE } from '../../const/Limits';
// Types
import { GetStaticPropsResult } from 'next';
import { ArticleType } from '../../types/Types';

type Props = {
    articles: ArticleType[],
    index: number,
    articleCount: number
};

export default function LatestArticlesPage({ articles, index, articleCount }: Props) {
    return (
        <>
            <Head title="" />
            <Main>
                <>
                    {articles.map((article, index) => {
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
        </>
    )
};

export async function getStaticPaths() {
    try {
        const articleCount = await client.query({
            query: gql`
                query Query {
                    getTotalArticleCount
                } 
            `
        });
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

export async function getStaticProps({ params }: GetStaticPropsParams): Promise<GetStaticPropsResult<any>> {
    try {
        const articleCount = await client.query({
            query: gql`
                query Query {
                    getTotalArticleCount
                } 
            `
        });

        const articles = await client.query({
            query: gql`
                query Query ($index: Int!){
                    getLatestArticles(index: $index){
                        id
                        title
                        categoryName
                        categoryPath
                        image
                        authorName
                        slug
                    }
                }
            `,
            variables: {
                index: parseInt(params.index)
            }
        });
        return {
            props: {
                articles: articles.data.getLatestArticles,
                index: parseInt(params.index),
                articleCount
            }
        }
    }
    catch (err) {
        console.log(err)
        return {
            props: {
                articles: [],
                index: parseInt(params.index),
                articleCount: 0
            }
        }
    }
};