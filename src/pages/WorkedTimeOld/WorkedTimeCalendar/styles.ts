import { makeStyles } from '@mui/styles';
import { blackColor } from '@theme/main';

const border = '1px solid #B9CBDA';

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: 0,
    },
    month: {
        margin: 0,
        borderRight: border,
        borderBottom: border,
    },
    monthName: {
        marginBottom: theme.spacing(1),
        fontSize: '1.5em',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    weekDays: {
        display: 'flex',
        flexWrap: 'wrap',
        fontWeight: 'bold',
    },
    weekDay: {
        width: '14.28%',
        height: '40px',
        textAlign: 'center',
        borderLeft: border,
        borderTop: border,
    },
    weekDayOff: {
        color: '#900',
    },
    days: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    dater: {
        margin: 0,
        marginRight: theme.spacing(.5)
    },
    hours: {
        fontSize: '1.4em',
        fontWeight: 'bold',
        color: theme.palette.primary.dark,
        textAlign: 'center',
        margin: 0,
    },
    day: {
        borderLeft: border,
        borderTop: border,
        width: '14.28%',
        height: '54px',
        textAlign: 'right',
        color: '#B9CBDA',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#eee',
            opacity: 0.7,
        },
    },
    dayOff: {
        backgroundColor: '#FDD !important',
    },
    dayShort: {
        backgroundColor: '#FFD !important',
    },
    dayHoliday: {
        backgroundColor: '#FAA !important',
    },
    daySelected: {
        backgroundColor: 'rgba(20, 70, 123, 0.08) !important',
    }
}));

