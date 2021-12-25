import React from 'react';
// Components
import Link from 'next/link';
import { Icon } from '@iconify/react';
// Styles
import classes from '../styles/components/Pagination.module.css';

type Props = {
    index: number,
    category?: string
};

export default function Pagination({ index, category }: Props) {
    const forwardLink: string = category ? `/categories/${category}/page/${index + 1}` : `/page/${index + 1}`;
    const previousLink: string = category ? index === 2 ? `/categories/${category}` : `/categories/${category}/page/${index - 1}` : index === 2 ? '/' : `/page/${index + 1}`;

    return (
        <div className={classes.pagination}>
            {index > 1 ?
                <button className={classes.button}>
                    <Icon icon="grommet-icons:form-previous" color="#000" fontSize={14} />
                    <Link href={previousLink}>Load More Posts</Link>
                </button>
                :
                <div className={classes.placeholder}></div>
            }
            <button className={classes.button}>
                <Link href={forwardLink}>Load More Posts</Link>
                <Icon icon="grommet-icons:form-next" color="#000" fontSize={14} />
            </button>
        </div>
    )
};