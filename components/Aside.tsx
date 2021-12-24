import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import classes from '../styles/components/Aside.module.css';
import AsideArticle from './AsideArticle';

export default function Aside() {
    // Get favorite posts from backend
    // Get about image from backend

    return (
        <aside className={classes.aside}>
            <section className={classes.about}>
                <h2 className={classes.title}>About the blog</h2>
                <Link href="/about">
                    <Image src="https://www.tracysnewyorklife.com/wp-content/uploads/2016/10/015-resize-400x400.jpg" width="400" height="400"/>
                </Link>
            </section>
            <section className={classes.featuredArticles}>
                <h2 className={classes.title}>Favorite posts</h2>
                <AsideArticle />
                <AsideArticle />
                <AsideArticle />
                <AsideArticle />
            </section>
        </aside>
    )
};