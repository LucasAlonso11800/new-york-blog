import React from 'react'
// Components
import Aside from './Aside';
import Footer from './Footer';
import Header from './Header';
import Head from './Head';
// Types
import { GET_METADATA } from '../../ApolloClient/querys';
import { useQuery } from '@apollo/client';
import { MetadataNames, MetadataType } from '../../types/Types';

type Props = {
    children: React.ReactNode,
    title: string
}

export default function Layout({ children, title }: Props) {
    return (
        <div id="page-container">
            <Head title={title}/>
            <Header />
            {children}
            <Aside />
            <Footer />
        </div>
    )
};