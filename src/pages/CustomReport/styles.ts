export const sx = {
    paper: {
        position: 'absolute',
        top: '284px',
        bottom: '32px',
        left: '32px',
        right: '32px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'row',
        '& textarea': {
            height: 'unset !important',
        },
    },
    reportPaper: {
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
    },
    column: {
        height: '95%',
    },
    columnTitle: {
        fontSize: '1em',
        fontWeight: 'bold',
        color: '#666',
        paddingTop: '6px',
        paddingLeft: '8px',
        paddingBottom: '6px',
    },
    table: {
        '& th': {
            fontSize: '1em',
            fontWeight: 'bold',
            color: '#666',
        },
        '& .MuiTableCell-root ': {
            padding: '8px',
        },
        borderBottom: 0,
    },
    tablesAndFields: {
        margin: '8px',
        borderBottom: 0,
        '& .MuiTableRow-root ': {
            borderTop: 0,
        },
        '& .MuiTableCell-root ': {
            padding: 0,
        },
    },
    checkColumn: {
        width: '32px',
    },
    noCheckBoxRow: {
        height: '38px',
    },
    addBtn: {
        marginLeft: '8px',
        marginTop: '8px',
    },
    playBtn: {
        marginTop: '8px',
        marginBottom: '8px',
    },
    tableBox: {
        // paddingTop: '16px',
    },
};
