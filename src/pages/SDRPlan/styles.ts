import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';
import { greyTextColor, primaryColor, greyColor } from '@theme/main';

export const useSDRPlanPageStyles = makeStyles((theme) => ({
    header: {
        position: 'relative',
        zIndex: 11,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    tools: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    newButton: {
        marginRight: theme.spacing(2),
    },
    toggleMode: {
        marginLeft: theme.spacing(2),
    },
}));
