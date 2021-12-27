import React from 'react';
// Styles
import classes from '../styles/components/MainArticle.module.css';
// Components
import Image from 'next/image';
import ArticleMeta from './ArticleComponents/ArticleMeta';
import ArticleTitle from './ArticleComponents/ArticleTitle';
import ArticleText from './ArticleComponents/ArticleText';
import ArticleSubtitle from './ArticleComponents/ArticleSubtitle';
import ArticleQuote from './ArticleComponents/ArticleQuote';
// Types
import { ArticleComponentType } from '../types/Types';

type Props = {
    title: string
    categoryName: string
    categoryPath: string
    image: string
    authorName: string
    articleComponents: ArticleComponentType[]
}

export default function MainArticle(props: Props) {
    const { title, categoryName, categoryPath, image, authorName, articleComponents } = props;
    return (
        <article className={classes.article}>
            <h1 className={classes.title}>{title}</h1>
            <ArticleMeta
                categoryName={categoryName}
                categoryPath={categoryPath}
                authorName={authorName}
            />
            <Image src={image} height="533" width="800" />
            {articleComponents.map(component => {
                switch (component.componentName) {
                    case "ArticleQuote": return <ArticleQuote text={component.text} />
                    case "ArticleSubtitle": return <ArticleSubtitle text={component.text} textAlign={component.textAlign === 'L' ? 'left' : 'center'} fontWeight={component.fontWeight} />
                    case "ArticleText": return <ArticleText text={component.text} />
                    case "ArticleTitle": return <ArticleTitle text={component.text} />
                    case "Image": return <Image src={component.image} height="533" width="800"/>
                }
            })}
        </article>
    )
};