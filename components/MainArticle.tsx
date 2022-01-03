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
// Utils
import { formatDate } from '../utils/formatDate';
// Types
import { ArticleComponentType } from '../types/Types';

type Props = {
    title: string
    categoryName: string
    categoryPath: string
    image: string
    authorName: string
    articleComponents: ArticleComponentType[]
    createdAt: string
    commentCount: number
}

export default function MainArticle(props: Props) {
    const { title, categoryName, categoryPath, image, authorName, articleComponents, createdAt, commentCount } = props;

    const handleClick = (): void => {
        const commentSection = document.querySelector('#commentSection');
        const commentForm = document.querySelector('#commentForm');
        const options: ScrollIntoViewOptions = { inline: 'start', block: 'start', behavior: 'smooth' };

        if(commentSection) return commentSection.scrollIntoView(options);
        return commentForm?.scrollIntoView(options);
    };

    return (
        <article className={classes.article}>
            <h1 className={classes.title}>{title}</h1>
            {categoryName !== "" && categoryPath !== "" && authorName !== "" &&
                <ArticleMeta
                    categoryName={categoryName}
                    categoryPath={categoryPath}
                    authorName={authorName}
                />
            }
            <Image src={image} height="535" width="800" priority/>
            {articleComponents.map(component => {
                switch (component.componentName) {
                    case "ArticleQuote": return <ArticleQuote key={component.id} text={component.text} />
                    case "ArticleSubtitle": return <ArticleSubtitle key={component.id} text={component.text} textAlign={component.textAlign === 'L' ? 'left' : 'center'} fontWeight={component.fontWeight} lineHeight={component.fontWeight === "400" ? '45px' : '32.5px'} />
                    case "ArticleText": return <ArticleText key={component.id} text={component.text} />
                    case "ArticleTitle": return <ArticleTitle key={component.id} text={component.text} />
                    case "Image": return <Image key={component.id} src={component.image} height="535" width="800" />
                }
            })}
            <p className={classes.createdAt}>Posted on {formatDate(createdAt)}</p>
            <p className={classes.commentCount} onClick={() => handleClick()}>{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</p>
        </article>
    )
};