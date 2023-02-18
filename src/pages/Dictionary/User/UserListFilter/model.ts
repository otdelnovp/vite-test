import { IFormField } from '@core/UniversalForm/models';
import { projectStates } from '@helpers/dictionariesHelper';

export interface IUserListFilter {
    CompanyId: string | null;
    CompanyName: string;
}

export const userListFilterInit: IUserListFilter = {
    CompanyId: null,
    CompanyName: '',
};

export const userListFilterModel: IFormField[] = [
    {
        name: 'CompanyId',
        label: 'Организация',
        input: 'autocomplete',
        config: {
            type: 'guid',
            required: true,
            gridSize: 4,
            placeholder: 'Выберите организацию',
            fieldText: 'CompanyName',
            dictionaryName: 'companies',
        },
    },
];

