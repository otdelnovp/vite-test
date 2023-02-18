import { styled, experimental_sx as sx } from '@mui/system';

// user-ul-header
export const SelectHeading = styled('p')(
    sx({
        fontWeight: 'bold',
    }),
);

// user-ul
export const SelectList = styled('ul')(
    sx({
        listStyleType: 'none',
        margin: 0,
        marginTop: '8px',
        marginBottom: 0,
        padding: 0,
    }),
);

//priority-li
interface IPriorityListItemProps {
    selected: boolean;
}
export const PriorityListItem = styled('li')<IPriorityListItemProps>(({ selected }: any) =>
    sx({
        margin: '4px 0',
        padding: '4px 8px',
        borderRadius: '8px',
        height: '2em',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: selected ? '#cbe2fc' : 'inherit',
        '&:hover': {
            backgroundColor: '#e2efff',
            cursor: 'pointer',
        },
    }),
);

//user-li
interface IUserListItemProps {
    selected: boolean;
}
export const UserListItem = styled('li')<IUserListItemProps>(({ selected }: any) =>
    sx({
        margin: '4px 0',
        padding: '4px 8px',
        borderRadius: '8px',
        backgroundColor: selected ? '#cbe2fc' : 'inherit',
        '&:hover': {
            backgroundColor: '#e2efff',
            cursor: 'pointer',
        },
    }),
);

const colorL = 'rgb(219, 255, 166)';
const colorM = 'rgb(247, 237, 109)';
const colorH = 'rgb(255, 170, 114)';
const colorC = 'rgb(255, 130, 130)';

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'L':
            return colorL;
        case 'M':
            return colorM;
        case 'H':
            return colorH;
        case 'C':
            return colorC;
    }
};

// react-kanban-card
interface IKanbanCard {
    dragging: boolean;
    priority: string;
}
export const KanbanCard = styled('div')<IKanbanCard>(({ dragging, priority }: any) =>
    sx({
        borderRadius: '4px',
        // backgroundColor: '#fafafa',
        backgroundColor: 'rgba(200, 200, 200, 0.05)',
        padding: '8px',
        marginBottom: '7px',
        boxShadow: dragging ? '4px 4px 4px #ccc' : '1px 1px 4px #ccc',
        borderLeft: `4px solid ${getPriorityColor(priority)}`,
    }),
);

// priority-decor
interface IPriorityDecor {
    priority: string;
}
export const PriorityDecor = styled('div')<IPriorityDecor>(({ priority }: any) =>
    sx({
        margin: 'auto 4px auto 0',
        padding: '4px',
        height: '4px',
        width: '4px',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: getPriorityColor(priority),
    }),
);

// user-a
export const UserHeader = styled('a')(
    sx({
        cursor: 'pointer',
    }),
);
