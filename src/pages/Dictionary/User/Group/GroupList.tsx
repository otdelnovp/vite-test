import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import DataTable from '@core/DataTable/DataTable';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

import { getSortOrder } from '@helpers/dataTableHelper';
import { alertActions } from '@services/alertService';

import { useElementStyles } from '@pages/Dictionary/Universal/styles';

import { groupColumns } from './columns';
import { IGroupElement } from './model';
import { getMUIDatatableColumnsDeleteEdit } from '../../Project/methods';

import { sx } from './styles';

interface IGroupListProps {
    companyId: string;
    userId: string;
    listData: IGroupElement[];
    onChange: (newListData: IGroupElement[]) => void;
    onDelete: (rowId: string) => void;
}

const GroupList = ({ companyId, userId, listData, onChange, onDelete }: IGroupListProps) => {
    const classes = useElementStyles();
    const dispatch = useDispatch();

    const [elementData, setElementData] = useState({ group_id: '', group_name: '' });

    const onChangeNewGroup = (e: any, options: any) => {
        setElementData({ group_id: e.target.value, group_name: options.group_name });
    };

    const onAddGroup = () => {
        if (elementData.group_id && elementData.group_name) {
            if (listData && listData.find((item) => item.group_id === elementData.group_id)) {
                return;
            }
            let newListData = listData ? listData.filter((item) => item.group_id !== elementData.group_id) : [];
            newListData = [...newListData, { ...elementData }];
            onChange(newListData);
            setElementData({ group_id: '', group_name: '' });
        } else {
            dispatch(alertActions.alertError({ message: `Выберите группу.` }));
        }
    };

    const deleteRow = (current?: string) => {
        if (current) {
            onDelete(current);
        }
    };

    const customFooter = (
        <Box sx={sx.box}>
            <AutocompleteInput
                name="NewParticipant"
                placeholder="Добавить группу"
                dictionaryName="userGroups"
                selectProps={{
                    valueField: 'id',
                    textField: 'group_name',
                }}
                excludeOptions={listData?.map((item) => item.group_id)}
                value={elementData.group_id || ''}
                onChange={onChangeNewGroup}
                filters={{ org_id: companyId }}
                disabled={!companyId}
                size="small"
            />
            <Button sx={sx.btn} onClick={onAddGroup} variant="outlined" disabled={!companyId}>
                Добавить
            </Button>
        </Box>
    );

    const newColumns = getMUIDatatableColumnsDeleteEdit(groupColumns, deleteRow, classes.listAction, 'group_id');
    const sortOrder = getSortOrder(groupColumns);

    return (
        <React.Fragment>
            <DataTable columns={newColumns} data={listData} options={{ sortOrder }} customFooter={customFooter} />
        </React.Fragment>
    );
};

export default GroupList;
