import React from 'react';
import classes from '../styles/components/SearchPageTitle.module.css';

type Props = {
    search: string
};

export default function SearchPageTitle({ search }: Props) {
    return (
        <h1 className={classes.title} data-testid="searchPageTitle">Search results for: {search}</h1>
    )
};