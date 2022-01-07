import React from 'react';
import classes from '../styles/components/LoadingIcon.module.css';
import { Icon } from '@iconify/react';

export default function LoadingIcon() {
    return (
        <div className={classes.container}>
            <div className={classes.icon}>
                <Icon icon="uiw:loading"  fontSize={24}/>
            </div>
        </div>
    )
};