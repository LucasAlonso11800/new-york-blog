import React from 'react';
import classes from '../../styles/components/LayoutComponents/Main.module.css';

export default function Main({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    return (
        <main className={classes.main}>
            {children}
        </main>
    )
};