import React from 'react';
// Components
import Image from 'next/image';
import Link from 'next/link';
import ReadMoreButton from './ReadMoreButton';
import ArticleMeta from './ArticleComponents/ArticleMeta';
// Styles
import classes from '../styles/components/ArticlePreview.module.css';
// Types
import { Category } from '../types/Types';

type Props = {
    title: string;
    categories: Category[];
    author: string;
    link: string;
    image: string;
    body: string;
    layout: 'column' | 'row';
};

export default function ArticlePreview(props: { layout: 'column' | 'row' }) {
    const { layout } = props;

    const imageDimensions = layout === 'column' ? { width: '850', height: '475' } : { width: '400', height: '400' };

    return (
        <article className={`${classes.article} ${classes[layout]}`}>
            <Link href="/">
                <Image src="https://www.tracysnewyorklife.com/wp-content/uploads/2016/06/ScreenShot2016-06-01at3.11.12PM-750x475.png" {...imageDimensions} />
            </Link>
            <div className={classes.content}>
                <h2 className={classes.title}><Link href="/">Why I Still Love Living in Manhattan</Link></h2>
                <ArticleMeta />
                <p className={classes.body}>Why I Still Love Living in Manhattan….  &nbsp;My pipe dream came true in 2007 when I arrived in New York. Some days that iconic moment feels like decades ago, and other times, just yesterday. When I moved to the Upper East Side in 2007, I can’t recall if I thought about how long I’d stay. Would it be a…</p>
                <ReadMoreButton />
            </div>
        </article>
    )
};