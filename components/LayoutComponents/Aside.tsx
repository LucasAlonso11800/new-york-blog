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
    const { data: articlesQuery } = useQuery(GET_MOST_VISITED_ARTICLES);
    const articles = articlesQuery?.getMostVisitedArticles || [];

    const { data: metadataQuery } = useQuery(GET_METADATA);
    const metadata = metadataQuery?.getMetadata || [];

    const title: MetadataType = metadata.find((data: MetadataType) => data.name === MetadataNames.ABOUT_TITLE);
    const image: MetadataType = metadata.find((data: MetadataType) => data.name === MetadataNames.ABOUT_IMAGE);
    const sectionTitle: MetadataType = metadata.find((data: MetadataType) => data.name === MetadataNames.MOST_VISITED_ARTICLES_TITLE);

    return (
        <aside className={classes.aside}>
            <section className={classes.about}>
                <h2 className={classes.title}>{title?.value}</h2>
                {image?.value &&
                    <Link href="/about">
                        <Image src={fixFirebaseURL(image.value)} width="400" height="400" alt="About"/>
                    </Link>
                }
            </section>
            <section className={classes.mostVisitedArticles}>
                <h2 className={classes.title}>{sectionTitle?.value}</h2>
                {articles.map((article: ArticleType) => (
                    <AsideArticle key={article.id} title={article.title} slug={article.slug} image={article.image} />
                ))}
            </section>
        </aside>
    )
};