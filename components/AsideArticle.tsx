import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import classes from '../styles/components/AsideArticle.module.css';

type Props = {
    href: string;
    src: string;
    title: string;
};

export default function dAsideArticle() {
    return (
        <article className={classes.article}>
            <Link href="/about">
                <Image src="https://www.tracysnewyorklife.com/wp-content/uploads/2017/07/tram-190x190.jpg" width="190" height="190" />
            </Link>
            <h4 className={classes.title}><Link href="/about">Day-tripping on Roosevelt Island</Link></h4>
        </article>
    )
};