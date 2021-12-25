import React from 'react';
// Components
import Main from '../../../components/LayoutComponents/Main';
import CategoryArticles from '../../../components/CategoryArticles';
import Pagination from '../../../components/Pagination';
// Types
import { GetStaticPropsResult } from 'next';

export default function CategoryPage() {
    return (
        <Main>
            <CategoryArticles />
            <Pagination index={1} category='living'/>
        </Main>
    )
};

export async function getStaticPaths() {
    return {
        paths: [{
            params: {
                category: 'living',
                id: 1
            }
        }],
        fallback: false
    };

};

type GetStaticPropsParams = {
    params: {
        category: string,
        id: number
    }
}

export async function getStaticProps({ params }: GetStaticPropsParams): Promise<GetStaticPropsResult<any>> {
    return {
        props: {}
    }
};