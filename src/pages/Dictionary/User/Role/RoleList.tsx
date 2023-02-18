import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import DataTable from '@core/DataTable/DataTable';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

import { getSortOrder } from '@helpers/dataTableHelper';

import { roleColumns } from './columns';
import { IRoleElement } from './model';
import { getMUIDatatableColumnsDeleteEdit } from '../../Project/methods';

import { useElementStyles } from '@pages/Dictionary/Universal/styles';
import { sx } from './styles';
import { alertActions } from '@services/alertService';

interface IParticipantListProps {
    companyId: string;
    userId: string;
    listData: IRoleElement[];
    onChange: (newListData: IRoleElement[]) => void;
    onDelete: (rowId: string) => void;
}

const RoleList = ({ companyId, userId, listData, onChange, onDelete }: IParticipantListProps) => {
    const classes = useElementStyles();
    const dispatch = useDispatch();

    const [editVisible, setEditVisible] = useState(false);
    const [elementData, setElementData] = useState({ role_id: '', role_title: '' });

    const onChangeNewRole = (e: any, options: any) => {
        setElementData({ role_id: e.target.value, role_title: options.title });
    };

    const onAddRole = () => {
        if (elementData.role_id && elementData.role_title) {
            if (listData && listData.find((item) => item.role_id === elementData.role_id)) {
                return;
            }
            let newListData = listData ? listData.filter((item) => item.role_id !== elementData.role_id) : [];
            newListData = [...newListData, { ...elementData }];
            onChange(newListData);
            setElementData({ role_id: '', role_title: '' });
        } else {
            dispatch(alertActions.alertError({ message: `Выберите роль.` }));
        }
    };

    const deleteRow = (current?: string) => {
        if (current) {
            onDelete(current);
        }
    };

    const onSaveElement = (newListData: IRoleElement[]) => {
        onChange(newListData);
    };

    const customFooter = (
        <Box sx={sx.box}>
            <AutocompleteInput
                name="NewParticipant"
                placeholder="Добавить группу"
                dictionaryName="roles"
                selectProps={{
                    valueField: 'id',
                    textField: 'title',
                }}
                excludeOptions={listData?.map((item) => item.role_id)}
                value={elementData.role_id || ''}
                onChange={onChangeNewRole}
                filters={{ org_id: companyId }}
                disabled={!companyId}
                size="small"
            />
            <Button sx={sx.btn} onClick={onAddRole} variant="outlined" disabled={!companyId}>
                Добавить
            </Button>
        </Box>
    );

    const newColumns = getMUIDatatableColumnsDeleteEdit(roleColumns, deleteRow, classes.listAction, 'role_id');
    const sortOrder = getSortOrder(roleColumns);

    return (
        <React.Fragment>
            <DataTable columns={newColumns} data={listData} options={{ sortOrder }} customFooter={customFooter} />
        </React.Fragment>
    );
};

export default RoleList;
