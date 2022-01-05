import React from 'react'
// Components
import Footer from './Footer';
import Header from './Header';
import Head from './Head';
// Types
import { LayoutProps } from '../../types/Types';

export default function AdminLayout(props: LayoutProps) {
    const { title, children, categories, footerText, headerImage, headIcon } = props;
    return (
        <div id="page-container" className="admin">
            <Head title={title} icon={headIcon}/>
            <Header categories={categories} image={headerImage}/>
            {children}
            <Footer text={footerText}/>
        </div>
    )
};