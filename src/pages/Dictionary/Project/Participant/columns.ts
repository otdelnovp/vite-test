import { booleanCustomBodyRender } from '@helpers/dataTableHelper';

export interface IParticipantColumnElement {
    UserId: string;
    UserName: string;
    Name: string;
    IsDeleted: boolean;
}

export const participantColumns = [
    {
        name: 'UserId',
        label: 'ИД пользователя',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: false,
            display: false,
        },
    },
    {
        name: 'UserName',
        label: 'Имя сотрудника',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
];

