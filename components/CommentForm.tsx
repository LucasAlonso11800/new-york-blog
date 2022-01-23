import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
// GraphQL
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../ApolloClient/mutations';
import { GET_ARTICLE_COMMENTS, GET_COMMENT_REPLIES } from '../ApolloClient/querys';
// Form
import * as yup from 'yup';
import { useFormik } from 'formik';
// Const
import { EMAIL_REGEX } from '../const/EmailRegex';
import { URL_REGEX } from '../const/URLRegex';
// Styles
import classes from '../styles/components/CommentForm.module.css';

const validationSchema = yup.object({
    body: yup.string().max(65535, 'Maximum length 65535 characters').required("The comment can't be empty"),
    commenter: yup.string().max(40, 'Maximum length 40 characters').required('Please provide a name'),
    email: yup.string().max(100, 'Maximum length 100 characters').matches(EMAIL_REGEX, 'Provide a valid email').required('Please provide an email'),
    website: yup.string().max(100, 'Maximum length 100 characters').matches(URL_REGEX, 'Provide a valid url')
});

type Props = {
    articleId: string
    author: string | null
    isResponse: 'Y' | 'N'
    isResponseToCommentId: string | null
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>> | null
};

export default function CommentForm({ articleId, author, isResponse, isResponseToCommentId, setFormOpen }: Props) {
    const { setToastInfo } = useContext(GlobalContext);

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
            if (isResponse === 'N') {
                const data = proxy.readQuery({
                    query: GET_ARTICLE_COMMENTS,
                    variables: { articleId }
                }) as any;

                proxy.writeQuery({
                    query: GET_ARTICLE_COMMENTS,
                    variables: { articleId },
                    data: { getArticleComments: [result.data.addComment, ...data.getArticleComments] }
                })
            };
        },
        onError: (err) => setToastInfo({ open: true, message: err.message, type: 'error' })
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
        <section className={classes.container} data-testid="commentForm" id="commentForm">
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
                {formik.touched.body && formik.errors.body &&
                    <p className={classes.error}>{formik.errors.body}</p>
                }
                <label className={classes.label}>Name</label>
                <input
                    className={classes.input}
                    placeholder="Insert your Name"
                    type="text"
                    value={formik.values.commenter}
                    onChange={formik.handleChange}
                    name="commenter"
                />
                {formik.touched.commenter && formik.errors.commenter &&
                    <p className={classes.error}>{formik.errors.commenter}</p>
                }
                <label className={classes.label}>Email</label>
                <input
                    className={classes.input}
                    placeholder="Insert your Email"
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                />
                {formik.touched.email && formik.errors.email &&
                    <p className={classes.error}>{formik.errors.email}</p>
                }
                <label className={classes.label}>Website</label>
                <input
                    className={classes.input}
                    placeholder="You can add your website if you have one"
                    type="text"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    name="website"
                />
                {formik.touched.website && formik.errors.website &&
                    <p className={classes.error}>{formik.errors.website}</p>
                }
                <button type="submit" className={classes.button} disabled={loading}>Post comment</button>
            </form>
        </section>
    )
};