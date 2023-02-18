import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import DataTable from '@core/DataTable/DataTable';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

import { getSortOrder } from '@helpers/dataTableHelper';
import { alertActions } from '@services/alertService';

import { participantColumns } from './columns';
import { IParticipantElement } from './model';
import { getMUIDatatableColumnsDeleteEdit } from '../methods';
import { useElementStyles } from '@pages/Dictionary/Universal/styles';
import { sx } from './styles';

interface IParticipantListProps {
    companyId: string;
    projectId: string;
    listData: IParticipantElement[];
    onChange: (newListData: IParticipantElement[]) => void;
    onDelete: (rowId: string) => void;
}

const ParticipantList = ({ companyId, projectId, listData, onChange, onDelete }: IParticipantListProps) => {
    const classes = useElementStyles();
    const dispatch = useDispatch();

    const [elementData, setElementData] = useState({ UserId: '', UserName: '' });

    const onChangeNewParticipant = (e: any, options: any) => {
        setElementData({ UserId: e.target.value, UserName: options.full_name });
    };

    const onAddParticipant = () => {
        if (elementData.UserId && elementData.UserName) {
            if (listData && listData.find((item) => item.UserId === elementData.UserId)) {
                return;
            }
            let newListData = listData ? listData.filter((item) => item.UserId !== elementData.UserId) : [];
            newListData = [...newListData, { ...elementData }];
            onChange(newListData);
            setElementData({ UserId: '', UserName: '' });
        } else {
            dispatch(alertActions.alertError({ message: `Выберите исполнителя.` }));
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
                placeholder="Добавить исполнителя"
                dictionaryName="companyUsers"
                selectProps={{
                    valueField: 'id',
                    textField: 'full_name',
                }}
                excludeOptions={listData?.map((item) => item.UserId)}
                value={elementData.UserId || ''}
                onChange={onChangeNewParticipant}
                filters={{ CompanyId: companyId }}
                disabled={!companyId}
                size="small"
            />
            <Button sx={sx.btn} onClick={onAddParticipant} variant="outlined" disabled={!companyId}>
                Добавить
            </Button>
        </Box>
    );

    const newColumns = getMUIDatatableColumnsDeleteEdit(participantColumns, deleteRow, classes.listAction, 'UserId');
    const sortOrder = getSortOrder(participantColumns);

    return (
        <React.Fragment>
            <DataTable columns={newColumns} data={listData} options={{ sortOrder }} customFooter={customFooter} />
        </React.Fragment>
    );
};

export default ParticipantList;
