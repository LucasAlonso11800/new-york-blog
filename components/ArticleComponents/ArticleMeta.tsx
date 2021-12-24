import React from 'react';
import Link from 'next/link';
import classes from '../../styles/components/ArticleComponents/ArticleMeta.module.css';
import { Category } from '../../types/Types';

type Props = {
    categories: Category[]
    author: string
};

export default function ArticleMeta() {
    return (
        <p className={classes.meta}>
            <span className={classes.in}>in </span>
            <span className={classes.categories}><Link href="/">Living</Link>, <Link href="/">NYC Life </Link></span>
            by
            <span className={classes.author}> Lauren Malamala</span>
        </p>
    )
};