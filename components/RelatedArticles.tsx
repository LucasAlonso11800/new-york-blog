import React from 'react';
// Components
import Image from 'next/image';
import Link from 'next/link';
// Styles
import classes from '../styles/components/RelatedArticles.module.css';
// Utils
import { fixFirebaseURL } from '../utils/fixFirebaseURL';
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
                {articles.map(article => (
                    <div key={article.id} className={classes.article}>
                        {article.image &&
                            <Link href={`/articles/${article.slug}`}>
                                <Image src={fixFirebaseURL(article.image)} height="190" width="190" />
                            </Link>
                        }
                        {article.slug &&
                            <Link href={`/articles/${article.slug}`} >
                                <h5 className={classes.articleTitle}>{article.title}</h5>
                            </Link>
                        }
                    </div>
                ))}
            </div>
        </section>
    )
};