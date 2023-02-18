import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';
import { primaryColor, greyTextColor } from '@theme/main';

export const useStateStyles = makeStyles((theme) => ({
    state: {
        display: 'inline-block',
        verticalAlign: 'middle',
        padding: theme.spacing(0.5, 1.2),
        // color: greyTextColor,
        background: '#fff',
        boxShadow: `inset 0 0 0 1px ${theme.palette.text.disabled}`,
        borderRadius: theme.spacing(1),
    },
    nw: {
        color: theme.palette.primary.main,
        boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
    },
}));
