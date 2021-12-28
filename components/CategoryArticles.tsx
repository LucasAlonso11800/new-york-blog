import React from 'react';
// Components
import Image from 'next/image';
import Link from 'next/link';
// Styles
import classes from '../styles/components/CategoryArticles.module.css';
// Types
import { ArticleType } from '../types/Types';

type Props = {
    articles: ArticleType[]
}

export default function CategoryArticles({ articles }: Props) {
    return (
        <div className={classes.container}>
            {articles.map(article => {
                return (
                    <article key={article.id} className={classes.article}>
                        <Image src={article.image} height={270} width={270} />
                        <h4 className={classes.title}>
                            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                        </h4>
                    </article>
                )
            })}
        </div>
    )
};