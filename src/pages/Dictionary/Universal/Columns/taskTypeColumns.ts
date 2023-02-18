export interface ITaskTypeColumnElement {
    Id: string;
    Name: string;
    IsDeleted: boolean;
}

export const taskTypeColumns = [
    {
        name: 'Id',
        label: 'ИД',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: true,
            display: false,
        },
    },
    {
        name: 'Name',
        label: 'Наименование',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
];
