import React from 'react';
// Components
import Link from 'next/link';
// Styles
import classes from '../styles/components/AdjacentArticles.module.css';
// Types
import { ArticleType } from '../types/Types';
import { Icon } from '@iconify/react';

type Props = {
    articles: ArticleType[]
};

export default function AdjacentArticles({ articles }: Props) {
    return (
        <section className={classes.container}>
            {articles.map((article, index) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                    <p className={classes.link}>
                        {index === 0 &&
                            <div className={classes.icons}>
                                <Icon icon="grommet-icons:form-previous" color="#000" fontSize={14} />
                                <Icon icon="grommet-icons:form-previous" color="#000" fontSize={14} />
                            </div>
                        }
                        <span className={classes.title}>{article.title}</span>
                        {index === 1 &&
                            <div className={classes.icons}>
                                <Icon icon="grommet-icons:form-next" color="#000" fontSize={14} />
                                <Icon icon="grommet-icons:form-next" color="#000" fontSize={14} />
                            </div>
                        }
                    </p>
                </Link>
            ))}
        </section>
    )
};