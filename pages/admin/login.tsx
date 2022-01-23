import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalContext';
// Styles
import classes from '../../styles/components/Admin/LoginAndRegisterPages.module.css';
// Components
import AdminLayout from '../../components/LayoutComponents/AdminLayout';
import Main from '../../components/LayoutComponents/Main';
import LoadingIcon from '../../components/LoadingIcon';
// Const
import { EMAIL_REGEX } from '../../const/EmailRegex';
// GraphQL
import { ApolloError, useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../ApolloClient/mutations';
import { getCategories, getMetadata } from '../../ApolloClient/querys';
import { addApolloState, initializeApollo } from '../../ApolloClient/NewApolloConfig';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';

type Props = {
    error: ApolloError
};

export default function LoginPage({ error }: Props) {
    const { user, setUser, setToastInfo } = useContext(GlobalContext);

    if (user !== null) return window.location.assign('/admin');

    useEffect(() => {
        if (error) setToastInfo({ open: true, message: error.message, type: 'error' });
    }, []);

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        onCompleted: (data) => {
            if (typeof localStorage !== 'undefined') localStorage.setItem('token', data.loginUser.token);
            setUser(data.loginUser);
            window.location.assign('/admin?justLoggedIn=true');
        },
        onError: (err) => setToastInfo({ open: true, message: err.message, type: 'error' })
    });

    const validationSchema = yup.object({
        email: yup.string().matches(EMAIL_REGEX, 'Please provide a valid email').max(100, 'Maximum length 100 characters').required('Please provide an email'),
        password: yup.string().max(20, 'Maximum length 20 characters').required('Please provide the password')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values) => loginUser({ variables: { ...values } })
    });

    return (
        <AdminLayout title="Login - ">
            <Main>
                <h1 className={classes.title}>Please login to enter the admin section</h1>
                <form className={classes.form} onSubmit={formik.handleSubmit} data-testid="loginForm">
                    <div className={classes.inputContainer}>
                        <label className={classes.label}>Email</label>
                        <input
                            name='email'
                            className={classes.input}
                            placeholder='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.touched.email && formik.errors.email &&
                        <p className={classes.error}>{formik.errors.email}</p>
                    }
                    <div className={classes.inputContainer}>
                        <label className={classes.label}>Password</label>
                        <input
                            name='password'
                            className={classes.input}
                            placeholder='Password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type='password'
                        />
                    </div>
                    {formik.touched.password && formik.errors.password &&
                        <p className={classes.error}>{formik.errors.password}</p>
                    }
                    <button type="submit" className={classes.submitButton} disabled={loading}>Login</button>
                </form>
                {loading ? <LoadingIcon /> : <></>}
            </Main>
        </AdminLayout>
    )
};

export async function getStaticProps() {
    const client = initializeApollo();
    try {
        await Promise.all([
            await getCategories(client),
            await getMetadata(client)
        ]);

        return addApolloState(client, {
            props: {},
            revalidate: 60 * 60 * 24
        })
    }
    catch (err) {
        console.log(JSON.stringify(err, null, 2));;
        return addApolloState(client, {
            props: {
                error: JSON.parse(JSON.stringify(err))
            }
        });
    }
};