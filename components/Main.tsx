import React from 'react';
import classes from '../styles/components/Main.module.css';

export default function Main({ children }: { children: JSX.Element }) {
    return (
        <main className={classes.main}>
            {children}
        </main>
    )
};