import React from 'react';
// Components
import Comment from './Comment';
// Styles
import classes from '../styles/components/CommentSection.module.css';
// Types
import { CommentType } from '../types/Types';

type Props = {
    comments: CommentType[]
    articleId: string
};

export default function CommentSection({ comments, articleId }: Props) {
    return (
        <section className={classes.container} data-testid="commentSection" id="commentSection">
            <h3 className={classes.title}>Comments</h3>
            <ul className={classes.list}>
                {comments.map(comment => (
                    <Comment
                        key={comment.id}
                        articleId={articleId}
                        commentId={comment.id}
                        author={comment.author}
                        createdAt={comment.createdAt}
                        body={comment.body}
                    />
                ))}
            </ul>
        </section>
    )
};