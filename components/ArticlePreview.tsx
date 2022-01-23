import React from 'react';
// Components
import Image from 'next/image';
import Link from 'next/link';
import ReadMoreButton from './ReadMoreButton';
import ArticleMeta from './ArticleComponents/ArticleMeta';
// Utils
import { fixFirebaseURL } from '../utils/fixFirebaseURL';
// Styles
import classes from '../styles/components/ArticlePreview.module.css';

type Props = {
    title: string;
    categoryName: string;
    categoryPath: string;
    image: string;
    authorName: string;
    slug: string;
    description: string;
    layout: 'column' | 'row';
};

export default function ArticlePreview(props: Props) {
    const { title, categoryName, categoryPath, image, authorName, slug, description, layout } = props;

    const imageDimensions = layout === 'column' ? { width: '850', height: '475' } : { width: '400', height: '400' };
    return (
        <article className={`${classes.article} ${classes[layout]}`} data-testid="articlePreview">
            {slug && image && title ?
                <>
                    <Link href={`/articles/${slug}`}>
                        <Image src={fixFirebaseURL(image)} {...imageDimensions} />
                    </Link>

                    <div className={classes.content}>
                        <h2 className={classes.title}>
                            <Link href={`/articles/${slug}`}>{title}</Link>
                        </h2>
                        <ArticleMeta categoryName={categoryName} categoryPath={categoryPath} authorName={authorName} />
                        <p className={classes.body}>{description ? `${description.substring(0, 320)}${description.length > 320 ? '[...]' : ''}` : ''}</p>
                        <ReadMoreButton link={`/articles/${slug}`} />
                    </div>
                </>
                : null
            }
        </article>
    )
};