import React from 'react';
// Components
import Image from 'next/image';
import Link from 'next/link';
import AsideArticle from '../AsideArticle';
// Styles
import classes from '../../styles/components/LayoutComponents/Aside.module.css';
// GraphQL
import { client } from '../../ApolloClient/ApolloConfig';
import { gql } from '@apollo/client';
import { ArticleType } from '../../types/Types';

type Props = {
    articles: ArticleType[],
    title: string
    image: string
    mostVisitedArticlesTitle: string
}

export default function Aside({ articles, title, image, mostVisitedArticlesTitle }: Props) {
    return (
        <aside className={classes.aside}>
            <section className={classes.about}>
                <h2 className={classes.title}>{title}</h2>
                <Link href="/about">
                    <Image src={image} width="400" height="400" />
                </Link>
            </section>
            <section className={classes.mostVisitedArticles}>
                <h2 className={classes.title}>{mostVisitedArticlesTitle}</h2>
                {articles.map(article => {
                    return <AsideArticle key={article.id} title={article.title} slug={article.slug} image={article.image} />
                })}
            </section>
        </aside>
    )
};

export async function getStaticProps() {
    try {
        const articles = await client.query({
            query: gql`
                query Query {
                    getMostVisitedArticles {
                        id
                        title
                        image
                        slug
                    }
                }
            `
        });
        return {
            props: {
                articles: articles.data.getMostVisitedArticles
            }
        }
    }
    catch (err) {
        console.log(err);
        return {
            props: {
                articles: []
            }
        }
    }
};