import React from 'react';
// Components
import Layout from '../components/LayoutComponents/Layout';
import Main from '../components/LayoutComponents/Main';
import MainArticle from '../components/MainArticle';
// Querys
import { getArticleComponents, getCategories, getMetadata, getMostVisitedArticles, getSingleArticle, GET_ARTICLE_COMPONENTS, GET_SINGLE_ARTICLE } from '../ApolloClient/querys';
// Types
import { ArticleComponentType, ArticleType } from '../types/Types';
import { addApolloState, initializeApollo } from '../ApolloClient/NewApolloConfig';
import { useQuery } from '@apollo/client';

export default function AboutPage() {
    const { data: { getSingleArticle: article } } = useQuery(GET_SINGLE_ARTICLE, { variables: { slug: "about" } });
    const { data: { getArticleComponents: articleComponents } } = useQuery(GET_ARTICLE_COMPONENTS, { variables: { articleId: article.id } });

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
        const aboutArticle = await getSingleArticle(client, "about");
        await getArticleComponents(client, aboutArticle.data.getSingleArticle.id);
        await getMostVisitedArticles(client);
        await getCategories(client);
        await getMetadata(client);

        return addApolloState(client, {
            props: {}
        });
    }
    catch (err) {
        console.log(err)
        return addApolloState(client, {
            props: {}
        });
    }
};