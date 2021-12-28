import React from 'react';
import classes from '../../styles/components/ArticleComponents/ArticleSubtitle.module.css';

type Props = {
    text: string;
    textAlign: 'left' | 'center'
    fontWeight: "600" | "400"
    lineHeight: "32.5px" | "45px"
}

export default function ArticleSubtitle({ text, textAlign, fontWeight, lineHeight }: Props) {
    return (
        <h4
            className={classes.subtitle}
            style={{ textAlign, fontWeight, lineHeight }}
        >
            {text}
        </h4>
    )
};