import { makeStyles } from '@mui/styles';
//import { globalThemeMUI } from '@theme/main';

export const useAddressSearchInputStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    input: {
        width: '100%',
    },
    button: {
        marginLeft: theme.spacing(1),
    },

    searchField: {
        display: 'flex',
        alignItems: 'flex-end',
    },

    searchInput: {
        width: '100%',
    },

    searchMode: {
        marginLeft: theme.spacing(2),
    },
}));
