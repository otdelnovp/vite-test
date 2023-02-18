import { IContractColumnElement } from './Contract/columns';

export const fillCounterparty = (companyId: string, listData: IContractColumnElement[] | undefined) => {
    return listData && listData.map((item) => {
        return {
            ...item,
            Counterparty: {
                Name: companyId === item.SupplierId ? item.CustomerName : item.SupplierName,
                Type: companyId === item.SupplierId ? 'Покупатель' : 'Поставщик',
            },
        };
    });
};
