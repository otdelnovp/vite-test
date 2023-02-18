import { makeStyles } from '@mui/styles';

export const useCommentStyles = makeStyles((theme) => ({
    comments: {
        margin: theme.spacing(2, 0, 4),
    },
    commentList: {
        margin: theme.spacing(0, 0, 3),
    },
    commentItem: {
        position: 'relative',
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(4),
    },
    commentItemQuote: {
        position: 'absolute',
        top: 0,
        left: 0,
        fontSize: 55,
        lineHeight: 0.9,
        fontFamily: 'Arial, Helvetica, sans-serif',
        opacity: 0.3,
    },

    commentItemTime: {
        position: 'absolute',
        top: 0,
        left: 0,
        fontSize: 18,
        lineHeight: 1.1,
        opacity: 0.7,
    },

    commentInfo: {
        marginBottom: theme.spacing(1),
    },
    commentDate: {
        fontSize: '0.85em',
        color: theme.palette.text.secondary,
    },
    commentUserName: {
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    commentEditIcon: {
        marginLeft: theme.spacing(1),
        color: theme.palette.text.secondary,
        cursor: 'pointer',
    },

    commentContent: {},

    commentForm: {
        marginTop: theme.spacing(3),
        paddingLeft: theme.spacing(4),
    },
    commentInput: {
        marginBottom: theme.spacing(2),
        '& .ql-toolbar': {
            borderRadius: theme.spacing(2, 2, 0, 0),
        },
        '& .ql-container': {
            borderRadius: theme.spacing(0, 0, 2, 2),
        },
    },
}));
