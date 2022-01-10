import React, { useContext, useState } from 'react';
import classes from '../../styles/components/AdminPage.module.css';
// Context
import { GlobalContext } from '../../context/GlobalContext';
// Components
import AdminLayout from '../../components/LayoutComponents/AdminLayout';
import Main from '../../components/LayoutComponents/Main';
import Modal from '../../components/Modal';
import { Icon } from '@iconify/react';
// GraphQL
import { getCategories, getMetadata, GET_CATEGORIES, GET_METADATA } from '../../ApolloClient/querys';
import { addApolloState, initializeApollo } from '../../ApolloClient/NewApolloConfig';
// Types
import { CategoryType, MetadataType, ModalActions } from '../../types/Types';
import { useQuery } from '@apollo/client';

export default function AdminPage() {
    const { user, setModalInfo } = useContext(GlobalContext);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>();
    const [selectedMetadata, setSelectedMetadata] = useState<MetadataType>();

    if (user === null && typeof window !== 'undefined') window.location.assign('/');

    const handleModalOpen = (action: ModalActions, title: string) => {
        setModalInfo({
            open: true,
            action,
            title
        });
    };

    const { data: { getCategories: categories } } = useQuery(GET_CATEGORIES);
    const { data: { getMetadata: metadata } } = useQuery(GET_METADATA);

    const handleRowSelected = (row: CategoryType | MetadataType, type: 'C' | 'M') => {
        if (type === 'C') {
            if (row.id === selectedCategory?.id) return setSelectedCategory(undefined);
            return setSelectedCategory(row as CategoryType);
        };
        if (type === 'M') {
            if (row.id === selectedMetadata?.id) return setSelectedMetadata(undefined);
            return setSelectedMetadata(row as MetadataType);
        };
    };

    return (
        <AdminLayout title="Admin - ">
            <Main>
                <Modal category={selectedCategory} setSelectedCategory={setSelectedCategory} setSelectedMetadata={setSelectedMetadata}/>
                <h1 className={classes.title}>Admin page</h1>
                <section className={classes.section}>
                    <h4 className={classes.subtitle}>List of categories</h4>
                    <div className={classes.tableContainer}>
                        <div className={classes.table}>
                            {categories.map((category: CategoryType) => {
                                return <div className={selectedCategory?.id === category.id ? classes.rowSelected : classes.row}
                                    onClick={() => handleRowSelected(category, 'C')}>
                                    {category.name}
                                </div>
                            })}
                        </div>
                        <div className={classes.buttons}>
                            {selectedCategory ?
                                <>
                                    <Icon
                                        icon="bx:bxs-message-square-edit"
                                        fontSize={40}
                                        onClick={() => handleModalOpen(ModalActions.EDIT_CATEGORY, 'Edit a category')}
                                    />
                                    <Icon
                                        icon="bx:bxs-trash"
                                        fontSize={40}
                                        onClick={() => handleModalOpen(ModalActions.DELETE_CATEGORY, 'Delete a category')}
                                    />
                                </>
                                :
                                <Icon
                                    icon="bx:bxs-message-rounded-add"
                                    fontSize={40}
                                    onClick={() => handleModalOpen(ModalActions.ADD_CATEGORY, 'Add a category')}
                                />
                            }
                        </div>
                    </div>
                </section>
            </Main>
        </AdminLayout>
    )
};

export async function getStaticProps() {
    const client = initializeApollo();
    try {
        await getCategories(client);
        await getMetadata(client);

        return addApolloState(client, {
            props: {}
        })
    }
    catch (err) {
        console.log(err);
        return addApolloState(client, {
            props: {}
        });
    }
};