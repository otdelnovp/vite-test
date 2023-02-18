import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src';

import DataTable from '@core/DataTable/DataTable';
import { getSortOrder } from '@helpers/dataTableHelper';

import { contractColumns, IContractColumnElement } from '@pages/Dictionary/Company/Contract/columns';
import ContractElement from '@pages/Dictionary/Company/Contract/ContractElement';

import { useElementStyles } from '@pages/Dictionary/Universal/styles';
import { editDictionaryElement } from '@services/dictionaryEditService';
import { Loader } from '@core/Loader/Loader';

interface IContractListProps {
    companyId: string;
    listData: IContractColumnElement[];
    setListData: (newListData: IContractColumnElement[]) => void;
    onChange: () => void;
}

const ContractList = ({ companyId, listData, onChange, setListData }: IContractListProps) => {
    const classes = useElementStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [editVisible, setEditVisible] = useState(false);
    const [elementId, setElementId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const showEditDialog = (current?: string) => {
        if (current) {
            setElementId(current);
        }
        setEditVisible(true);
    };

    const closeEditDialog = () => {
        setEditVisible(false);
        setElementId('');
    };

    const onSaveElement = () => {
        setEditVisible(false);
        onChange();
    };

    const onConfirmDeleteDialog = (id: string, isDeleted: boolean) => {
        setIsLoading(true);
        dispatch(
            editDictionaryElement(
                'Dictionary.ContractEdit',
                { Id: id, IsDeleted: isDeleted },
                {
                    onSuccess: (res) => {
                        const newListData = listData.map((item) => {
                            if (item.Id !== id) return item;
                            return { ...item, IsDeleted: isDeleted };
                        });
                        setListData(newListData);
                        setIsLoading(false);
                    },
                },
            ),
        );
    };

    const sortOrder = getSortOrder(contractColumns);

    return (
        <React.Fragment>
            {isLoading ? (
                <Loader />
            ) : (
                <DataTable
                    columns={contractColumns}
                    data={listData}
                    showEditDialog={showEditDialog}
                    options={{ sortOrder }}
                    onDeleteConfirm={onConfirmDeleteDialog}
                    titleColumnName="Number"
                />
            )}
            {editVisible && <ContractElement onSave={onSaveElement} onClose={closeEditDialog} elementId={elementId} companyId={companyId} />}
        </React.Fragment>
    );
};

export default ContractList;
function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
