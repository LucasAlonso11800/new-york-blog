import React from 'react';
// Components
import Link from 'next/link';
import { Icon } from '@iconify/react';
// Styles
import classes from '../styles/components/Pagination.module.css';

type Props = {
    index: number
};

export default function Pagination() {
    const index = 2;
    return (
        <div className={classes.pagination}>
            {index > 1 ?
                <button className={classes.button}>
                    <Icon icon="grommet-icons:form-previous" color="#000" fontSize={14}/>
                    <Link href={`page/${index - 1}`}>Load More Posts</Link>
                </button>
                :
                <div className={classes.placeholder}></div>
            }
            <button className={classes.button}>
                <Link href={`page/${index + 1}`}>Load More Posts</Link>
                <Icon icon="grommet-icons:form-next" color="#000" fontSize={14}/>
            </button>
        </div>
    )
};