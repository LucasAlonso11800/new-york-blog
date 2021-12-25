import React from 'react';
// Components
import Head from '../components/LayoutComponents/Head';
import Main from '../components/LayoutComponents/Main';
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
                <Pagination index={1}/>
            </Main>
        </>
    )
};