import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';
import { AppDispatch } from 'src';

import { IFormField } from '@core/UniversalForm/models';
import DataTable from '@core/DataTable/DataTable';
import UniversalElement from '@pages/Dictionary/Universal/UniversalElement';

import { userSelector } from '@services/userService';
import { RootState } from '@services/index';
import {
    dictionaryListSelector,
    editDictionaryElement,
    getDictionaryListFailure,
    getDictionaryListRequest,
    getDictionaryListSuccess,
    setDictionaryList,
} from '@services/dictionaryEditService';
import { getMUIDatatableColumns, getSortOrder } from '@helpers/dataTableHelper';
import { IDictionaryListElement } from '@helpers/dictionaryEditHelper';
import { IUserData } from '@helpers/authHelper';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { useListStyles } from '@pages/Dictionary/Universal/styles';
import { alertActions } from '@services/alertService';

const getListData = (type: string, user: IUserData | null | undefined, projectId: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: type,
        body: {
            ProjectId: projectId,
            IsDeleted: null,
        },
    };
    const actionTypes = {
        request: getDictionaryListRequest,
        success: getDictionaryListSuccess,
        failure: getDictionaryListFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

interface ISprintProps extends DictionaryReduxProps {
    projectId: string;
    config: {
        apiListFunction: string;
        apiEditFunction: string;
        dictionaryName: string;
        columns: any;
        model: IFormField[];
    };
}

const SprintList = ({ projectId, user, listData, config }: ISprintProps) => {
    const classes = useListStyles();

    const dispatch = useDispatch<AppDispatch>();

    const [editVisible, setEditVisible] = useState(false);
    const [elementData, setElementData] = useState({} as IDictionaryListElement);

    const showEditDialog = (value?: string) => {
        if (value) {
            const current = listData.find((item) => 'Id' in item && item.Id === value);
            if (current) {
                setElementData(current);
            }
        } else {
            setElementData({ ProjectId: projectId } as IDictionaryListElement);
        }
        setEditVisible(true);
    };

    const closeEditDialog = () => {
        setEditVisible(false);
    };

    const onSaveElement = () => {
        dispatch(getListData(config.apiListFunction, user, projectId));
    };

    useEffectOnce(() => {
        dispatch(getListData(config.apiListFunction, user, projectId));
    });

    const onDeleteConfirm = (id: string, isDeleted: boolean) => {
        dispatch(
            editDictionaryElement(
                'Task.SprintEdit',
                { Id: id, IsDeleted: isDeleted },
                {
                    onSuccess: (res) => {
                        if (res.Id) {
                            dispatch(alertActions.alertSuccess({ message: 'Успешно записано.' }));
                            const newListData = listData.map((listItem: any) => {
                                if (listItem.Id !== id) return listItem;
                                return { ...listItem, IsDeleted: isDeleted };
                            });
                            dispatch(setDictionaryList(newListData));
                        }
                    },
                },
            ),
        );
    };

    const options = { sortOrder: getSortOrder(config.columns) };
    // const columns = getMUIDatatableColumns({ columns: config.columns, showEditDialog, listActionClass: classes.listAction });

    return (
        <React.Fragment>
            <DataTable columns={config.columns} data={listData} options={options} showEditDialog={showEditDialog} onDeleteConfirm={onDeleteConfirm}/>
            {editVisible && (
                <UniversalElement
                    onSave={onSaveElement}
                    onClose={closeEditDialog}
                    elementData={{ ...elementData }}
                    elementModel={config.model}
                    apiEditFunction={config.apiEditFunction}
                    clearDictionaryName={'taskSprints'}
                />
            )}
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { listData, isLoading, isError, isSuccess } = dictionaryListSelector(state);
    return { user, listData, isLoading, isError, isSuccess };
};

const connector = connect(mapStateToProps);
type DictionaryReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(SprintList);
