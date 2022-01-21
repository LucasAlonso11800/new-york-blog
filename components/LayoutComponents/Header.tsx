import React, { useEffect, useState } from 'react';
// Components
import Link from 'next/link';
import Image from 'next/image';
import { GET_CATEGORIES, GET_METADATA } from '../../ApolloClient/querys';
// Utils
import { fixFirebaseURL } from '../../utils/fixFirebaseURL';
// Styles
import classes from '../../styles/components/LayoutComponents/Header.module.css';
// Types
import { CategoryType, MetadataNames, MetadataType } from '../../types/Types';
import { useQuery } from '@apollo/client';

export default function Header() {
    const [width, setWidth] = useState<number>();
    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState('');

    if (typeof window !== 'undefined') window.addEventListener('resize', () => setWidth(window.innerWidth));

    useEffect(() => setWidth(window.innerWidth), []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.location.assign(`/search/${query}`);
    };

    const { data: categoriesQuery } = useQuery(GET_CATEGORIES);
    const { data: metadataQuery } = useQuery(GET_METADATA);

    const categories = categoriesQuery?.getCategories || [];
    const metadata = metadataQuery?.getMetadata || [];
    const image: MetadataType = metadata.find((data: MetadataType) => data.name === MetadataNames.HEADER_IMAGE);

    return (
        <header className={classes.header} data-testid="header">
            <nav className={classes.nav}>
                <ul className={classes.list}>
                    {width && width > 765 ?
                        <li className={classes.listItem}>
                            <a className={classes.link}>Categories</a>
                            <ul className={classes.sublist}>
                                {categories.map((category: CategoryType) => {
                                    return (
                                        <li key={category.id} className={classes.listItem}>
                                            <Link href={`/categories/${category.path}`}>{category.name}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                        :
                        <li className={classes.listItem}>
                            <a className={classes.link} onClick={() => setMenuOpen(!menuOpen)}>Menu</a>
                            {menuOpen &&
                                <ul className={`${classes.sublist} ${classes.open}`}>
                                    {categories.map((category: CategoryType) => {
                                        return (
                                            <li key={category.id} className={classes.listItem}>
                                                <Link href={`/categories/${category.path}`}>{category.name}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            }
                        </li>
                    }
                </ul>
                <form onSubmit={(e) => handleSubmit(e)} data-testid="searchForm">
                    <input
                        className={classes.input}
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Search...'
                    />
                </form>
            </nav>
            {image?.value &&
                <div className={classes.siteLogoContainer}>
                    <Link href="/">
                        <Image src={fixFirebaseURL(image.value)} height="106" width="705" />
                    </Link>
                </div>
            }
        </header>
    )
};