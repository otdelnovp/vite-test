import { makeStyles } from '@mui/styles';

export const useListStyles = makeStyles((theme) => ({
    wrapper: {
        margin: 0,
    },
    dictGroup: {
        margin: 0,
    },
    dicts: {
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
    },
    editButton: {
        float: 'right',
        marginTop: theme.spacing(5),
    },
    editForm: {},

    filters: {
        padding: theme.spacing(4, 4, 2),
    },
    filtersForm: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        '& > .MuiFormControl-root': {
            marginRight: theme.spacing(2),
        },
    },
    list: {},
    listAction: {
        cursor: 'pointer',
        color: theme.palette.primary.main,
        opacity: 0.8,
        '&:hover': {
            opacity: 1,
        },
    },
    footer: {
        padding: theme.spacing(0, 4, 3),
    },
    orgFilter: {
        padding: theme.spacing(0, 0, 2),
    },
    filter: {
        marginBottom: theme.spacing(5),
    },
}));

export const useElementStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 'auto 0',
    },
    pageTitle: {
        margin: 'auto 0',
    },
    buttonPanel: {
        display: 'flex',
        flexDirection: 'row'
    },
    editButton: {
        float: 'right',
        marginTop: theme.spacing(5),
    },
    editForm: {},
    formBox: {
        padding: theme.spacing(3),
    },
    filters: {
        padding: theme.spacing(4, 4, 2),
        // fontSize: '0.85em',
    },
    filtersForm: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        '& > .MuiFormControl-root': {
            marginRight: theme.spacing(2),
        },
    },
    list: {},
    listAction: {
        cursor: 'pointer',
        marginLeft: theme.spacing(2),
        color: theme.palette.primary.main,
        opacity: 0.8,
        '&:hover': {
            opacity: 1,
        },
    },

    footer: {
        padding: theme.spacing(0, 4, 3),
    },
    tabBox: {
        padding: theme.spacing(1, 0),
    },
    deptTree: {
        padding: theme.spacing(2),
    },
    treeBranch: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    deptTableRow: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    toolbar: {
        backgroundColor: theme.palette.background.default,
    },
    toolbarButton: {
        margin: theme.spacing(1),
    },
}));

