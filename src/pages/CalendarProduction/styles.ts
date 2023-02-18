import { makeStyles } from '@mui/styles';

export const useCalendarProductionStyles = makeStyles((theme) => ({
    root: {
        maxWidth: theme.spacing(150),
    },
    filter: {
        marginBottom: theme.spacing(5),
    },
    month: {
        margin: `0 auto ${theme.spacing(2)}`,
        maxWidth: theme.spacing(28),
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
        textAlign: 'center',
    },
    weekDayOff: {
        color: '#900',
    },
    days: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    day: {
        width: '14.28%',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(200,220,255,0.5)',
            opacity: 0.7,
        },
    },
    dayOff: {
        backgroundColor: 'rgba(255,150,150,0.2) !important',
    },
    dayShort: {
        backgroundColor: 'rgba(255,255,200,0.5) !important',
    },
    dayHoliday: {
        backgroundColor: 'rgba(255,0,0,0.4) !important',
    },
}));
