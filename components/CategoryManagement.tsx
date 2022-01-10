import React, { useContext } from 'react';
// Context
import { GlobalContext } from '../context/GlobalContext';
// GraphQL
import { useMutation } from '@apollo/client';
import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY } from '../ApolloClient/mutations';
import { GET_CATEGORIES } from '../ApolloClient/querys';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Styles
import classes from '../styles/components/Modal.module.css';
// Types
import { DocumentNode } from 'graphql';
import { CategoryType, ModalActions } from '../types/Types';

type Props = {
    category?: CategoryType
    setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryType | undefined>>
};

const validationSchema = yup.object({
    name: yup.string().required("Please add the category's name"),
    path: yup.string().lowercase("Path must be lowercase").required("Please add the category's path"),
});

export default function CategoryManagement({ category, setSelectedCategory }: Props) {
    const { modalInfo: { title, action }, setModalInfo } = useContext(GlobalContext);

    const handleModalClose = () => {
        setModalInfo({
            open: false,
            action: null,
            title: ''
        });
        setSelectedCategory(undefined);
    };

    const mutation = getMutation(action) as DocumentNode;
    const [callMutation, { loading }] = useMutation(mutation, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_CATEGORIES
            }) as any;

            if (mutation === ADD_CATEGORY) {
                proxy.writeQuery({
                    query: GET_CATEGORIES,
                    data: { getCategories: [...data.getCategories, result.data.addCategory] }
                })
            };
            if (mutation === EDIT_CATEGORY) {
                const index = data.getCategories.map((category: CategoryType) => category.id).indexOf(category?.id);
                const newCategories = [...data.getCategories];
                newCategories[index] = result.data.editCategory;
                proxy.writeQuery({
                    query: GET_CATEGORIES,
                    data: { getCategories: newCategories }
                })
            };
            if (mutation === DELETE_CATEGORY) {
                proxy.writeQuery({
                    query: GET_CATEGORIES,
                    data: { getCategories: data.getCategories.filter((cat: CategoryType) => cat.id !== category?.id) }
                })
            };
            handleModalClose();
        },
        onError: (err: any) => console.log(err)
    });

    const formik = useFormik({
        initialValues: {
            id: category?.id,
            name: category ? category.name : '',
            path: category ? category.path : ''
        },
        validationSchema,
        onSubmit: (values) => {
            switch (action) {
                case ModalActions.ADD_CATEGORY: return callMutation({ variables: { categoryName: values.name, categoryPath: values.path } });
                case ModalActions.EDIT_CATEGORY: return callMutation({ variables: { categoryId: values.id, categoryName: values.name, categoryPath: values.path } });
                case ModalActions.DELETE_CATEGORY: return callMutation({ variables: { categoryId: values.id } });
                default: return
            }
        }
    });

    return (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <h2 className={classes.title}>{title}</h2>
            <div className={classes.inputContainer}>
                <label className={classes.label}>Name</label>
                <input
                    name="name"
                    className={classes.input}
                    placeholder="Add category name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    disabled={loading || action === ModalActions.DELETE_CATEGORY}
                />
            </div>
            <div className={classes.inputContainer}>
                <label className={classes.label}>Path</label>
                <input
                    name="path"
                    className={classes.input}
                    placeholder="Add category path"
                    value={formik.values.path}
                    onChange={formik.handleChange}
                    disabled={loading || action === ModalActions.DELETE_CATEGORY}
                />
            </div>
            <div className={classes.buttonsContainer}>
                <button className={classes.button} type="submit">Confirm</button>
                <button className={classes.button} type="button" onClick={() => handleModalClose()}>Cancel</button>
            </div>
        </form>
    )
};

function getMutation(action: ModalActions | null) {
    switch (action) {
        case ModalActions.ADD_CATEGORY: return ADD_CATEGORY;
        case ModalActions.EDIT_CATEGORY: return EDIT_CATEGORY;
        case ModalActions.DELETE_CATEGORY: return DELETE_CATEGORY;
        default: return
    }
};