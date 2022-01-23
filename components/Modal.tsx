import React, { useContext, useRef, useState } from 'react';
// Context
import { GlobalContext } from '../context/GlobalContext';
// Styles
import classes from '../styles/components/Modal.module.css'
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Utils
import { toKebabCase } from '../utils/toKebabCase';
import { fixFirebaseURL } from '../utils/fixFirebaseURL';
import { getImageSize } from '../utils/getImageSize';
// Components
import LoadingIcon from './LoadingIcon';
import Image from 'next/image';
// GraphQL
import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, EDIT_METADATA } from '../ApolloClient/mutations';
import { GET_CATEGORIES, GET_METADATA } from '../ApolloClient/querys';
import { useMutation } from '@apollo/client';
// Firebase
import { storage } from '../const/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// Types
import { CategoryType, MetadataNames, MetadataType, ModalActions } from '../types/Types';

type Props = {
    category?: CategoryType
    metadata?: MetadataType
    setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryType | undefined>>
    setSelectedMetadata: React.Dispatch<React.SetStateAction<MetadataType | undefined>>
};

const categoryValidation = yup.object({
    name: yup.string().required("Please add the category's name"),
    path: yup.string().lowercase("Path must be lowercase").required("Please add the category's path"),
});

const metadataValidation = yup.object({
    name: yup.string().required(),
    value: yup.string().required("Please add a value"),
});

export default function Modal({ category, metadata, setSelectedCategory, setSelectedMetadata }: Props) {
    const [image, setImage] = useState({ src: '', alt: 'Image' });
    const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer>();
    const [uploadingFile, setUploadingFile] = useState<boolean>(false);

    const { modalInfo: { open, action, title }, setModalInfo, setToastInfo } = useContext(GlobalContext);
    const isAnImage: boolean = metadata?.name === MetadataNames.ABOUT_IMAGE || metadata?.name === MetadataNames.HEADER_IMAGE || metadata?.name === MetadataNames.HEAD_ICON;

    const handleModalClose = () => {
        setModalInfo({
            open: false,
            action: null,
            title: ''
        });
        setSelectedCategory(undefined);
        setSelectedMetadata(undefined);
    };

    const mutation = getMutation(action);
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
            if (mutation === EDIT_METADATA) {
                const data = proxy.readQuery({
                    query: GET_METADATA
                }) as any;
                const index = data.getMetadata.map((md: MetadataType) => md.id).indexOf(metadata?.id);
                const newMetadata = [...data.getMetadata];
                newMetadata[index] = result.data.editMetadata;
                proxy.writeQuery({
                    query: GET_METADATA,
                    data: { getMetadata: newMetadata }
                });
            };
            handleModalClose();
        },
        onError: (err) => setToastInfo({ open: true, message: err.message, type: 'error' })
    });

    const formik = useFormik({
        initialValues: {
            id: metadata?.id || category?.id,
            name: metadata?.name || category?.name || '',
            path: category?.path || '',
            value: metadata?.value || ''
        },
        enableReinitialize: true,
        validationSchema: action === ModalActions.EDIT_METADATA ? metadataValidation : categoryValidation,
        onSubmit: (values) => {
            switch (action) {
                case ModalActions.ADD_CATEGORY: return callMutation({ variables: { categoryName: values.name, categoryPath: toKebabCase(values.path) } });
                case ModalActions.EDIT_CATEGORY: return callMutation({ variables: { categoryId: values.id, categoryName: values.name, categoryPath: toKebabCase(values.path) } });
                case ModalActions.DELETE_CATEGORY: return callMutation({ variables: { categoryId: values.id } });
                case ModalActions.EDIT_METADATA: return handleMetadataSubmit(values, callMutation, file, setUploadingFile);
                default: break
            };
        }
    });

    const handleReaderLoaded = (readerEvt: any) => {
        const binaryString = readerEvt.target.result
        setImage({ ...image, src: btoa(binaryString) })
    };

    const handleImg = (e: any) => {
        const file = e.target.files[0]
        if (file) {
            setFile(file);
            setImage({ ...image, alt: file.name })
            const reader = new FileReader();
            reader.onload = handleReaderLoaded;
            reader.readAsBinaryString(file);
        }
    };

    const inputFile: any = useRef(null);
    const onButtonClick = () => inputFile.current.click();

    return (
        <div className={classes.container} style={{ display: open ? 'flex' : 'none' }}>
            <div className={classes.modal} data-testid="modal">
                <h2 className={classes.title}>{title}</h2>
                {action === ModalActions.EDIT_METADATA ?
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <div className={classes.inputContainer}>
                            <label className={classes.label}>Name</label>
                            <input
                                name="name"
                                className={classes.input}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                disabled
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <label className={classes.label}>Value</label>
                            <input
                                name="value"
                                placeholder='Add metadata value'
                                className={classes.input}
                                value={formik.values.value}
                                onChange={formik.handleChange}
                                disabled={loading}
                            />
                        </div>
                        {formik.touched.value && formik.errors.value &&
                            <p className={classes.error}>{formik.errors.value}</p>
                        }
                        {isAnImage &&
                            <div className={classes.imageContainer} data-testid="metadataImage">
                                <Image
                                    src={file ? `data:image/png;base64,${image.src}` : fixFirebaseURL(metadata?.value as string)}
                                    alt={image.alt}
                                    height={getImageSize(metadata?.name as MetadataNames, false)}
                                    width={getImageSize(metadata?.name as MetadataNames, true)}
                                />
                                <input
                                    style={{ display: "none" }}
                                    accept="image/png, image/jpeg, image/jpg"
                                    ref={inputFile}
                                    onChange={handleImg}
                                    type="file"
                                />
                                <button
                                    type="button"
                                    onClick={() => onButtonClick()}
                                    className={classes.button}
                                    disabled={loading || uploadingFile}
                                >
                                    Change image
                                </button>
                            </div>
                        }
                        <div className={classes.buttonsContainer}>
                            <button className={classes.button} type="submit">Confirm</button>
                            <button className={classes.button} type="button" onClick={() => handleModalClose()}>Cancel</button>
                        </div>
                    </form>
                    :
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
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
                        {formik.touched.name && formik.errors.name &&
                            <p className={classes.error}>{formik.errors.name}</p>
                        }
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
                        {formik.touched.path && formik.errors.path &&
                            <p className={classes.error}>{formik.errors.path}</p>
                        }
                        <div className={classes.buttonsContainer}>
                            <button className={classes.button} type="submit">Confirm</button>
                            <button className={classes.button} type="button" onClick={() => handleModalClose()}>Cancel</button>
                        </div>
                    </form>
                }
                {loading || uploadingFile ? <LoadingIcon /> : null}
            </div>
        </div>
    )
};


function getMutation(action: ModalActions | null) {
    switch (action) {
        case ModalActions.ADD_CATEGORY: return ADD_CATEGORY;
        case ModalActions.EDIT_CATEGORY: return EDIT_CATEGORY;
        case ModalActions.DELETE_CATEGORY: return DELETE_CATEGORY;
        case ModalActions.EDIT_METADATA: return EDIT_METADATA;
        default: return ADD_CATEGORY;
    }
};

type Values = {
    id: string | undefined
    name: string
    path: string
    value: string
};

async function handleMetadataSubmit(values: Values, callMutation: any, file: Blob | Uint8Array | ArrayBuffer | undefined, setUploadingFile: React.Dispatch<React.SetStateAction<boolean>>) {
    const isAnImage = values.name === MetadataNames.ABOUT_IMAGE || values.name === MetadataNames.HEADER_IMAGE || values.name === MetadataNames.HEAD_ICON;
    if (file && isAnImage) {
        setUploadingFile(true);
        const imageURL = await uploadToFirebase(file, values.name);
        setUploadingFile(false);
        return callMutation({ variables: { id: values.id, name: values.name, value: fixFirebaseURL(imageURL) } });
    };
    return callMutation({ variables: { id: values.id, name: values.name, value: values.value } });
};

async function uploadToFirebase(file: Blob | Uint8Array | ArrayBuffer, name: string): Promise<string> {
    const fileRef = ref(storage, `metadata/${name}/value.jpg`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
};