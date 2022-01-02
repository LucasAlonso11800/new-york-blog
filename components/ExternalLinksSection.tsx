import React from 'react';
import classes from '../styles/components/ExternalLinksSection.module.css';

export default function ExternalLinksSection() {
    return (
        <section className={classes.section}>
            <div className={classes.container}>
                <button className={classes.button}>
                    <a className={classes.link} href="http://eepurl.com/bdIY0z"target="_blank">Subscribe via Email</a>
                </button>
                <button className={classes.button}>
                    <a className={classes.link} href="https://www.bloglovin.com/blogs/tracys-new-york-life-3331764" target="_blank">Follow on Bloglovin'</a>
                </button>
            </div>
        </section>
    )
};