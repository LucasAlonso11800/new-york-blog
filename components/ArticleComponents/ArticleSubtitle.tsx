import React from 'react';
import classes from '../../styles/components/ArticleComponents/ArticleSubtitle.module.css';

type Props = {
    text: string;
    textAlign: 'left' | 'center',
    fontWeight: 400 | 600;
}

export default function ArticleSubtitle({ text, textAlign, fontWeight }: Props) {
    return (
        <h4 className={classes.subtitle}
            style={{ textAlign, fontWeight }}
        >
            {text}
        </h4>
    )
};