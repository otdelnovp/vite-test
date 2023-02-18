export const sx = {
    cell: {
        display: 'flex',
        flexDireaction: "row-reverse",
        textAlign: 'right'
    },
    container: {
        margin: '0 0 0 auto',
        display: 'flex',
        flexDirection: 'row'
    },
    pageNumber: {
        input: {
            '&[type=number]': {
                '-moz-appearance': 'textfield',
            },
            '&::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
            },
            '&::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
            },
            padding: '12px',
            width: '32px',
            textAlign: 'center',
            height: '19px'
        }
    },
    text: {
        margin: 'auto 16px',
        fontSize: '0.9rem'
    }

}