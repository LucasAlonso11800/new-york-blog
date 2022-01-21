import React, { useContext, useEffect, useState } from 'react';
import classes from '../../styles/components/Admin/ArticleListPage.module.css';
// Context
import { GlobalContext } from '../../context/GlobalContext';
// Components
import AdminLayout from '../../components/LayoutComponents/AdminLayout';
import Main from '../../components/LayoutComponents/Main';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
// Const
import { ARTICLE_LIST_LIMIT } from '../../const/Limits';
// Utils
import { fixFirebaseURL } from '../../utils/fixFirebaseURL';
import { formatDate } from '../../utils/formatDate';
// GraphQL
import { addApolloState, initializeApollo } from '../../ApolloClient/NewApolloConfig';
import { getAllArticles, getCategories, getMetadata } from '../../ApolloClient/querys';
// Types
import { ArticleType, CategoryType } from '../../types/Types';

type Props = {
    articles: ArticleType[]
    initialNumberOfPages: number
    categories: CategoryType[]
};

export default function ArticleList({ articles, initialNumberOfPages, categories }: Props) {
    const { user } = useContext(GlobalContext);
    if (user === null && typeof window !== 'undefined') window.location.assign('/');

    const [page, setPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState<number>(initialNumberOfPages);
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("all");
    const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>(articles);

    useEffect(() => {
        const newArticles = articles.filter(article => (
            article.title.toLowerCase().includes(title.toLowerCase()) &&
                article.authorName.toLowerCase().includes(author.toLowerCase()) &&
                category === "all" ? true : article.categoryName === category
        ));
        setFilteredArticles(newArticles);
        setNumberOfPages(Math.ceil(newArticles.length / ARTICLE_LIST_LIMIT));
    }, [page, numberOfPages, title, author, category]);

    const handlePageChange = (newPage: number) => {
        if (newPage > numberOfPages) return setPage(newPage);
        if (newPage < 0) return setPage(0);
        return setPage(newPage);
    };

    return (
        <AdminLayout title="Article list - ">
            <Main>
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
                        <th>Title</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Created on</th>
                        <th>Visits</th>
                        <th>Author</th>
                    </thead>
                    <tbody>
                        {filteredArticles.slice(page * ARTICLE_LIST_LIMIT, page * ARTICLE_LIST_LIMIT + ARTICLE_LIST_LIMIT).map(article => (
                            <tr key={article.id}>
                                <td><Link href={`/articles/${article.slug}`}>{article.title}</Link></td>
                                <td><Image src={fixFirebaseURL(article.image)} height="67" width="100" /></td>
                                <td>{article.categoryName}</td>
                                <td>{formatDate(article.createdAt)}</td>
                                <td>{article.visits}</td>
                                <td>{article.authorName}</td>
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

export async function getStaticProps() {
    const client = initializeApollo();
    try {
        const articles = await getAllArticles(client);
        const categories = await getCategories(client);
        await getMetadata(client);

        return addApolloState(client, {
            props: {
                articles: articles.data.getAllArticles,
                initialNumberOfPages: Math.ceil(articles.data.getAllArticles.length / ARTICLE_LIST_LIMIT),
                categories: categories.data.getCategories
            }
        });
    }
    catch (err) {
        return addApolloState(client, {
            props: {
                articles: [],
                pageNumber: 0,
                categories: []
            }
        })
    }
};