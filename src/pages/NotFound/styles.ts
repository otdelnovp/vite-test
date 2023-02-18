import { makeStyles } from '@mui/styles';
//import { globalThemeMUI } from '@theme/main';

export const useNotFoundStyles = makeStyles({
    notFound: {
        margin: '1em 0',
        fontSize: '10em',
        '& img': {
            display: 'block',
            margin: '0 auto',
            maxWidth: '100%',
        },
    },
});
