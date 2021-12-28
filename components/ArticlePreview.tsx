import React from 'react';
// Components
import Image from 'next/image';
import Link from 'next/link';
import ReadMoreButton from './ReadMoreButton';
import ArticleMeta from './ArticleComponents/ArticleMeta';
// Styles
import classes from '../styles/components/ArticlePreview.module.css';

type Props = {
    title: string;
    categoryName: string;
    categoryPath: string;
    image: string;
    authorName: string;
    slug: string;
    layout: 'column' | 'row';
};

export default function ArticlePreview(props: Props) {
    const { title, categoryName, categoryPath, image, authorName, slug, layout } = props;

    const imageDimensions = layout === 'column' ? { width: '850', height: '475' } : { width: '400', height: '400' };

    return (
        <article className={`${classes.article} ${classes[layout]}`}>
            <Link href={`/articles/${slug}`}>
                <Image src={image} {...imageDimensions} />
            </Link>
            <div className={classes.content}>
                <h2 className={classes.title}><Link href={slug}>{title}</Link></h2>
                <ArticleMeta categoryName={categoryName} categoryPath={categoryPath} authorName={authorName}/>
                <p className={classes.body}>Why I Still Love Living in Manhattan….  &nbsp;My pipe dream came true in 2007 when I arrived in New York. Some days that iconic moment feels like decades ago, and other times, just yesterday. When I moved to the Upper East Side in 2007, I can’t recall if I thought about how long I’d stay. Would it be a…</p>
                <ReadMoreButton link={`/articles/${slug}`}/>
            </div>
        </article>
    )
};