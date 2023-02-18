import React from 'react';
import { HtmlTooltip } from './UserTooltip';
import Box from '@mui/material/Box';
import { IUserGroup } from '@pages/Tasks/TaskKanban/methods';
import { KanbanCard, PriorityDecor, PriorityListItem, SelectHeading, SelectList, UserHeader, UserListItem } from './styles';

interface ICard {
    children: any;
    dragging: boolean;
    userList: any;
    allowRemoveCard: boolean;
    onCardRemove: (card: any) => {};
    changePriority: (taskId: string, priority: string) => {};
    changeUser: (taskId: string, userId: string, userName: string) => {};
}

const Card = ({ children: card, dragging, allowRemoveCard, onCardRemove, userList, changePriority, changeUser }: ICard) => {
    const [openUsers, setOpenUsers] = React.useState(false);
    const [openPriority, setOpenPriority] = React.useState(false);

    const handleTooltipUsersClose = () => {
        setOpenUsers(false);
    };

    const handleTooltipUsersOpen = () => {
        setOpenUsers(true);
    };

    const handleTooltipPriorityClose = () => {
        setOpenPriority(false);
    };

    const handleTooltipPriorityOpen = () => {
        setOpenPriority(true);
    };

    const handleUserSelect = (userId: string, userName: string) => {
        if (userId !== card.userId) {
            changeUser(card.taskId, userId, userName);
        }
    };

    const handlePrioritySelect = (priority: string) => {
        if (priority !== card.priority) {
            changePriority(card.taskId, priority);
        }
    };

    return (
        <KanbanCard dragging={dragging} priority={card.priority}>
            <a>{card.title} </a>
            {card.description}
            <hr />
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <HtmlTooltip
                    arrow
                    title={
                        <Box>
                            <SelectHeading>Выберите приоритет:</SelectHeading>
                            <SelectList>
                                <PriorityListItem selected={card.priority === 'L'} onClick={() => handlePrioritySelect('L')}>
                                    <PriorityDecor priority={'L'} /> <p>Низкий</p>
                                </PriorityListItem>
                                <PriorityListItem selected={card.priority === 'M'} onClick={() => handlePrioritySelect('M')}>
                                    <PriorityDecor priority={'M'} /> <p>Средний</p>
                                </PriorityListItem>
                                <PriorityListItem selected={card.priority === 'H'} onClick={() => handlePrioritySelect('H')}>
                                    <PriorityDecor priority={'H'} /> <p>Высокий</p>
                                </PriorityListItem>
                                <PriorityListItem selected={card.priority === 'C'} onClick={() => handlePrioritySelect('C')}>
                                    <PriorityDecor priority={'C'} /> <p>Критический</p>
                                </PriorityListItem>
                            </SelectList>
                        </Box>
                    }
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={handleTooltipPriorityClose}
                    open={openPriority}
                >
                    <PriorityDecor priority={card.priority} onClick={handleTooltipPriorityOpen}/>
                </HtmlTooltip>
                <HtmlTooltip
                    arrow
                    title={
                        <Box>
                            <SelectHeading>Выберите исполнителя:</SelectHeading>
                            <SelectList>
                                {userList.map((item: IUserGroup) => {
                                    return (
                                        <UserListItem
                                            key={`user_li_${item.userId}_${card.taskId}`}
                                            selected={item.userId === card.userId}
                                            onClick={() => {
                                                item.userId !== card.userId ? handleUserSelect(item.userId, item.userName) : null;
                                            }}
                                        >
                                            {item.userName}
                                        </UserListItem>
                                    );
                                })}
                            </SelectList>
                        </Box>
                    }
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={handleTooltipUsersClose}
                    open={openUsers}
                >
                    <UserHeader onClick={handleTooltipUsersOpen}>
                        {card.userName}
                    </UserHeader>
                </HtmlTooltip>
            </Box>
        </KanbanCard>
    );
};

export default Card;
