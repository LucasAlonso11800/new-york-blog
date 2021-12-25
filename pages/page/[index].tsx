import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import Main from '../../components/LayoutComponents/Main';
import Pagination from '../../components/Pagination';

export default function Page() {
    const route = useRouter();
    return (
        <Main>
            <Pagination index={parseInt(route.asPath.substring(6))} />
        </Main>
    )
};

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    index: "2",
                }
            },
            {
                params: {
                    index: "3",
                }
            }
        ],
        fallback: false
    };

};

type GetStaticPropsParams = {
    params: {
        index: string
    }
}

export async function getStaticProps({ params }: GetStaticPropsParams): Promise<GetStaticPropsResult<any>> {
    return {
        props: {}
    }
};