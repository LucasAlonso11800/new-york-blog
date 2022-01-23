import React, { useContext, useEffect } from 'react'
// Components
import Layout from '../../components/LayoutComponents/Layout';
import Main from '../../components/LayoutComponents/Main';
import Pagination from '../../components/Pagination'
import ArticlePreview from '../../components/ArticlePreview';
// GraphQL
import { addApolloState, initializeApollo } from '../../ApolloClient/NewApolloConfig';
import { getCategories, getLatestArticles, getMetadata, getMostVisitedArticles, getTotalArticleCount } from '../../ApolloClient/querys';
import { ApolloError } from '@apollo/client';
// Const
import { ARTICLE_LIMIT_PER_PAGE } from '../../const/Limits';
// Types
import { ArticleStatus, ArticleType } from '../../types/Types';
import { GlobalContext } from '../../context/GlobalContext';

type Props = {
    index: number
    articleCount: number
    articles: ArticleType[]
    error: ApolloError
};

export default function LatestArticlesPage({ index, articleCount, articles, error }: Props) {
    const { setToastInfo } = useContext(GlobalContext);
    
    useEffect(() => {
        if (error) setToastInfo({ open: true, message: error.message, type: 'error' });
    }, []);
    
    return (
        <Layout title="">
            <Main>
                {articles.map((article, index) => (
                    <ArticlePreview
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
                ))}
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
        console.log(JSON.stringify(err, null, 2));;
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
        const [articles, articleCount] = await Promise.all([
            await getLatestArticles(client, parseInt(params.index), ArticleStatus.ACCEPTED),
            await getTotalArticleCount(client),
            await getMostVisitedArticles(client),
            await getCategories(client),
            await getMetadata(client)
        ]);

        return addApolloState(client, {
            props: {
                index: parseInt(params.index),
                articleCount: articleCount.data.getTotalArticleCount,
                articles: articles.data.getLatestArticles
            },
            revalidate: 60 * 60 * 24
        })
    }
    catch (err) {
        console.log(JSON.stringify(err, null, 2));
        return addApolloState(client, {
            props: {
                index: parseInt(params.index),
                articleCount: 0,
                error: JSON.parse(JSON.stringify(err))
            }
        });
    }
};