import React from 'react';
// Components
import Image from 'next/image';
import Link from 'next/link';
import AsideArticle from '../AsideArticle';
// Utils
import { fixFirebaseURL } from '../../utils/fixFirebaseURL';
// Styles
import classes from '../../styles/components/LayoutComponents/Aside.module.css';
// GraphQL
import { useQuery } from '@apollo/client';
import { GET_METADATA, GET_MOST_VISITED_ARTICLES } from '../../ApolloClient/querys';
// Types
import { ArticleType, MetadataNames, MetadataType } from '../../types/Types';

export default function Aside() {
    const { data: { getMostVisitedArticles: articles } } = useQuery(GET_MOST_VISITED_ARTICLES);
    const { data: { getMetadata: metadata } } = useQuery(GET_METADATA);

    const title: MetadataType = metadata.find((data: MetadataType) => data.name === MetadataNames.ABOUT_TITLE);
    const image: MetadataType = metadata.find((data: MetadataType) => data.name === MetadataNames.ABOUT_IMAGE);
    const sectionTitle: MetadataType = metadata.find((data: MetadataType) => data.name === MetadataNames.MOST_VISITED_ARTICLES_TITLE);

    return (
        <aside className={classes.aside}>
            <section className={classes.about}>
                <h2 className={classes.title}>{title.value}</h2>
                <Link href="/about">
                    <Image src={fixFirebaseURL(image.value)} width="400" height="400" />
                </Link>
            </section>
            <section className={classes.mostVisitedArticles}>
                <h2 className={classes.title}>{sectionTitle.value}</h2>
                {articles.map((article: ArticleType) => {
                    return <AsideArticle key={article.id} title={article.title} slug={article.slug} image={article.image} />
                })}
            </section>
        </aside>
    )
};