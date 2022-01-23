import React, { ReactNode } from 'react'
// Components
import Footer from './Footer';
import Header from './Header';
import Head from './Head';
import Toast from './Toast';

type Props = {
    title: string
    children: ReactNode
}

export default function AdminLayout({ title, children }: Props) {
    return (
        <div id="page-container" className="admin">
            <Head title={title} />
            <Header />
            <Toast />
            {children}
            <Footer />
        </div>
    )
};