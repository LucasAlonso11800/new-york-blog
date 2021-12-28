import React from 'react'
// Components
import Aside from './Aside';
import Footer from './Footer';
import Header from './Header';
import Head from './Head';
// Types
import { LayoutProps } from '../../types/Types';

export default function Layout(props: LayoutProps) {
    const { title, children, asideArticles, categories, aboutImage, aboutTitle, footerText, headerImage, mostVisitedArticlesTitle, headIcon } = props;
    return (
        <div id="page-container">
            <Head title={title} icon={headIcon}/>
            <Header categories={categories} image={headerImage}/>
            {children}
            <Aside articles={asideArticles} title={aboutTitle} image={aboutImage} mostVisitedArticlesTitle={mostVisitedArticlesTitle}/>
            <Footer text={footerText}/>
        </div>
    )
};