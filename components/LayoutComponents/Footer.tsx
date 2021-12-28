import React from 'react'
import classes from '../../styles/components/LayoutComponents/Footer.module.css';

type Props = {
    text: string
}

export default function Footer({ text }: Props) {
    return (
        <footer className={classes.footer}>
            <div></div>
            <div className={classes.copyright}>
                <p>{text}</p>
            </div>
            <div></div>
        </footer>
    )
};