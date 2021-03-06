import React from 'react';
// Components
import Image from 'next/image';
import Link from 'next/link';
// Utils
import { fixFirebaseURL } from '../utils/fixFirebaseURL';
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
            {articles.map(article => (
                <article key={article.id} className={classes.article}>
                    {article.image ? <Image src={fixFirebaseURL(article.image)} height={270} width={270} /> : null}
                    <h4 className={classes.title}>
                    {article.title ? <Link href={`/articles/${article.slug}`}>{article.title}</Link> : null}
                    </h4>
                </article>
            ))}
        </div>
    )
};