import React, { useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../index';
import { compose } from 'redux';
import ReactQuill from 'react-quill';
import sanitizeHtml from 'sanitize-html';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

import { getDateTimeStr } from '@helpers/dateHelper';
import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { taskSelector, getTaskCommentList, editTaskComment } from '@services/taskService';

import { prepareCommentData, quillCommentConfig } from './methods';

import { useCommentStyles } from './styles';

const TaskComments = ({ user, commentList, task }: TaskCommentsReduxProps) => {
    const classes = useCommentStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [editCommentId, setEditCommentId] = useState('');
    const [commentInput, setCommentInput] = useState('');

    const onEditComment = () => {
        if (task && task.Id)
            dispatch(
                editTaskComment(prepareCommentData(editCommentId, commentInput, task.Id, user), {
                    onSuccess: () => {
                        if (task && task.Id) dispatch(getTaskCommentList(task.Id));
                        setEditCommentId('');
                        setCommentInput('');
                    },
                }),
            );
    };

    const commentForm = (
        <Box className={classes.commentForm} style={!commentList?.length || editCommentId ? { paddingLeft: 0 } : undefined}>
            <ReactQuill
                className={classes.commentInput}
                modules={quillCommentConfig}
                theme="snow"
                value={commentInput}
                onChange={(newValue: string) => {
                    setCommentInput(newValue);
                }}
            />
            <Button variant="contained" size="small" onClick={() => onEditComment()} disabled={!commentInput}>
                {!editCommentId ? 'Добавить комментарий' : 'Сохранить изменение'}
            </Button>{' '}
            {!!editCommentId ? (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        setEditCommentId('');
                        setCommentInput('');
                    }}
                >
                    Отменить
                </Button>
            ) : null}
        </Box>
    );

    return (
        <Box className={classes.comments}>
            {commentList && commentList.length ? (
                <Box className={classes.commentList}>
                    {commentList.map((comment) => (
                        <Box className={classes.commentItem} key={comment.Id}>
                            <Box className={classes.commentItemQuote}>“</Box>
                            <Box className={classes.commentInfo}>
                                <Box className={classes.commentDate}>
                                    {getDateTimeStr(comment.CreateDate)}
                                    {comment.CreateDate !== comment.ModifyDate && comment.ModifyDate ? (
                                        <i> (изменено: {getDateTimeStr(comment.ModifyDate)})</i>
                                    ) : null}
                                </Box>
                                <Box className={classes.commentUserName}>
                                    {comment.UserFullName}
                                    {comment.UserId === user?.UserId ? (
                                        <>
                                            <EditIcon
                                                className={classes.commentEditIcon}
                                                fontSize="small"
                                                onClick={() => {
                                                    setEditCommentId(comment.Id || '');
                                                    setCommentInput(comment.Comment || '');
                                                }}
                                            />
                                            {editCommentId === comment.Id ? (
                                                <ClearIcon
                                                    className={classes.commentEditIcon}
                                                    fontSize="small"
                                                    onClick={() => {
                                                        setEditCommentId('');
                                                        setCommentInput('');
                                                    }}
                                                />
                                            ) : null}
                                        </>
                                    ) : null}
                                </Box>
                            </Box>
                            {editCommentId === comment.Id ? (
                                commentForm
                            ) : (
                                <Box className={classes.commentContent} dangerouslySetInnerHTML={{ __html: sanitizeHtml(comment.Comment || '') }} />
                            )}
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box className={classes.commentList}>По данной заявке еще нет комментариев</Box>
            )}
            {!editCommentId ? commentForm : null}
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { commentList, task } = taskSelector(state);
    return { user, commentList, task };
};

const connector = connect(mapStateToProps);
type TaskCommentsReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(TaskComments);
