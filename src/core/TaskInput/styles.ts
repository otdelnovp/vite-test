import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    textFieldRoot: {
        '& .MuiFilledInput-root': {
            paddingRight: '10px!important',
        },
        "& > div.MuiAutocomplete-inputRoot[class*='MuiFilledInput-root']": {
            // default paddingRight was 39px since clear icon was positioned absolute
            paddingRight: '9px',
            '& .taskFinderBtn': {
                padding: '2px',
                order: 3,
            },
            '& > div.MuiAutocomplete-endAdornment': {
                position: 'relative',
                order: 2,
                right: 0,
            },
        },
    },
});