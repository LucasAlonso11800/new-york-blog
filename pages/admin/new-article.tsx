import React, { useContext, useState, useRef, useEffect } from 'react'
// Context
import { GlobalContext } from '../../context/GlobalContext';
// Styles
import classes from '../../styles/components/Admin/NewArticlePage.module.css';
// Components
import AdminLayout from '../../components/LayoutComponents/AdminLayout';
import Main from '../../components/LayoutComponents/Main'
import Image from 'next/image';
import ArticleMeta from '../../components/ArticleComponents/ArticleMeta';
import { Icon } from '@iconify/react';
import LoadingIcon from '../../components/LoadingIcon';
// Const
import { initialImage, initialQuote, initialText, initialSubtitle } from '../../const/initialArticleComponents';
// Utils
import { getBase64Src } from '../../utils/getBase64Src';
import { checkAuth } from '../../utils/checkAuth';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Firebase
import { storage } from '../../const/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// GraphQL
import { addApolloState, initializeApollo } from '../../ApolloClient/NewApolloConfig';
import { getCategories, getComponentsList, getMetadata } from '../../ApolloClient/querys';
import { ApolloError, useMutation } from '@apollo/client';
import { ADD_ARTICLE } from '../../ApolloClient/mutations';
// Types
import { ArticleComponentNames, CategoryType, ComponentType, UserRoles } from '../../types/Types';

type Props = {
    categories: CategoryType[]
    components: ComponentType[]
    error: ApolloError
};

export default function NewArticle({ categories, components, error }: Props) {
    const { user, setToastInfo } = useContext(GlobalContext);
    checkAuth(user);

    useEffect(() => {
        if (error) setToastInfo({ open: true, message: error.message, type: 'error' });
    }, []);

    const defaultImage = '/NewArticleImagePlaceholder.jpg';

    const [newComponent, setNewComponent] = useState<ComponentType>(components[0]);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [subtitleVariant, setSubtitleVariant] = useState<'C' | 'L'>('C');
    const [secondaryMenuOpen, setSecondaryMenuOpen] = useState<boolean>(false);
    const [categoryOptionsOpen, setCategoryOptionsOpen] = useState<boolean>(false);
    const [images, setImages] = useState<{ src: string, alt: string }[]>([{ src: defaultImage, alt: 'Default image' }]);
    const [files, setFiles] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [addArticle] = useMutation(ADD_ARTICLE, {
        onCompleted: () => {
            window.location.assign(user?.roleName === UserRoles.ADMIN ? '/admin/article-list?newArticle="true"' : '/admin/article-queue?newArticle="true"');
        },
        onError: (err) => setToastInfo({ open: true, message: err.message, type: "error" })
    });

    const validationSchema = yup.object({
        title: yup.string().required("Please a title"),
        categoryId: yup.string().required("Please select a category"),
        image: yup.string().notOneOf([defaultImage], 'Please change the default image').required("Please add an image"),
        slug: yup.string().required("Please add a slug"),
    });

    const formik = useFormik({
        initialValues: {
            title: "Add your new article's title",
            categoryId: categories[0].id,
            image: images[0].src,
            slug: 'your-new-article',
            components: [
                {
                    image: '',
                    componentId: components.find(component => component.name === ArticleComponentNames.ARTICLE_TITLE)?.id,
                    componentName: ArticleComponentNames.ARTICLE_TITLE,
                    order: 1,
                    text: "Add your new article's second title",
                    fontWeight: null,
                    textAlign: null
                },
                {
                    image: null,
                    componentId: components.find(component => component.name === ArticleComponentNames.ARTICLE_TEXT)?.id,
                    componentName: ArticleComponentNames.ARTICLE_TEXT,
                    order: 2,
                    text: "Add a paragraph",
                    fontWeight: null,
                    textAlign: null
                }]
        },
        validationSchema,
        onSubmit: async (values) => {
            if (formik.values.components.some(component => component.image === defaultImage)) {
                formik.setStatus('No default images can be saved');
                return
            };
            formik.setStatus(null);
            setLoading(true);
            const fileRef = ref(storage, `articles/${values.slug}/main.jpg`);
            await uploadBytes(fileRef, files[0]);
            const imageURL = await getDownloadURL(fileRef);

            const components = await Promise.all(
                values.components.map(async (component, index) => {
                    if (component.image !== null) {
                        const fileRef = ref(storage, `articles/${values.slug}/${component.order}.jpg`);
                        await uploadBytes(fileRef, files[index]);
                        const url = await getDownloadURL(fileRef);
                        return { ...component, image: url };
                    };
                    return component;
                })
            );

            await addArticle({
                variables: {
                    userId: user?.id,
                    userRole: user?.roleName,
                    title: values.title,
                    categoryId: values.categoryId,
                    components,
                    image: imageURL,
                    slug: values.slug
                }
            });
            setLoading(false);
        }
    });
    
    const handleComponentChange = (e: React.ChangeEvent<any>, index: number, componentName: ArticleComponentNames): void => {
        const components = [...formik.values.components];
        if (componentName !== ArticleComponentNames.IMAGE) {
            const newComponent = { ...components[index], text: e.target.value };
            components.splice(index, 1, newComponent);
            formik.setFieldValue('components', components);
        }
    };

    const handleComponentDelete = (index: number): void => {
        if (formik.values.components[index].image !== null) {
            setImages(images => images.filter((_, idx) => idx !== index));
            setFiles((files: any) => files.filter((_: any, idx: number) => idx !== index));
        };
        formik.setFieldValue('components', formik.values.components.filter((_: any, idx) => idx !== index))
    };

    const handleComponentSelect = (component: ComponentType) => {
        setNewComponent(component);
        setMenuOpen(false);
    };

    const handleSubtitleSelect = (align: 'L' | 'C') => {
        setSubtitleVariant(align);
        setSecondaryMenuOpen(false);
    };

    const handleComponentAdd = (): void => {
        const order = formik.values.components.length + 1;
        const componentId = components.find(component => component.name === newComponent.name)?.id;

        switch (newComponent.name) {
            case ArticleComponentNames.ARTICLE_TEXT:
                const newText: any = { ...initialText, order, componentId };
                formik.setFieldValue('components', [...formik.values.components, newText])
                break;
            case ArticleComponentNames.ARTICLE_QUOTE:
                const newQuote: any = { ...initialQuote, order, componentId };
                formik.setFieldValue('components', [...formik.values.components, newQuote]);
                break;
            case ArticleComponentNames.ARTICLE_SUBTITLE:
                const newSubtitle: any = { ...initialSubtitle, order, componentId, fontWeight: subtitleVariant === 'C' ? '400' : '600', textAlign: subtitleVariant === 'C' ? 'center' : 'left' };
                formik.setFieldValue('components', [...formik.values.components, newSubtitle]);
                break;
            case ArticleComponentNames.IMAGE:
                const newImage: any = { ...initialImage, order, componentId };
                formik.setFieldValue('components', [...formik.values.components, newImage]);
                break;
            default: return
        }
    };

    const handleReaderLoaded = (readerEvt: ProgressEvent<FileReader>, alt: string, index: number) => {
        if (readerEvt.target === null) return;
        const { result } = readerEvt.target;
        const newImages = [...images];
        newImages[index] = { src: btoa(result as string), alt: alt ? alt : 'Default image' };
        setImages(newImages);
        if (index === 0) formik.setFieldValue('image', btoa(result as string));
        if (index > 0){
            const newComponents = [...formik.values.components];
            newComponents[index].image = btoa(result as string);
            formik.setFieldValue('components', newComponents);
        }
    };

    const handleImg = (e: any, index: number) => {
        const file = e.target.files[0];
        if (file) {
            const newFiles = [...files];
            newFiles[index] = file;
            setFiles(newFiles);
            const reader = new FileReader();
            reader.onload = (e) => handleReaderLoaded(e, file.name, index);
            reader.readAsBinaryString(file);
        }
    };

    const imageRef: any = useRef(null);
    const onMainImageClick = () => imageRef.current.click();

    return (
        <AdminLayout title="Create a new article - ">
            <Main>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <div className={classes.articleContainer}>
                        <input
                            className={classes.title}
                            name="title"
                            value={formik.values.title}
                            onChange={(e) => {
                                if (e.target.value.length > 0) {
                                    const formattedTitle = e.target.value
                                        .split(" ")
                                        .map(word => {
                                            if (word.length > 0) return word[0].toUpperCase() + word.substring(1);
                                            return "";
                                        })
                                        .join(" ");
                                    return formik.setFieldValue('title', formattedTitle);
                                };
                                formik.setFieldValue('title', "")
                            }}
                        />
                        <ArticleMeta
                            categoryName={categories.find(cat => cat.id === formik.values.categoryId)?.name as string}
                            categoryPath={categories.find(cat => cat.id === formik.values.categoryId)?.path as string}
                            authorName={user?.username as string}
                        />
                        <div style={{ position: 'relative' }}>
                            <Image
                                src={formik.values.image === defaultImage ? formik.values.image : getBase64Src(formik.values.image)}
                                alt="Main image"
                                height="535"
                                width="800"
                                priority
                                onClick={() => onMainImageClick()}
                            />
                            <p className={classes.imageLabel}>Click on the image to change it</p>
                        </div>
                        <input
                            style={{ display: "none" }}
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            ref={imageRef}
                            onChange={(e) => handleImg(e, 0)}
                            type="file"
                        />
                        {formik.values.components.map((component, index) => {
                            switch (component.componentName) {
                                case ArticleComponentNames.ARTICLE_TITLE: return (
                                    <input
                                        key={index}
                                        className={classes.secondTitle}
                                        name="text"
                                        value={component.text}
                                        onChange={(e) => handleComponentChange(e, index, component.componentName)}
                                    />
                                );
                                case ArticleComponentNames.ARTICLE_TEXT: return (
                                    <section className={classes.component} key={index}>
                                        <textarea
                                            className={classes.text}
                                            value={component.text}
                                            name="text"
                                            onInput={(e) => {
                                                e.currentTarget.style.height = "";
                                                e.currentTarget.style.height = e.currentTarget.scrollHeight + "px"
                                            }}
                                            onChange={(e) => handleComponentChange(e, index, component.componentName)}
                                            spellCheck={false}
                                        />
                                        <Icon
                                            className={classes.deleteButton}
                                            icon="bx:bxs-trash"
                                            fontSize={32}
                                            onClick={() => handleComponentDelete(index)}
                                        />
                                    </section>
                                );
                                case ArticleComponentNames.ARTICLE_QUOTE: return (
                                    <section className={classes.component} key={index}>
                                        <input
                                            className={classes.quote}
                                            value={`"${component.text}"`}
                                            name="text"
                                            onChange={(e) => handleComponentChange(e, index, component.componentName)}
                                            spellCheck={false}
                                        />
                                        <Icon
                                            className={classes.deleteButton}
                                            icon="bx:bxs-trash"
                                            fontSize={32}
                                            onClick={() => handleComponentDelete(index)}
                                        />
                                    </section>
                                );
                                case ArticleComponentNames.ARTICLE_SUBTITLE: return (
                                    <section className={classes.component} key={index}>
                                        <input
                                            className={classes.subtitle}
                                            style={{ fontWeight: component.fontWeight as any, textAlign: component.textAlign as any }}
                                            value={component.text}
                                            name="text"
                                            onChange={(e) => handleComponentChange(e, index, component.componentName)}
                                            spellCheck={false}
                                        />
                                        <Icon
                                            className={classes.deleteButton}
                                            icon="bx:bxs-trash"
                                            fontSize={32}
                                            onClick={() => handleComponentDelete(index)}
                                        />
                                    </section>
                                );
                                case ArticleComponentNames.IMAGE: return (
                                    <section className={classes.component} key={index}>
                                        <Image
                                            src={images[index] ? getBase64Src(images[index].src) : component.image as any}
                                            alt={images[index] ? images[index].alt : "Article image"}
                                            height="535"
                                            width="800"
                                            onClick={() => document.getElementById(`article-new-image${index}`)?.click()}
                                        />
                                        <input
                                            style={{ display: "none" }}
                                            accept="image/png, image/jpeg, image/jpg, image/webp"
                                            id={`article-new-image${index}`}
                                            onChange={(e) => handleImg(e, index)}
                                            type="file"
                                        />
                                        <p className={classes.imageLabel}>Click on the image to change it</p>
                                        <Icon
                                            className={classes.deleteButton}
                                            icon="bx:bxs-trash"
                                            fontSize={32}
                                            onClick={() => handleComponentDelete(index)}
                                        />
                                    </section>
                                );
                                default: return null;
                            }
                        })}
                        <div className={classes.addComponent}>
                            <p>Add a new section</p>
                            <ul className={classes.list}>
                                <li className={classes.listItem} onClick={() => setMenuOpen(!menuOpen)}>{newComponent.name}</li>
                                <ul className={menuOpen ? `${classes.sublist} ${classes.open}` : classes.sublist}>
                                    {components
                                        .filter(component => component.id !== newComponent.id && component.name !== ArticleComponentNames.ARTICLE_TITLE)
                                        .map(component => (
                                            <li key={component.id} className={classes.listItem} onClick={() => handleComponentSelect(component)}>{component.name}</li>
                                        ))}
                                </ul>
                            </ul>
                            {!menuOpen && newComponent.name === ArticleComponentNames.ARTICLE_SUBTITLE &&
                                <ul className={classes.list}>
                                    <li className={classes.listItem} onClick={() => setSecondaryMenuOpen(!secondaryMenuOpen)}>{subtitleVariant === 'C' ? 'Centered' : 'To the left'}</li>
                                    <ul className={secondaryMenuOpen ? `${classes.sublist} ${classes.open}` : classes.sublist}>
                                        <li className={classes.listItem} onClick={() => handleSubtitleSelect(subtitleVariant === 'C' ? 'L' : 'C')}>{subtitleVariant === 'C' ? 'To the left' : 'Centered'}</li>
                                    </ul>
                                </ul>
                            }
                            <Icon
                                className={classes.addButton}
                                icon="bx:bxs-message-rounded-add"
                                fontSize={40}
                                onClick={() => handleComponentAdd()}
                            />
                        </div>
                        <button type="submit" className={classes.submitButton} disabled={loading}>Post new article</button>
                        {loading && <LoadingIcon />}
                    </div>
                    <div className={classes.options}>
                        <p>Select a category for the article</p>
                        <ul className={classes.list}>
                            <li className={classes.listItem} onClick={() => setCategoryOptionsOpen(!categoryOptionsOpen)}>{categories.find(cat => cat.id === formik.values.categoryId)?.name}</li>
                            <ul className={categoryOptionsOpen ? `${classes.sublist} ${classes.open}` : classes.sublist}>
                                {categories
                                    .filter(category => category.id !== formik.values.categoryId)
                                    .map(category => (
                                        <li key={category.id}
                                            className={classes.listItem}
                                            onClick={() => {
                                                setCategoryOptionsOpen(false);
                                                formik.setFieldValue('categoryId', category.id)
                                            }}
                                        >
                                            {category.name}
                                        </li>
                                    ))}
                            </ul>
                        </ul>
                        <p>Add a slug</p>
                        <input
                            spellCheck={false}
                            className={classes.input}
                            placeholder="Add a slug for the article"
                            name="slug"
                            value={formik.values.slug}
                            onChange={(e) => formik.setFieldValue('slug', e.target.value.toLowerCase().replaceAll(' ', '-'))}
                        />
                        {formik.status &&
                            <p className={classes.error}>{formik.status}</p>
                        }
                        {formik.touched.title && formik.errors.title &&
                            <p className={classes.error}>{formik.errors.title}</p>
                        }
                        {formik.touched.categoryId && formik.errors.categoryId &&
                            <p className={classes.error}>{formik.errors.categoryId}</p>
                        }
                        {formik.touched.image && formik.errors.image &&
                            <p className={classes.error}>{formik.errors.image}</p>
                        }
                        {formik.touched.slug && formik.errors.slug &&
                            <p className={classes.error}>{formik.errors.slug}</p>
                        }
                    </div>
                </form>
            </Main>
        </AdminLayout>
    )
};

export async function getStaticProps() {
    const client = initializeApollo();
    try {
        const [categories, components] = await Promise.all([
            await getCategories(client),
            await getComponentsList(client),
            await getMetadata(client)
        ]);

        return addApolloState(client, {
            props: {
                categories: categories.data.getCategories,
                components: components.data.getComponentsList
            },
            revalidate: 60 * 60
        })
    }
    catch (err) {
        console.log(JSON.stringify(err, null, 2));;
        return addApolloState(client, {
            props: {
                categories: [],
                components: [],
                error: JSON.parse(JSON.stringify(err))
            }
        });
    }
};