import React from 'react';
import classes from '../../styles/components/LayoutComponents/Main.module.css';

export default function Main({ children }: { children: JSX.Element | JSX.Element[] }) {
    return (
        <main className={classes.main}>
            {children}
        </main>
    )
};