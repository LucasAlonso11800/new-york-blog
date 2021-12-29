import React, { useEffect, useState } from 'react';
// Components
import Link from 'next/link';
// Styles
import classes from '../../styles/components/LayoutComponents/Header.module.css';
// Types
import { CategoryType } from '../../types/Types';
import Image from 'next/image';

type Props = {
    categories: CategoryType[]
    image: string
}

export default function Header({ categories, image }: Props) {
    const [width, setWidth] = useState<number>();
    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState('');

    if (typeof window !== 'undefined') window.addEventListener('resize', () => setWidth(window.innerWidth));

    useEffect(() => setWidth(window.innerWidth), []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.location.assign(`/search/${query}`);
    };

    return (
        <header className={classes.header}>
            <nav className={classes.nav}>
                <ul className={classes.list}>
                    {width && width > 765 ?
                        <li className={classes.listItem}>
                            <a className={classes.link}>Categories</a>
                            <ul className={classes.sublist}>
                                {categories.map(category => {
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
                                    {categories.map(category => {
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
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        className={classes.input}
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Search...'
                    />
                </form>
            </nav>
            <div className={classes.siteLogoContainer}>
                <Link href="/">
                    <Image src={image} height="175" width="670" />
                </Link>
            </div>
        </header>
    )
};