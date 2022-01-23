import React from 'react'
// Components
import Aside from './Aside';
import Footer from './Footer';
import Header from './Header';
import Head from './Head';
import Toast from './Toast';

type Props = {
    children: React.ReactNode,
    title: string
}

export default function Layout({ children, title }: Props) {
    return (
        <div id="page-container">
            <Head title={title} />
            <Header />
            <Toast />
            {children}
            <Aside />
            <Footer />
        </div>
    )
};