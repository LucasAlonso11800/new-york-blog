import React from 'react';
// Components
import Head from '../components/Head';
import Main from '../components/Main';
import ArticlePreview from '../components/ArticlePreview';
import Pagination from '../components/Pagination';

export default function HomePage() {
    return (
        <>
            <Head title='' keywords='' />
            <Main>
                <ArticlePreview layout='column' />
                <ArticlePreview layout='row' />
                <ArticlePreview layout='row' />
                <ArticlePreview layout='row' />
                <ArticlePreview layout='row' />
                <ArticlePreview layout='row' />
                <ArticlePreview layout='row' />
                <ArticlePreview layout='row' />
                <ArticlePreview layout='row' />
                <Pagination />
            </Main>
        </>
    )
};