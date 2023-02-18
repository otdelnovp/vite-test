import { styled, experimental_sx as sx } from '@mui/system';

export const styles = {
    stateName: {
        fontWeight: 'normal',
        margin: '8px 0 4px 8px',
        fontSize: '0.9em',
    },
    userName: {
        fontWeight: 'bold',
        margin: '8px 0 4px 8px',
        fontSize: '0.9em',
    },
};

const commonBorderStyle = {
    borderCollapse: 'separate',
    borderSpacing: 0,
    borderLeft: '1px solid #eee',
    borderRight: '1px solid #eee',
};

//kanban-table-header
export const KanbanTableHeader = styled('table')(
    sx({
        tableLayout: 'fixed',
        width: '100%',
        position: 'sticky',
        top: '64px',
        // background: '#f5f5f5',
        background: 'rgba(200, 200, 200, 0.05)',
        borderRadius: '12px 12px 0 0',
        borderBottom: 0,
        boxShadow: '0 2px 3px -1px #ddd',
        overflow: 'hidden',
        '& .kanban-th': {
            fontSize: '0.9em',
            textAlign: 'left',
            padding: '6px 8px 4px',
            ...commonBorderStyle,
        },
        ...commonBorderStyle,
    }),
);

//kanban-tr
export const KanbanTr = styled('tr')(
    sx({
        borderTop: '1px solid #eee',
    }),
);

//kanban-table
export const KanbanTable = styled('table')(
    sx({
        border: '1px solid #ddd',
        tableLayout: 'fixed',
        width: '100%',
        '&:last-child': {
            borderRadius: '0 0 12px 12px',
            borderBottom: '2px solid #ddd',
            overflow: 'hidden',
        },
        ...commonBorderStyle,
    }),
);

//kanban-th
export const KanbanTh = styled('th')(
    sx({
        textAlign: 'left',
        padding: '6px 8px 4px',
        // borderBottom: '1px solid #ddd',
        ...commonBorderStyle,
    }),
);

//kanban-td
export const KanbanTd = styled('td')(
    sx({
        display: 'table-cell',
        height: '1px',
        ...commonBorderStyle,
    }),
);

export const DroppableBoardContainer = styled('div')(
    sx({
        overflowY: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        padding: 0,
    }),
);