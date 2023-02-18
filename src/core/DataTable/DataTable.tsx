import React, { useState } from 'react';

import MUIDataTable, { MUIDataTableColumn, MUIDataTableColumnOptions, MUIDataTableOptions } from 'mui-datatables';

import { useStyles } from './styles';
import { getMUIDatatableColumns, getMUIDatatableOptions } from '@helpers/dataTableHelper';
import ConfirmDialog from '@core/ConfirmDialog/ConfirmDialog';

interface DataTableColumnOptions extends MUIDataTableColumnOptions {
    sortDefault?: string | undefined;
}

interface DataTableColumn extends MUIDataTableColumn {
    options: DataTableColumnOptions;
}
interface IDataTableProps {
    title?: string | React.ReactNode;
    columns: DataTableColumn[];
    data: any[];
    options?: MUIDataTableOptions | undefined;
    customFooter?: JSX.Element;
    showEditDialog?: (id?: string) => void;
    onDeleteConfirm?: (id: string, isDeleted: boolean) => void;
    idColumnName?: string;
    titleColumnName?: string;
}

export interface IDataTableSettings {
    options: MUIDataTableOptions;
    columns: DataTableColumn[];
}

interface IItemToDelete {
    id: string;
    title: string;
    isDeleted: boolean;
}

const DataTable = ({
    title,
    columns,
    data,
    options,
    customFooter,
    showEditDialog,
    onDeleteConfirm,
    idColumnName,
    titleColumnName,
}: IDataTableProps) => {
    const classes = useStyles();

    const [itemToDelete, setItemToDelete] = useState({} as IItemToDelete);

    const fullOptions = options
        ? { ...getMUIDatatableOptions({ showEditDialog, data, customFooter }), ...options }
        : getMUIDatatableOptions({ showEditDialog });

    const showDeleteDialog = (id: string) => {
        const currentItem = data.find((item: any) => (idColumnName ? item[idColumnName] === id : item['Id'] === id));
        if (currentItem) {
            setItemToDelete({
                id,
                title: titleColumnName ? currentItem[titleColumnName] : currentItem['Name'],
                isDeleted: currentItem.IsDeleted,
            });
        }
    };

    const onCloseDeleteDialog = () => setItemToDelete({} as IItemToDelete);

    const onConfirmDeleteDialog = () => {
        if (onDeleteConfirm) {
            onDeleteConfirm(itemToDelete.id, !itemToDelete.isDeleted);
            setItemToDelete({} as IItemToDelete);
        }
    };

    const fullColumns = getMUIDatatableColumns({
        columns,
        showEditDialog,
        listData: data,
        showDeleteDialog: onDeleteConfirm ? showDeleteDialog : undefined,
        idColumnName,
        titleColumnName,
    });

    return (
        <>
            <MUIDataTable title={title ? title : ''} columns={fullColumns} data={data ? data : []} options={fullOptions} />
            {itemToDelete.id && (
                <ConfirmDialog
                    title="Пометка на удаление"
                    text={
                        itemToDelete.isDeleted
                            ? `Снять пометку на удаление у "${itemToDelete.title ? itemToDelete.title : '<не заполнен>'}"?`
                            : `Пометить на удаление "${itemToDelete.title}"?`
                    }
                    onConfirm={onDeleteConfirm ? onConfirmDeleteDialog : onCloseDeleteDialog}
                    onClose={onCloseDeleteDialog}
                />
            )}
        </>
    );
};

export default DataTable;
