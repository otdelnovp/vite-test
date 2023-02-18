import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: `${theme.spacing(4)} 0 ${theme.spacing(4)} 0`
    },
    table: {
        // maxWidth: '400px',
    },
}));

