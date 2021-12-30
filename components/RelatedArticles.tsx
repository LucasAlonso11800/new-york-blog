import React from 'react';
// Components
import Image from 'next/image';
import Link from 'next/link';
// Styles
import classes from '../styles/components/RelatedArticles.module.css';
// Types
import { ArticleType } from '../types/Types';

type Props = {
    articles: ArticleType[];
}

export default function RelatedArticles({ articles }: Props) {
    return (
        <section className={classes.container}>
            <h3 className={classes.subtitle}>Related posts</h3>
            <div className={classes.articles}>
                {articles.map(article => {
                    return (
                        <div className={classes.article}>
                            <Link href={`/articles/${article.slug}`}>
                                <Image src={article.image} height="190" width="190" />
                            </Link>
                            <Link href={`/articles/${article.slug}`} >
                                <h5 className={classes.articleTitle}>{article.title}</h5>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </section>
    )
};