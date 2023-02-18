import { globalThemeMUI } from '@theme/main';

export const sx = {
    baseChartBlock: {
        boxSizing: 'border-box',
        margin: '0 0 20px',
        padding: '15px 20px',
        width: '100%',
        color: '#506073',
        background: '#F7FAFC',
        border: '1px solid #e3e3e3',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        transition: 'opacity 300ms, background 300ms, color 300ms, box-shadow 300ms, transform 300ms',
    },
    homePageInfo: {
        boxSizing: 'border-box',
        margin: '-1em',
        padding: '10px 0',
        height: 'calc(100% + 2em)',
        overflow: 'auto',
    },
    dashboardButtonBlock: {
        margin: '-10px 0 10px 10px',
        '.dashboard-btn': {
            margin: '0 10px 0 0',
            padding: '8px 16px',
        },
    },
    widgetMainBlock: {
        position: 'relative',
        margin: 0,
        height: '100%',
        width: '100%',
        transition: 'all 70ms linear, box-shadow 300ms !important',
        '&:hover': {
            boxShadow: '0 0 30px rgba(0,0,0,0.2)',
        },
        '& .widget-inner-block': {
            position: 'relative',
            height: '100%',
        },
        '& .widget-title': {
            margin: '0 25px 15px 0',
            fontSize: '1.2em',
            fontWeight: 'bold',
        },
        '& .widget-small-panel': {
            '& .widget-title': {
                display: 'none',
            },
        },
        '& .widget-panel': {
            margin: '0 auto',
            width: '100%',
            height: '77px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& .widget-icon': {
                textAlign: 'center',
                margin: 0,
                cursor: 'pointer',
            },
            '& .widget-content': {
                margin: '0 0 0 10px',
                width: '100%',
                fontSize: '0.95em',
            },
            '& .widget-value': {
                fontSize: '2.2em',
            },
        },
        '& .hidden': {
            height: 'auto !important',
            '& .widget-title': {
                display: 'block !important',
                margin: '0 25px 0 0',
            },
            '& .widget-content': {
                display: 'none !important',
            },
        },
    },
    clock: {
        color: '#fff',
        // background: '#00695c',
        background: globalThemeMUI.palette.primary.main,
        border: '1px solid #e3e3e3',
    },
    hidden: {
        height: 'auto !important',
    },
    toolbar: {
        position: 'absolute',
        zIndex: 11,
        top: '4px',
        right: 0,
    },
    toolbarItem: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
    menu: {
        position: 'relative',
        '& .widget-menu-btn': {
            margin: '4px',
            color: '#bbb',
            cursor: 'pointer',
            '& .icon': {
                margin: 0,
            },
        },
        '& .widget-menu-list': {
            position: 'absolute',
            top: '4px',
            right: '4px',
            padding: 0,
            whiteSpace: 'nowrap',
            textAlign: 'right',
            background: '#fff',
            borderRadius: '3px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 300ms, visibility 300ms, transform 300ms',
            '& .widget-menu-list-item': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '5px 10px 6px',
                cursor: 'pointer',
                color: 'inherit',
                transition: 'background 300ms',
                '&:hover': {
                    background: 'rgba(0,0,0,.05)',
                    textDecoration: 'none',
                    color: 'inherit',
                },
                '& .MuiSvgIcon-root': {
                    margin: '0 0 0 5px !important',
                },
            },
        },
        '&:hover': {
            '& .widget-menu-list': {
                opacity: 1,
                visibility: 'visible',
            },
        },
    },
    menuBtn: {
        padding: '10px',
        cursor: 'pointer',
    },
    menuBtnIcon: {
        margin: 0,
    },
};
