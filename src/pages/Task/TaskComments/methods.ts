import { IUserData } from '@helpers/authHelper';

export const prepareCommentData = (commentId: string, comment: string, taskId: string, user: IUserData | null) => {
    return {
        Id: commentId || null,
        TaskId: taskId,
        UserId: user?.UserId,
        Comment: comment,
    };
};

export const quillCommentConfig = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            // ['link', 'image', 'video'],
            ['clean'],
            [{ align: [] }],
        ],
    },
    clipboard: {
        matchVisual: false,
    },
};
