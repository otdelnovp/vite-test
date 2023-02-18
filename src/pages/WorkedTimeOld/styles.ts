import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    boxContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    boxColumns: {
        display: 'flex',
        flexDirection: 'row',
    },
    boxCalendarTime: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        margin: theme.spacing(4)
    },
}));

export const sx = {
    divider: {
        margin: '32px 0 32px 32px'
    },
    h6: {
        marginBottom: '12px',
        fontWeight: 'bold',
        fontSize: '1.2em',
        color: '#14467B'
    },
    th: {
        fontWeight: 'bold'
    },
    thRow: {
        height: '40px'
    },
    tRow: {
        height: '54px'
    }
}
