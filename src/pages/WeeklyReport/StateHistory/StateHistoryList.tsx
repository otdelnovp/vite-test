
import React, { useState } from 'react';

import DataTable from '@core/DataTable/DataTable';

import { IUserData } from '@helpers/authHelper';
import { getSortOrder } from '@helpers/dataTableHelper';

import { stateHistoryColumns } from './columns';
import { initStateHistoryElement, IStateHistoryElement, stateHistoryModel } from './model';
import { useElementStyles } from '@pages/Dictionary/Universal/styles';
import StateHistoryElement from './StateHistoryElement';


interface IStateHistoryListProps {
    user: IUserData | null;
    weeklyReportId: string;
    listData: IStateHistoryElement[];
    onChange: (newListData: IStateHistoryElement[]) => void;
}

const StateHistoryList = ({ user, weeklyReportId, listData, onChange }: IStateHistoryListProps) => {
    const classes = useElementStyles();

    const [editVisible, setEditVisible] = useState(false);
    const [elementData, setElementData] = useState({ ...initStateHistoryElement });

    const showEditDialog = (arg0: any) => {
        setEditVisible(true);
    };

    const closeEditDialog = () => {
        setEditVisible(false);
        setElementData({ ...initStateHistoryElement });
    };

    const sortOrder = getSortOrder(stateHistoryColumns);
    const options = {
        sort: true,
        sortOrder: {...sortOrder},
        setRowProps: (rowData: string[], dataIndex: number) => {
            const onDoubleClick = {
                onDoubleClick: () => {
                    return null;
                },
            };
            return onDoubleClick;
        },
    }

    return (
        <React.Fragment>
            <DataTable columns={stateHistoryColumns} data={listData} options={options} />
            {editVisible && <StateHistoryElement user={user} weeklyReportId={weeklyReportId} elementData={elementData} elementModel={stateHistoryModel} onClose={closeEditDialog} />}
        </React.Fragment>
    );
};

export default StateHistoryList;