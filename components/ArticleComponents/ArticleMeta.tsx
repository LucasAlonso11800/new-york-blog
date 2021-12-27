import React from 'react';
import Link from 'next/link';
import classes from '../../styles/components/ArticleComponents/ArticleMeta.module.css';

type Props = {
    categoryName: string;
    categoryPath: string;
    authorName: string;
};

export default function ArticleMeta(props: Props) {
    const { categoryName, categoryPath, authorName } = props;

    return (
        <p className={classes.meta}>
            <span className={classes.in}>in </span>
            <span className={classes.categories}><Link href={`categories/${categoryPath}`}>{categoryName}</Link> </span>
            by
            <span className={classes.author}> {authorName}</span>
        </p>
    )
};