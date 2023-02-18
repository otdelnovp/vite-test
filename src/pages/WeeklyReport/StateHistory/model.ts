import { IFormField } from '@core/UniversalForm/models';
import { weeklyReportStates } from '@helpers/dictionariesHelper';

export interface IStateHistoryElement {
    Id: string;
    Date: string;
    UserId: string;
    UserName: string;
    State: string;
    StateName: string;
    Comment: string;
}

export const initStateHistoryElement = {
    Id: "",
    Date: "",
    UserId: "",
    UserName: "",
    State: "",
    StateName: "",
    Comment: ""
}

export const stateHistoryModel: IFormField[] = [
    {
        name: 'Id',
        label: 'Идентификатор',
        config: {
            hidden: true,
            required: true,
            gridSize: 12,
        },
    },
    {
        name: 'State',
        label: 'Состояние',
        input: 'select',
        config: {
            gridSize: 12,
            options: weeklyReportStates.map((item) => ({
                id: item.Code,
                value: item.Code,
                text: item.Name,
            })),
        },
    },
    {
        name: 'Comment',
        label: 'Комментарий',
        config: {
            required: false,
            gridSize: 12,
        },
    },
];
