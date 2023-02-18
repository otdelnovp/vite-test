import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import DataTable from '@core/DataTable/DataTable';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

import { getSortOrder } from '@helpers/dataTableHelper';
import { alertActions } from '@services/alertService';

import { projectBoardStateColumns } from '@pages/Dictionary/Project/BoardState/columns';
import { IBoardStateElement } from './model';
import { getMUIDatatableColumnsDeleteEdit } from '../methods';

import { useElementStyles } from '@pages/Dictionary/Universal/styles';
import { sx } from './styles';

interface IBoardStatesListProps {
    companyId: string;
    listData: IBoardStateElement[];
    onChange: (newListData: IBoardStateElement[]) => void;
    onDelete: (rowId: string) => void;
    onMoveRow: (rowId: string, direction: string) => void;
}

const defaultElementData = { BoardStateId: '', BoardStateName: '', N: 0 };

const BoardStateList = ({ companyId, listData, onChange, onDelete, onMoveRow }: IBoardStatesListProps) => {
    const classes = useElementStyles();
    const dispatch = useDispatch();

    const [elementData, setElementData] = useState(defaultElementData);

    const onChangeNewBoardState = (e: any, options: any) => {
        const newN = listData && listData.length ? listData.length + 1 : 1;
        setElementData({ BoardStateId: e.target.value, BoardStateName: options.Name, N: newN });
    };

    const onAddBoardState = () => {
        if (elementData.BoardStateId && elementData.BoardStateName) {
            if (listData && listData.find((item) => item.BoardStateId === elementData.BoardStateId)) {
                return;
            }
            let newListData = listData ? listData.filter((item) => item.BoardStateId !== elementData.BoardStateId) : [];
            newListData = [...newListData, { ...elementData }];
            onChange(newListData);
            setElementData(defaultElementData);
        } else {
            dispatch(alertActions.alertError({ message: `Выберите состояние.` }));
        }
    };

    const deleteRow = (current?: string) => {
        if (current) {
            onDelete(current);
        }
    };

    const moveRow = (current: string, direction: string) => {
        if (current && direction) {
            onMoveRow(current, direction);
        }
    };

    const customFooter = (
        <Box sx={sx.box}>
            <AutocompleteInput
                name="NewParticipant"
                placeholder="Добавить состояние"
                dictionaryName="boardStates"
                selectProps={{
                    valueField: 'Id',
                    textField: 'Name',
                }}
                excludeOptions={listData?.map((item) => item.BoardStateId)}
                value={elementData.BoardStateId || ''}
                onChange={onChangeNewBoardState}
                filters={{ CompanyId: companyId }}
                disabled={!companyId}
                size="small"
            />
            <Button sx={sx.btn} onClick={onAddBoardState} variant="outlined" disabled={!companyId}>
                Добавить
            </Button>
        </Box>
    );

    const newColumns = getMUIDatatableColumnsDeleteEdit(
        projectBoardStateColumns,
        deleteRow,
        classes.listAction,
        'BoardStateId',
        moveRow,
    );
    const sortOrder = getSortOrder(projectBoardStateColumns);

    return (
        <React.Fragment>
            <DataTable columns={newColumns} data={listData} options={{ ...sortOrder, sort: false }} customFooter={customFooter} />
        </React.Fragment>
    );
};

export default BoardStateList;
