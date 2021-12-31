import React from 'react';
// GraphQL
import { LazyQueryResult, OperationVariables, QueryLazyOptions, useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../ApolloClient/mutations';
import { GET_COMMENT_REPLIES } from '../ApolloClient/querys';
// Form
import * as yup from 'yup';
import { useFormik } from 'formik';
// Const
import { EmailRegex } from '../const/EmailRegex';
// Styles
import classes from '../styles/components/CommentForm.module.css';

const validationSchema = yup.object({
    body: yup.string().max(65535, 'Maximum length 65535 characters').required("The comment can't be empty"),
    commenter: yup.string().max(40, 'Maximum length 40 characters').required('You have to leave a username'),
    email: yup.string().max(100, 'Maximum length 100 characters').matches(EmailRegex, 'Provide a valid email').required('Please leave an email'),
    website: yup.string().max(100, 'Maximum length 100 characters')
});

type Props = {
    articleId: string
    author: string | null
    isResponse: 'Y' | 'N'
    isResponseToCommentId: string | null
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>> | null
    getComments: ((options?: QueryLazyOptions<OperationVariables> | undefined) => Promise<LazyQueryResult<any, OperationVariables>>) | null
};

export default function CommentForm({ articleId, author, isResponse, isResponseToCommentId, setFormOpen, getComments }: Props) {

    const [addComment, { loading }] = useMutation(ADD_COMMENT, {
        update(proxy, result) {
            formik.resetForm();
            if (isResponse === 'Y' && setFormOpen) {
                setFormOpen(false);
                const data = proxy.readQuery({
                    query: GET_COMMENT_REPLIES,
                    variables: { commentId: isResponseToCommentId }
                }) as any;

                proxy.writeQuery({
                    query: GET_COMMENT_REPLIES,
                    variables: { commentId: isResponseToCommentId },
                    data: { getCommentReplies: [result.data.addComment, ...data.getCommentReplies] }
                });
            }
            if (isResponse === 'N' && getComments) {
                getComments({ variables: { articleId } });
            };
        },
        onError: (error) => console.log(JSON.stringify(error))
    });

    const formik = useFormik({
        initialValues: {
            body: '',
            commenter: '',
            email: '',
            website: '',
            articleId,
            isResponse,
            isResponseToCommentId
        },
        validationSchema,
        onSubmit: (values) => {
            addComment({ variables: values });
        }
    });

    return (
        <section className={classes.container}>
            <h3 className={classes.title}>{author ? `Reply to ${author}` : 'Leave a comment'}</h3>
            <p className={classes.subtitle}>Your email address will not be published.</p>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <label className={classes.label}>Comment</label>
                <textarea
                    className={classes.input}
                    placeholder="Leave your Comment"
                    cols={45}
                    rows={8}
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    name="body"
                />
                <label className={classes.label}>Name</label>
                <input
                    className={classes.input}
                    placeholder="Insert your Name"
                    type="text"
                    value={formik.values.commenter}
                    onChange={formik.handleChange}
                    name="commenter"
                />
                <label className={classes.label}>Email</label>
                <input
                    className={classes.input}
                    placeholder="Insert your Email"
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                />
                <label className={classes.label}>Website</label>
                <input
                    className={classes.input}
                    placeholder="You can add your website if you have one"
                    type="text"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    name="website"
                />
                <button type="submit" className={classes.button} disabled={loading}>Post comment</button>
            </form>
        </section>
    )
};