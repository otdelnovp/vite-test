export interface IWorkspaceColumnElement {
    Id: string;
    CompanyId: string;
    Name: string;
    IsDeleted: boolean;
}

export const workspaceColumns = [
    {
        name: 'Id',
        label: 'ИД рабочего пространства',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: true,
            display: false,
        },
    },
    {
        name: 'CompanyId',
        label: 'Организация',
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
