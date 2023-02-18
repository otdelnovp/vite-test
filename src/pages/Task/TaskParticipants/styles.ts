import { makeStyles } from '@mui/styles';

export const useTaskParticipantStyles = makeStyles((theme) => ({
    participant: {
        position: 'relative',
        marginLeft: theme.spacing(3),
    },
    participantList: {
        position: 'relative',
        margin: theme.spacing(1, 0, 0),
        padding: 0,
        minWidth: theme.spacing(40),
    },
    participantItem: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: theme.spacing(0, 0, 0.5),
    },
    participantName: {},
    participantDelete: {
        fontSize: '1.1em !important',
        marginRight: theme.spacing(0.5),
        cursor: 'pointer',
        color: theme.palette.error.main,
        transition: 'opacity 300ms',
        '&:hover': {
            opacity: 0.7,
        },
    },
    participantAdd: {
        margin: theme.spacing(1.5, 0, 0),
    },
}));
