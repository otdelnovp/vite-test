import { makeStyles } from '@mui/styles';
import { primaryColor, greyTextColor } from '@theme/main';

export const useTaskStyles = makeStyles((theme) => ({
    task: {},

    header: {
        padding: theme.spacing(3, 4, 0),
    },

    tools: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toolsBox: {
        display: 'flex',
        alignItems: 'center',
    },
    info: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
    },
    infoLabel: {
        color: theme.palette.text.secondary,
    },
    infoValue: {
        color: theme.palette.text.primary,
        marginLeft: theme.spacing(1),
        whiteSpace: 'nowrap',
        maxWidth: theme.spacing(22),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    infoNote: {
        fontSize: '0.9em',
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(1),
    },

    content: {
        padding: theme.spacing(2, 4, 3),
        '& .ql-toolbar': {
            borderRadius: theme.spacing(2, 2, 0, 0),
        },
        '& .ql-container': {
            borderRadius: theme.spacing(0, 0, 2, 2),
        },
    },

    title: {
        padding: theme.spacing(2, 0, 0),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titleText: {
        display: 'block',
    },
    titleEditIcon: {
        marginLeft: theme.spacing(1),
        color: theme.palette.text.secondary,
        cursor: 'pointer',
    },
    titleInput: {
        marginBottom: theme.spacing(0),
    },

    description: {
        marginBottom: theme.spacing(4),
    },
    descriptionEditIcon: {
        position: 'relative',
        zIndex: 11,
        float: 'right',
        margin: theme.spacing(2, 4),
        color: theme.palette.text.secondary,
        cursor: 'pointer',
    },

    asideBox: {
        position: 'relative',
        display: 'block',
        minWidth: theme.spacing(38),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1, 0),
    },
    asideBoxFixed: {
        position: 'fixed',
        maxHeight: '85vh',
        overflowY: 'auto',
        marginRight: theme.spacing(3),
    },
    asideInfo: {
        padding: theme.spacing(1, 2),
    },
    asideInfoLabel: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(0.5),
    },
    asideInfoValue: {
        color: theme.palette.text.primary,
    },

    actions: {
        float: 'right',
        display: 'flex',
        alignItems: 'flex-end',
    },
    actionItem: {
        marginLeft: theme.spacing(2),
        color: greyTextColor,
        '&:hover': {
            color: primaryColor,
        },
    },
}));
