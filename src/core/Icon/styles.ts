import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';

export const useIconStyles = makeStyles((theme) => ({
    icon: {
        position: 'relative',
        display: 'block',
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));
