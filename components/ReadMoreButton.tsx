import React from 'react';
// Components
import Link from 'next/link';
import { Icon } from '@iconify/react';
// Styles
import classes from '../styles/components/ReadMoreButton.module.css';

type Props = {
    link: string
};

export default function ReadMoreButton() {
    return (
        <button className={classes.button}>
            <Link href="/">Read more</Link>
            <Icon icon="dashicons:arrow-right" color='#FFF' fontSize={14}/>
        </button>
    )
};