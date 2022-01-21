import React from 'react'
// Styles
import classes from '../../styles/components/LayoutComponents/Footer.module.css';
// GraphQL
import { useQuery } from '@apollo/client';
import { GET_METADATA } from '../../ApolloClient/querys';
// Types
import { MetadataNames, MetadataType } from '../../types/Types';

export default function Footer() {
    const { data: metadataQuery } = useQuery(GET_METADATA);
    const metadata = metadataQuery?.getMetadata || [];

    const text: MetadataType = metadata.find((data: MetadataType) => data.name === MetadataNames.FOOTER_TEXT);

    return (
        <footer className={classes.footer}>
            <div></div>
            <div className={classes.copyright}>
                <p>{text?.value}</p>
            </div>
            <div></div>
        </footer>
    )
};