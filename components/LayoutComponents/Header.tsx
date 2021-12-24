import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import classes from '../../styles/components/LayoutComponents/Header.module.css';

export default function Header() {
    const [width, setWidth] = useState<number>();
    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState('');

    if (typeof window !== 'undefined') window.addEventListener('resize', () => setWidth(window.innerWidth));

    useEffect(() => setWidth(window.innerWidth), []);

    // Make search work
    // Get categories and URLs from backend
    // Get image from backend

    return (
        <header className={classes.header}>
            <nav className={classes.nav}>
                <ul className={classes.list}>
                    {width && width > 765 ?
                        <li className={classes.listItem}>
                            <a className={classes.link}>Categories</a>
                            <ul className={classes.sublist}>
                                <li className={classes.listItem}><Link href="/living">NYC Life</Link></li>
                                <li className={classes.listItem}><Link href="/travel" >Travel</Link></li>
                                <li className={classes.listItem}><Link href="/guides" >Guides</Link></li>
                                <li className={classes.listItem}><Link href="/food" >Food and Drink</Link></li>
                                <li className={classes.listItem}><Link href="/art-and-culture" >Art and Culture</Link></li>
                                <li className={classes.listItem}><Link href="/out-and-about" >Out and About</Link></li>
                                <li className={classes.listItem}><Link href="/style" >Style</Link></li>
                            </ul>
                        </li>
                        :
                        <li className={classes.listItem}>
                            <a className={classes.link} onClick={() => setMenuOpen(!menuOpen)}>Menu</a>
                            {menuOpen &&
                                <ul className={`${classes.sublist} ${classes.open}`}>
                                    <li className={classes.listItem}><Link href="/living">NYC Life</Link></li>
                                    <li className={classes.listItem}><Link href="/travel" >Travel</Link></li>
                                    <li className={classes.listItem}><Link href="/guides" >Guides</Link></li>
                                    <li className={classes.listItem}><Link href="/food" >Food and Drink</Link></li>
                                    <li className={classes.listItem}><Link href="/art-and-culture" >Art and Culture</Link></li>
                                    <li className={classes.listItem}><Link href="/out-and-about" >Out and About</Link></li>
                                    <li className={classes.listItem}><Link href="/style" >Style</Link></li>
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