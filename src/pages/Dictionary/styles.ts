import { makeStyles } from '@mui/styles';

export const useDictionaryStyles = makeStyles((theme) => ({
    wrapper: {
        margin: 0,
    },
    dictGroup: {
        margin: 0,
    },
    dictList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: theme.spacing(2),
    },
    dict: {
        padding: theme.spacing(1),
        width: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        '& svg': {
            marginBottom: theme.spacing(1),
            fontSize: theme.spacing(8),
        },
        '& span': {
            lineHeight: '1.3',
        },
    },
    dictDisabled: {
        pointerEvents: 'none',
        '& svg': {
            color: '#ccc',
        },
        '& p': {
            color: '#ccc',
        },
    },
    filter: {
        marginBottom: theme.spacing(5),
    },

}));

