import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import Main from '../../../../components/LayoutComponents/Main';
import Pagination from '../../../../components/Pagination';

export default function Page() {
    const route = useRouter();
    console.log(route.asPath.split('/'))
    return (
        <Main>
            <Pagination category={route.asPath.split('/')[2]} index={parseInt(route.asPath.split('/')[4])} />
        </Main>
    )
};

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    index: "2",
                    category: "living"
                }
            },
            {
                params: {
                    index: "3",
                    category: "living"
                }
            }],
        fallback: false
    };

};

type GetStaticPropsParams = {
    params: {
        category: string
        index: string
    }
}

export async function getStaticProps({ params }: GetStaticPropsParams): Promise<GetStaticPropsResult<any>> {
    return {
        props: {}
    }
};