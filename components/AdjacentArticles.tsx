import React from 'react';
// Components
import Link from 'next/link';
import { Icon } from '@iconify/react';
// Styles
import classes from '../styles/components/AdjacentArticles.module.css';
// Types
import { ArticleType } from '../types/Types';

type Props = {
    articles: ArticleType[]
};

export default function AdjacentArticles({ articles }: Props) {
    return (
        <section className={classes.container}>
            {articles.map((article, index) => {
                if (article.id === null) return <p key={index} className={classes.link}></p>;
                return (
                    <Link key={article.id} href={`/articles/${article.slug}`}>
                        <p className={classes.link}>
                            {index === 0 &&
                                <span className={classes.icons}>
                                    <Icon icon="grommet-icons:form-previous" color="#000" fontSize={14} />
                                    <Icon icon="grommet-icons:form-previous" color="#000" fontSize={14} />
                                </span>
                            }
                            <span className={classes.title}>{article.title}</span>
                            {index === 1 &&
                                <span className={classes.icons}>
                                    <Icon icon="grommet-icons:form-next" color="#000" fontSize={14} />
                                    <Icon icon="grommet-icons:form-next" color="#000" fontSize={14} />
                                </span>
                            }
                        </p>
                    </Link>
                )
            })}
        </section>
    )
};