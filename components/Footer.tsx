import React from 'react'
import classes from '../styles/components/Footer.module.css';

export default function Footer() {
    return (
        <footer className={classes.footer}>
            <div className={classes.copyright}>
                <p>Copyright © 2011 - 2021 Tracy’s New York Life</p>
            </div>
        </footer>
    )
};