import React from 'react';
import classes from '../../styles/components/ArticleComponents/ArticleQuote.module.css';

type Props = {
    text: string;
}

export default function ArticleQuote({ text }: Props) {
    return (
        <q className={classes.quote}>{text}</q>
    )
};