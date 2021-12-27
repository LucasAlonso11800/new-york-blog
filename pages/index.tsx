import React from 'react';
// Components
import Head from '../components/LayoutComponents/Head';
import Main from '../components/LayoutComponents/Main';
import ArticlePreview from '../components/ArticlePreview';
import Pagination from '../components/Pagination';
// GraphQL
import { client } from '../const/ApolloConfig';
import { gql } from '@apollo/client';
// Types
import { ArticleType } from '../types/Types';

type Props = {
    articles: ArticleType[],
    index: number
};

export default function HomePage({ articles, index }: Props) {
    return (
        <>
            <Head title='' />
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
                <Pagination index={index} />
            </Main>
        </>
    )
};

export async function getStaticProps() {
    try {
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
                index: 1
            }
        });
        return {
            props: {
                articles: articles.data.getLatestArticles,
                index: 1
            }
        }
    }
    catch (err) {
        console.log(err)
        return {
            props: {
                articles: [],
                index: 1
            }
        }
    }
};