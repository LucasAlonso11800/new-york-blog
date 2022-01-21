import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import classes from '../styles/components/AsideArticle.module.css';
import { fixFirebaseURL } from '../utils/fixFirebaseURL';

type Props = {
    slug: string;
    image: string;
    title: string;
};

export default function AsideArticle({ slug, image, title }: Props) {
    return (
        <article className={classes.article}>
            <Link href={`/articles/${slug}`}>
                <Image src={fixFirebaseURL(image)} width="190" height="190" />
            </Link>
            <h4 className={classes.title}><Link href={`/articles/${slug}`}>{title}</Link></h4>
        </article>
    )
};