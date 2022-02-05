import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext';
import Link from 'next/link';
// Styles
import classes from '../../styles/components/LayoutComponents/Footer.module.css';
// GraphQL
import { useQuery } from '@apollo/client';
import { GET_METADATA } from '../../ApolloClient/querys';
// Types
import { MetadataNames, MetadataType } from '../../types/Types';

export default function Footer() {
    const { user, setUser } = useContext(GlobalContext);

    const { data: metadataQuery } = useQuery(GET_METADATA);
    const metadata = metadataQuery?.getMetadata || [];

    const text: MetadataType = metadata.find((data: MetadataType) => data.name === MetadataNames.FOOTER_TEXT);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <footer className={classes.footer}>
            <div className={classes.links}>
                {user !== null ?
                    <>
                        <Link href="/admin">Admin section</Link>
                        <p onClick={() => logout()}>Logout</p>
                    </>
                    :
                    <>
                        <Link href="/admin/login">Login</Link>
                        <Link href="/admin/register">Register</Link>
                    </>
                }
            </div>
            <div className={classes.copyright}>
                <p>{text?.value}</p>
            </div>
            <div></div>
        </footer>
    )
};