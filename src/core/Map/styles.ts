import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';

export const useEstatesStyles = makeStyles((theme) => ({
    map: {
        position: 'relative',
        width: '100%',
        height: '65vh',
        overflow: 'hidden',
    },
    mapPoint: {
        display: 'flex',
        alignItems: 'center',
    },
    mapPointTitle: {
        fontSize: '1.2em',
        marginRight: theme.spacing(1),
    },
    mapPointAction: {
        marginLeft: theme.spacing(1),
        color: theme.palette.primary.main,
        cursor: 'pointer',
    },

    mapEdit: {
        position: 'relative',
        width: '100%',
        height: '55vh',
        overflow: 'hidden',
        margin: theme.spacing(3, 0, 1),
    },

    actions: {
        textAlign: 'center',
        margin: theme.spacing(0, 0, 3),
        display: 'flex',
        justifyContent: 'space-between',
    },

    matrix: {
        tableLayout: 'fixed',
        borderTop: '1px solid rgba(224, 224, 224, 1)',
        borderLeft: '1px solid rgba(224, 224, 224, 1)',
        marginBottom: 30,
        '& th, & td': {
            textAlign: 'center',
            borderRight: '1px solid rgba(224, 224, 224, 1)',
        },
        '& th': {
            fontWeight: 'bold',
            background: 'rgba(0,0,0,0.05)',
            fontSize: '0.7em',
            lineHeight: '1.1',
        },
    },

    list: {
        margin: '20px auto 0',
        maxWidth: theme.breakpoints.values.md,
        '& a': {
            color: theme.palette.primary.main,
        },
    },
    listAction: {
        cursor: 'pointer',
        marginLeft: theme.spacing(2),
        color: theme.palette.primary.main,
        opacity: 0.8,
        '&:hover': {
            opacity: 1,
        },
    },
    store: {
        zIndex: 1400,
    },
}));
