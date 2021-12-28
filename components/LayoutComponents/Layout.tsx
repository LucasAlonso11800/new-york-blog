import React from 'react'
// Components
import Aside from './Aside';
import Footer from './Footer';
import Header from './Header';
import Head from './Head';
// Types
import { LayoutProps } from '../../types/Types';

export default function Layout(props: LayoutProps) {
    const { title, children, asideArticles, categories } = props;
    return (
        <div id="page-container">
            <Head title={title} />
            <Header categories={categories}/>
            {children}
            <Aside articles={asideArticles} />
            <Footer />
        </div>
    )
};