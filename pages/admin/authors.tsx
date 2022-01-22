import React, { useContext, useEffect, useState } from 'react';
import classes from '../../styles/components/Admin/ListPages.module.css';
// Context
import { GlobalContext } from '../../context/GlobalContext';
// Components
import AdminLayout from '../../components/LayoutComponents/AdminLayout';
import Main from '../../components/LayoutComponents/Main';
import LoadingIcon from '../../components/LoadingIcon';
import { Icon } from '@iconify/react';
// Const
import { ARTICLE_LIST_LIMIT } from '../../const/Limits';
// GraphQL
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from '../../ApolloClient/NewApolloConfig';
import { getMetadata, getCategories, getUsers, GET_USERS } from '../../ApolloClient/querys';
import { CHANGE_USER_ROLE } from '../../ApolloClient/mutations';
// Types
import { UserRoles, UserType } from '../../types/Types';

type Props = {
    error: ApolloError
}

export default function Authors({ error }: Props) {
    const { user } = useContext(GlobalContext);
    if (user === null && typeof window !== 'undefined') window.location.assign('/');

    const { data: usersQuery } = useQuery(GET_USERS);
    const users: UserType[] = usersQuery?.getUsers || [];

    const [page, setPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState<number>(Math.ceil(users.length / ARTICLE_LIST_LIMIT));
    const [author, setAuthor] = useState<string>("");
    const [role, setRole] = useState<UserRoles | 'all'>("all");
    const [filteredAuthors, setFilteredAuthors] = useState<UserType[]>(users);
    const [popupInfo, setPopupInfo] = useState<{ text: string, authorId: string }>({ text: "", authorId: "" });
    const [loading, setLoading] = useState<boolean>();
    const [action, setAction] = useState<'Admin' | 'Writer' | 'Blocked'>();

    useEffect(() => {
        const newAuthors = users.filter(user => (
            user.username.toLowerCase().includes(author.toLowerCase()) &&
                role === 'all' ? true : user.roleName === role
        ));
        setFilteredAuthors(newAuthors);
        setNumberOfPages(Math.ceil(newAuthors.length / ARTICLE_LIST_LIMIT));
    }, [page, numberOfPages, author, role, loading]);

    const handlePageChange = (newPage: number) => {
        if (newPage > numberOfPages) return setPage(newPage);
        if (newPage < 0) return setPage(0);
        return setPage(newPage);
    };

    const [changeUserRole] = useMutation(CHANGE_USER_ROLE, {
        update(proxy) {
            const data = proxy.readQuery({ query: GET_USERS }) as any;
            const newUser: UserType = { ...data.getUsers.find((user: UserType) => user.id === popupInfo.authorId), roleName: action }
            proxy.writeQuery({
                query: GET_USERS,
                data: { getUsers: [newUser, ...data.getUsers.filter((user: UserType) => user.id !== popupInfo.authorId)] }
            })
            setPopupInfo({ text: "", authorId: "" });
        },
        onError: (err) => console.log(JSON.stringify(err, null, 2))
    });

    return (
        <AdminLayout title="Authors list - ">
            <Main>
                <h1 className={classes.title}>Authors list</h1>
                <div className={classes.filters}>
                    <input className={classes.input} placeholder='Filter by author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                    <select className={classes.input} onChange={(e) => setRole(e.target.value as UserRoles)}>
                        <option value="all">All</option>
                        {Object.keys(UserRoles).map((role) => (
                            <option key={role} value={role[0] + role.slice(1).toLowerCase()}>{role[0] + role.slice(1).toLowerCase()}</option>
                        ))}
                    </select>
                </div>

                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Author</th>
                            <th>Articles written</th>
                            <th>Visits</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAuthors.slice(page * ARTICLE_LIST_LIMIT, page * ARTICLE_LIST_LIMIT + ARTICLE_LIST_LIMIT).map(author => (
                            popupInfo.authorId === author.id ?
                                <tr key={author.id}
                                    className={action === 'Admin' || action === 'Writer' ? classes.approve : classes.delete}
                                >
                                    <td colSpan={3}>{popupInfo.text}</td>
                                    {loading ?
                                        <td colSpan={2}>
                                            <LoadingIcon />
                                        </td>
                                        :
                                        user?.roleName === UserRoles.ADMIN ?
                                            <>
                                                <td>
                                                    <Icon
                                                        icon="ic:sharp-cancel"
                                                        fontSize={32}
                                                        onClick={() => setPopupInfo({ text: "", authorId: "" })}
                                                    />
                                                    <p>Cancel</p>
                                                </td>
                                                <td>
                                                    <Icon
                                                        icon={action === 'Admin' || action === 'Writer' ? "teenyicons:tick-circle-solid" : "fluent:presence-blocked-10-regular"}
                                                        fontSize={32}
                                                        onClick={async () => {
                                                            setLoading(true);
                                                            await changeUserRole({
                                                                variables: {
                                                                    userRole: user.roleName,
                                                                    authorId: author.id,
                                                                    authorRoleName: action
                                                                }
                                                            });
                                                            setLoading(false);
                                                        }}
                                                    />
                                                    <p>Confirm</p>
                                                </td>
                                            </>
                                            : null
                                    }
                                </tr>
                                :
                                <tr key={author.id}>
                                    <td>{author.username}</td>
                                    <td>{author.articles}</td>
                                    <td>{author.visits ? author.visits : 0}</td>
                                    <td>{author.roleName}</td>
                                    <td>
                                        {user?.roleName === UserRoles.ADMIN ?
                                            <>
                                                {author.roleName === UserRoles.WRITER &&
                                                    <Icon icon="eos-icons:admin"
                                                        fontSize={32}
                                                        onClick={() => {
                                                            setAction("Admin")
                                                            setPopupInfo({ text: `Are you sure you want to make ${author.username} an admin?`, authorId: author.id })
                                                        }}
                                                    />
                                                }
                                                {author.roleName === UserRoles.BLOCKED &&
                                                    <Icon
                                                        icon="jam:pencil-f"
                                                        fontSize={32}
                                                        onClick={() => {
                                                            setAction("Writer")
                                                            setPopupInfo({ text: `Are you sure you want to make ${author.username} a writer?. This user will be able to write and edit articles but not approve them`, authorId: author.id })
                                                        }}
                                                    />
                                                }
                                                {author.roleName === UserRoles.WRITER &&
                                                    <Icon
                                                        icon="fluent:presence-blocked-10-regular"
                                                        fontSize={32}
                                                        onClick={() => {
                                                            setAction('Blocked');
                                                            setPopupInfo({ text: `Are you sure you want to block ${author.username}?. This user won't be able to write or edit any more articles`, authorId: author.id })
                                                        }}
                                                    />
                                                }
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

export async function getStaticProps() {
    const client = initializeApollo();
    try {
        await Promise.all([
            await getUsers(client),
            await getCategories(client),
            await getMetadata(client)
        ]);

        return addApolloState(client, {
            props: {},
            revalidate: 60 * 60
        });
    }
    catch (err) {
        return addApolloState(client, {
            props: {
                error: JSON.parse(JSON.stringify(err))
            }
        })
    }
};