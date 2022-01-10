import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext';
// Styles
import classes from '../../styles/components/LoginAndRegisterPages.module.css';
// Components
import AdminLayout from '../../components/LayoutComponents/AdminLayout';
import Main from '../../components/LayoutComponents/Main';
import LoadingIcon from '../../components/LoadingIcon';
// GraphQL
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../ApolloClient/mutations';
import { getCategories, getMetadata } from '../../ApolloClient/querys';
import { addApolloState, initializeApollo } from '../../ApolloClient/NewApolloConfig';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function RegisterPage() {
    const { user, setUser } = useContext(GlobalContext);

    if (user !== null) return window.location.assign('/admin');

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        onCompleted: (data) => {
            if (typeof localStorage !== 'undefined') localStorage.setItem('token', data.loginUser.token);
            setUser(data.registerUser)
            window.location.assign('/admin');
        },
        onError: (error) => console.log(error)
    });

    const validationSchema = yup.object({
        username: yup.string().max(40, 'Maximum length 40 characters').required('Please provide an email'),
        email: yup.string().max(100, 'Maximum length 100 characters').required('Please provide an email'),
        password: yup.string().min(6, 'Password lenght must be at least 6 characters').max(20, 'Maximum length 20 characters').required('Please provide the password')
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
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <div className={classes.inputContainer}>
                        <label className={classes.label}>Email</label>
                        <input
                            name='username'
                            className={classes.input}
                            placeholder='Please enter your name'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                    </div>
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
            props: {}
        });
    }
};