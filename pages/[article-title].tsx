import React from 'react';
// Components
import Head from '../components/LayoutComponents/Head';
import Main from '../components/LayoutComponents/Main';
import MainArticle from '../components/MainArticle';
// Types
import { GetStaticPropsResult } from 'next';

export default function ArticlePage() {
    return (
        <>
            <Head title="Title" keywords="" />
            <Main>
                <MainArticle />
            </Main>
        </>
    )
};

export async function getStaticPaths() {
    return {
        paths: [{
            params: {
                'article-title': 'how-to-sleep-better-in-the-city-that-never-sleeps',
                id: 1
            }
        }],
        fallback: false
    };

};

type GetStaticPropsParams = {
    params: {
        'article-title': string,
        id: number
    }
}

export async function getStaticProps({ params }: GetStaticPropsParams): Promise<GetStaticPropsResult<any>> {
    return {
        props: {}
    }
}