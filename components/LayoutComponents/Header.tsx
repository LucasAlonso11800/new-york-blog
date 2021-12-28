import React, { useEffect, useState } from 'react';
// Components
import Link from 'next/link';
// Styles
import classes from '../../styles/components/LayoutComponents/Header.module.css';
// Types
import { CategoryType } from '../../types/Types';

type Props = {
    categories: CategoryType[]
}

export default function Header({ categories }: Props) {
    const [width, setWidth] = useState<number>();
    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState('');

    if (typeof window !== 'undefined') window.addEventListener('resize', () => setWidth(window.innerWidth));

    useEffect(() => setWidth(window.innerWidth), []);

    // Make search work
    // Get image from backend

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
                                            <Link href={`categories/${category.path}`}>{category.name}</Link>
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
                                                <Link href={`categories/${category.path}`}>{category.name}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            }
                        </li>
                    }
                </ul>
                <form>
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
                <p className={classes.siteLogo}>
                    <Link href="/">.</Link>
                </p>
            </div>
        </header>
    )
};