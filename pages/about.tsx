import React from 'react';
// Components
import Layout from '../components/LayoutComponents/Layout';
import Main from '../components/LayoutComponents/Main';
import MainArticle from '../components/MainArticle';
// Querys
import { getArticleComponents, getCategories, getMetadata, getMostVisitedArticles, getSingleArticle } from '../ApolloClient/querys';
// Types
import { ArticleComponentType, ArticleType } from '../types/Types';
import { addApolloState, initializeApollo } from '../ApolloClient/NewApolloConfig';
import { ApolloError } from '@apollo/client';

type Props = {
    article: ArticleType
    articleComponents: ArticleComponentType[]
    error: ApolloError
};

export default function AboutPage({ article, articleComponents }: Props) {
    return (
        <Layout title="About - ">
            <Main>
                <MainArticle
                    title={article.title}
                    image={article.image}
                    articleComponents={articleComponents}
                    categoryName=""
                    categoryPath=""
                    authorName=""
                    createdAt={article.createdAt}
                    commentCount={0}
                />
            </Main>
        </Layout>
    )
};

export async function getStaticProps() {
    const client = initializeApollo();
    try {
        const article = await getSingleArticle(client, "about");
        const [articleComponents] = await Promise.all([
            await getArticleComponents(client, article.data.getSingleArticle.id),
            await getMostVisitedArticles(client),
            await getCategories(client),
            await getMetadata(client)
        ]);

        return addApolloState(client, {
            props: {
                article: article.data.getSingleArticle,
                articleComponents: articleComponents.data.getArticleComponents
            },
            revalidate: 60 * 60 * 24 
        });
    }
    catch (err) {
        console.log(err)
        return addApolloState(client, {
            props: {
                article: {},
                articleComponents: [],
                error: JSON.parse(JSON.stringify(err))
            }
        });
    }
};