import React from 'react';
import classes from '../../styles/components/ArticleComponents/ArticleTitle.module.css';

type Props = {
    text: string;
}

export default function ArticleTitle({ text }: Props) {
    return (
        <h2 className={classes.title}>{text}</h2>
    )
};