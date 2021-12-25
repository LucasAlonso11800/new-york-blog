import React from 'react';
// Components
import Image from 'next/image';
import Link from 'next/link';
// Styles
import classes from '../styles/components/CategoryArticles.module.css';

export default function CategoryArticles() {
    return (
        <div className={classes.container}>
            <article className={classes.article}>
                <Image src="https://www.tracysnewyorklife.com/wp-content/uploads/2016/06/ScreenShot2016-06-01at3.11.12PM-750x475.png" height={270} width={270} />
                <h4 className={classes.title}>
                    <Link href="/">Why I Still Love Living In Manhattan</Link>
                </h4>
            </article>
            <article className={classes.article}>
                <Image src="https://www.tracysnewyorklife.com/wp-content/uploads/2016/06/ScreenShot2016-06-01at3.11.12PM-750x475.png" height={270} width={270} />
                <h4 className={classes.title}>
                    <Link href="/">Why I Still Love Living In Manhattan</Link>
                </h4>
            </article>
            <article className={classes.article}>
                <Image src="https://www.tracysnewyorklife.com/wp-content/uploads/2016/06/ScreenShot2016-06-01at3.11.12PM-750x475.png" height={270} width={270} />
                <h4 className={classes.title}>
                    <Link href="/">Why I Still Love Living In Manhattan</Link>
                </h4>
            </article>
            <article className={classes.article}>
                <Image src="https://www.tracysnewyorklife.com/wp-content/uploads/2016/06/ScreenShot2016-06-01at3.11.12PM-750x475.png" height={270} width={270} />
                <h4 className={classes.title}>
                    <Link href="/">Why I Still Love Living In Manhattan</Link>
                </h4>
            </article>
            <article className={classes.article}>
                <Image src="https://www.tracysnewyorklife.com/wp-content/uploads/2016/06/ScreenShot2016-06-01at3.11.12PM-750x475.png" height={270} width={270} />
                <h4 className={classes.title}>
                    <Link href="/">Why I Still Love Living In Manhattan</Link>
                </h4>
            </article>
            <article className={classes.article}>
                <Image src="https://www.tracysnewyorklife.com/wp-content/uploads/2016/06/ScreenShot2016-06-01at3.11.12PM-750x475.png" height={270} width={270} />
                <h4 className={classes.title}>
                    <Link href="/">Why I Still Love Living In Manhattan</Link>
                </h4>
            </article>
        </div>
    )
};