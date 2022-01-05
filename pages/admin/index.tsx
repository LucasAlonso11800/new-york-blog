import React from 'react';
// Components
import AdminLayout from '../../components/LayoutComponents/AdminLayout';
import Main from '../../components/LayoutComponents/Main';
// GraphQL
import { getCategories, getMetadata } from '../../ApolloClient/querys';
// Const
import { DEFAULT_METADATA } from '../../const/defaultMetadata';
// Types
import { LayoutProps } from '../../types/Types';

type Props = { layoutProps: LayoutProps }

export default function AdminPage({ layoutProps }: Props) {
    return (
        <AdminLayout {...layoutProps}>
            <Main>
                <h1>Admin page</h1>
            </Main>
        </AdminLayout>
    )
};

export async function getStaticProps() {
    try {
        const categories = await getCategories();
        const metadata = await getMetadata();

        return {
            props: {
                layoutProps: {
                    title: "Admin" + " - ",
                    categories: categories.data.getCategories,
                    ...metadata
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        return {
            props: {
                layoutProps: {
                    title: "",
                    categories: [],
                    ...DEFAULT_METADATA
                }
            }
        }
    }
};