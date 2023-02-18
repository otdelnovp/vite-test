import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';
import { greyColor } from '@theme/main';

export const useColorPickerStyles = makeStyles((theme) => ({
    container: {
        //height: '16px',
    },
    inputBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    colorButton: {
        // height: theme.spacing(2),
        // padding: theme.spacing(2),
    },
    picker: {
        overflow: 'hidden',
    },
}));
