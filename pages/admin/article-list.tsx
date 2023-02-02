import React, { useContext, useEffect, useState } from 'react';
import classes from '../../styles/components/Admin/ListPages.module.css';
// Context
import { GlobalContext } from '../../context/GlobalContext';
// Components
import AdminLayout from '../../components/LayoutComponents/AdminLayout';
import Main from '../../components/LayoutComponents/Main';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import LoadingIcon from '../../components/LoadingIcon';
// Const
import { ARTICLE_LIST_LIMIT } from '../../const/Limits';
// Utils
import { fixFirebaseURL } from '../../utils/fixFirebaseURL';
import { formatDate } from '../../utils/formatDate';
import { checkAuth } from '../../utils/checkAuth';
// GraphQL
import { addApolloState, initializeApollo } from '../../ApolloClient/NewApolloConfig';
import { getAllArticles, getCategories, getMetadata, GET_ALL_ARTICLES } from '../../ApolloClient/querys';
import { DELETE_ARTICLE } from '../../ApolloClient/mutations';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
// Types
import { ArticleStatus, ArticleType, CategoryType, UserRoles } from '../../types/Types';

type Props = {
    categories: CategoryType[],
    error: ApolloError
};

export default function ArticleList({ categories, error }: Props) {
    const { user, setToastInfo } = useContext(GlobalContext);
    checkAuth(user);

    useEffect(() => {
        if (error) setToastInfo({ open: true, message: error.message, type: 'error' });
        if (window.location.search) {
            setToastInfo({ open: true, message: `Your article has been successfully created`, type: 'success' });
            window.history.pushState({}, "", window.location.pathname);
        };
    }, []);

    const { data: articlesQuery } = useQuery(GET_ALL_ARTICLES, { variables: { statusName: ArticleStatus.ACCEPTED } });
    const articles: ArticleType[] = articlesQuery?.getAllArticles || [];

    const [page, setPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState<number>(Math.ceil(articles.length / ARTICLE_LIST_LIMIT));
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [category, setCategory] = useState<string>("all");
    const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>(articles);
    const [popupInfo, setPopupInfo] = useState<{ text: string, articleId: string, action: "edit" | "delete" }>({ text: "", articleId: "", action: "edit" });
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        const newArticles = articles.filter(article => (
            article.title.toLowerCase().includes(title.toLowerCase()) &&
                article.authorName.toLowerCase().includes(author.toLowerCase()) &&
                category === "all" ? true : article.categoryName === category
        ));
        setFilteredArticles(newArticles);
        setNumberOfPages(Math.ceil(newArticles.length / ARTICLE_LIST_LIMIT));
    }, [page, numberOfPages, title, author, category, loading]);

    const handlePageChange = (newPage: number) => {
        if (newPage > numberOfPages) return setPage(newPage);
        if (newPage < 0) return setPage(0);
        return setPage(newPage);
    };

    const [deleteArticle] = useMutation(DELETE_ARTICLE, {
        update(proxy) {
            const data = proxy.readQuery({
                query: GET_ALL_ARTICLES,
                variables: { statusName: ArticleStatus.ACCEPTED }
            }) as any;
            proxy.writeQuery({
                query: GET_ALL_ARTICLES,
                variables: { statusName: ArticleStatus.ACCEPTED },
                data: { getAllArticles: data.getAllArticles.filter((article: ArticleType) => article.id !== popupInfo.articleId) }
            });
            setPopupInfo({ text: "", articleId: "", action: "edit" });
        },
        onError: (err) => setToastInfo({ open: true, message: err.message, type: 'error' })
    });

    return (
        <AdminLayout title="Article list - ">
            <Main>
                <h1 className={classes.title}>Article list</h1>
                <div className={classes.filters}>
                    <input className={classes.input} placeholder='Filter by title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input className={classes.input} placeholder='Filter by author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                    <p className={classes.label}>Category</p>
                    <select className={classes.input} onChange={(e) => setCategory(e.target.value)}>
                        <option value="all">All</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Created on</th>
                            <th>Visits</th>
                            <th>Author</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArticles.slice(page * ARTICLE_LIST_LIMIT, page * ARTICLE_LIST_LIMIT + ARTICLE_LIST_LIMIT).map(article => (
                            popupInfo.articleId === article.id ?
                                <tr key={article.id} className={popupInfo.action === 'edit' ? classes.approve : classes.delete}>
                                    <td colSpan={5}>{popupInfo.text}</td>
                                    {loading ?
                                        <td colSpan={2}>
                                            <LoadingIcon />
                                        </td>
                                        :
                                        user?.roleName === UserRoles.ADMIN || user?.id === article.id ?
                                            <>
                                                <td>
                                                    <Icon
                                                        icon="ic:sharp-cancel"
                                                        fontSize={32}
                                                        onClick={() => setPopupInfo({ text: "", articleId: "", action: "edit" })}
                                                    />
                                                    <p>Cancel</p>
                                                </td>
                                                <td>
                                                    {popupInfo.action === 'edit' &&
                                                        <Icon
                                                            icon="bx:bxs-message-square-edit"
                                                            fontSize={32}
                                                            onClick={() => window.location.assign(`/admin/edit-article/${article.slug}`)}
                                                        />
                                                    }
                                                    {popupInfo.action === 'delete' &&
                                                        <Icon
                                                            icon="bx:bxs-trash"
                                                            fontSize={32}
                                                            onClick={async () => {
                                                                setLoading(true);
                                                                await deleteArticle({
                                                                    variables: {
                                                                        articleId: article.id,
                                                                        userId: user.id,
                                                                        userRole: user.roleName,
                                                                        authorId: article.authorId
                                                                    }
                                                                });
                                                                setLoading(false);
                                                            }}
                                                        />
                                                    }
                                                    <p>Confirm</p>
                                                </td>
                                            </>
                                            : null
                                    }
                                </tr>
                                :
                                <tr key={article.id}>
                                    <td><Link href={`/articles/${article.slug}`}>{article.title}</Link></td>
                                    <td><Image src={fixFirebaseURL(article.image)} height="67" width="100" /></td>
                                    <td>{article.categoryName}</td>
                                    <td>{formatDate(article.createdAt)}</td>
                                    <td>{article.visits}</td>
                                    <td>{article.authorName}</td>
                                    <td>
                                        {user?.roleName === UserRoles.ADMIN || user?.id === article.id ?
                                            <>
                                                <Icon
                                                    icon="bx:bxs-message-square-edit"
                                                    fontSize={32}
                                                    onClick={() => setPopupInfo({ text: `Do you want to edit article "${article.title}"?`, articleId: article.id, action: "edit" })}
                                                />
                                                <Icon
                                                    icon="bx:bxs-trash"
                                                    fontSize={32}
                                                    onClick={() => setPopupInfo({ text: `Are you sure you want to delete article "${article.title}"?`, articleId: article.id, action: "delete" })}
                                                />
                                            </>
                                            : null
                                        }
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>

                <div className={classes.pagination}>
                    {page > 0 &&
                        <button className={classes.button} onClick={() => handlePageChange(page - 1)}>
                            <Icon icon="grommet-icons:form-previous" color="#000" fontSize={30} />
                        </button>
                    }
                    {page < numberOfPages - 1 &&
                        <button className={classes.button} onClick={() => handlePageChange(page + 1)}>
                            <Icon icon="grommet-icons:form-next" color="#000" fontSize={30} />
                        </button>
                    }
                </div>
            </Main>
        </AdminLayout>
    );
};

export async function getServerSideProps() {
    const client = initializeApollo();
    try {
        const [categories] = await Promise.all([
            await getCategories(client),
            await getAllArticles(client, ArticleStatus.ACCEPTED),
            await getMetadata(client)
        ]);

        return addApolloState(client, {
            props: {
                categories: categories.data.getCategories
            }
        });
    }
    catch (err) {
        console.log(JSON.stringify(err, null, 2));
        return addApolloState(client, {
            props: {
                categories: [],
                error: JSON.parse(JSON.stringify(err))
            }
        })
    }
};