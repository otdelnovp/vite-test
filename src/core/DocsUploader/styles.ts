import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';

export const useDocsDictUploaderStyles = makeStyles((theme) => ({
    list: {
        position: 'relative',
    },
    doc: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: theme.spacing(0, 0, 1),
    },
    link: {
        position: 'relative',
        overflow: 'hidden',
        margin: theme.spacing(0, 0, 0, -1),
        padding: theme.spacing(0, 0, 0, 1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
        color: 'inherit',
        opacity: 0.5,
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
        '& input': {
            position: 'absolute',
            top: 0,
            left: 0,
            fontSize: '50px',
            opacity: 0,
            cursor: 'pointer',
        },
        '&$onlyView, &$onlyView:hover': {
            textDecoration: 'none',
            pointerEvents: 'none',
            cursor: 'default',
        },
    },
    uploaded: {
        opacity: 1,
    },
    onlyView: {},
    icon: {
        '& .MuiSvgIcon-root': {
            display: 'block',
        },
    },
    delete: {
        opacity: 0.5,
        cursor: 'pointer',
        transition: 'opacity 300ms',
        '&:hover': {
            opacity: 1,
        },
        '& .MuiSvgIcon-root': {
            display: 'block',
        },
    },
    label: {
        overflow: 'hidden',
        boxSizing: 'border-box',
        margin: theme.spacing(0, 2, 0, 1),
    },

    upload: {
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',
        margin: theme.spacing(1, 0, 0),
        '& input': {
            position: 'absolute',
            top: 0,
            left: 0,
            fontSize: '50px',
            opacity: 0,
            cursor: 'pointer',
        },
    },
}));

export const useDocViewStyles = makeStyles((theme) => ({
    view: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vw',
        background: 'rgba(0,0,0,0.5)',
        boxShadow: '0 0 10px #000',
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        //color: '#506073',
        background: '#F7F9FA',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: theme.spacing(0, 2),
    },
    title: {
        fontSize: '1.2em',
        '& i': {
            display: 'inline-block',
            margin: '0 0 0 1em',
            fontSize: '0.75em',
            fontStyle: 'normal',
            whiteSpace: 'nowrap',
            opacity: '0.5',
        },
    },
    tools: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& .MuiSvgIcon-root': {
            display: 'block',
            marginLeft: theme.spacing(2),
            opacity: 0.5,
            cursor: 'pointer',
            transition: 'opacity 300ms',
            '&:hover': {
                opacity: 1,
            },
        },
    },
    content: {
        position: 'absolute',
        top: '60px',
        left: 0,
        right: 0,
        bottom: 0,
        maxHeight: '100%',
        margin: 0,
        padding: theme.spacing(2),
        '& img': {
            display: 'block',
            margin: '0 auto',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
        },
        '& iframe': {
            position: 'relative',
            width: '100%',
            height: '100%',
            border: 0,
            background: '#fff',
        },
    },
}));
