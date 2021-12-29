import React from 'react';
// Components
import Link from 'next/link';
import { Icon } from '@iconify/react';
// Styles
import classes from '../styles/components/Pagination.module.css';
import { ARTICLE_LIMIT_PER_PAGE, CATEGORY_ARTICLE_LIMIT } from '../const/Limits';

type Props = {
    index: number,
    category?: string,
    articleCount?: number,
    search?: string
};

export default function Pagination({ index, category, articleCount, search }: Props) {
    const forwardLink: string = search ? `/search/${search}/page/${index + 1}` : category ? `/categories/${category}/page/${index + 1}` : `/page/${index + 1}`;
    const previousLink: string = search ? index === 2 ? `/search/${search}` : `/search/${search}/page/${index - 1}` : category ? index === 2 ? `/categories/${category}` : `/categories/${category}/page/${index - 1}` : index === 2 ? '/' : `/page/${index + 1}`;
    const limit: number = category ? CATEGORY_ARTICLE_LIMIT : ARTICLE_LIMIT_PER_PAGE;

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
            {articleCount as number > index * limit || articleCount === undefined ?
                <button className={classes.button}>
                    <Link href={forwardLink}>Load More Posts</Link>
                    <Icon icon="grommet-icons:form-next" color="#000" fontSize={14} />
                </button>
                : null
            }
        </div>
    )
};