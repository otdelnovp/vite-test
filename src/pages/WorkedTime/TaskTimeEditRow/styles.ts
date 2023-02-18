export const sx = {
    tRowReadOnly: {
        height: '54px',
    },
    tRow: {
        height: '57px',
        padding: "6px",
        '&:last-child': {
            borderBottom: 'none'
        }
    },
    tCellEdit: {
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingLeft: 'auto',
        textAlign: 'right'
    },
    timeCell: {
        textAlign: 'center',
        padding: "4px"
    },
    timeTextField: {
        margin: '0 auto',
        width: "80px",
        input: {
            fontSize: '0.875rem',
            padding: '12px !important',
            paddingBottom: '10px !important',
            textAlign: 'center',
        }
    },
    commentCell: {
        padding: "4px 19px"
    },
    commentTextField: {
        input: {
            fontSize: '0.875rem',
            padding: '12px !important',
            paddingLeft: '13px !important',
            paddingBottom: '10px !important',
        }
    },
}