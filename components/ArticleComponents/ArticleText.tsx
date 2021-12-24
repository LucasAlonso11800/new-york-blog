import React from 'react';
import classes from '../../styles/components/ArticleComponents/ArticleText.module.css';

type Props = {
    text: string
}

export default function ArticleText({ text }: Props) {
    return (
        <p className={classes.text}>{text}</p>
    )
};