import React, { useContext } from 'react'
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
import { REGISTER_USER } from '../../ApolloClient/mutations';
import { getCategories, getMetadata } from '../../ApolloClient/querys';
import { addApolloState, initializeApollo } from '../../ApolloClient/NewApolloConfig';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';

type Props = {
    error: ApolloError
};

export default function RegisterPage() {
    const { user, setUser } = useContext(GlobalContext);

    if (user !== null) return window.location.assign('/admin');

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        onCompleted: (data) => {
            if (typeof localStorage !== 'undefined') localStorage.setItem('token', data.registerUser.token);
            setUser(data.registerUser)
            window.location.assign('/admin');
        },
        onError: (error) => console.log(error)
    });

    const validationSchema = yup.object({
        username: yup.string().max(40, 'Maximum length 40 characters').required('Please provide an username'),
        email: yup.string().matches(EMAIL_REGEX, 'Please provide a valid email').max(100, 'Maximum length 100 characters').required('Please provide an email'),
        password: yup.string().min(6, 'Password length must be at least 6 characters').max(20, 'Maximum length 20 characters').required('Please provide a password')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values) => registerUser({ variables: { ...values } })
    });

    return (
        <AdminLayout title="Register - ">
            <Main>
                <h1 className={classes.title}>Please create an account to enter the admin section</h1>
                <form className={classes.form} onSubmit={formik.handleSubmit} data-testid="registerForm">
                    <div className={classes.inputContainer}>
                        <label className={classes.label}>Username</label>
                        <input
                            name='username'
                            className={classes.input}
                            placeholder='Please enter your name'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.touched.username && formik.errors.username &&
                        <p className={classes.error}>{formik.errors.username}</p>
                    }
                    <div className={classes.inputContainer}>
                        <label className={classes.label}>Email</label>
                        <input
                            name='email'
                            className={classes.input}
                            placeholder='Please enter your email'
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
                            placeholder='Please enter your password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type='password'
                        />
                    </div>
                    {formik.touched.password && formik.errors.password &&
                        <p className={classes.error}>{formik.errors.password}</p>
                    }
                    <button type="submit" className={classes.submitButton} disabled={loading}>Register</button>
                </form>
                {loading ? <LoadingIcon /> : <></>}
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
            props: {
                error: JSON.parse(JSON.stringify(err))
            }
        });
    }
};