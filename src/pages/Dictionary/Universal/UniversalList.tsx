import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { AppDispatch } from 'src';

import UniversalElement from '@pages/Dictionary/Universal/UniversalElement';
import { IFormField } from '@core/UniversalForm/models';
import DataTable, { IDataTableSettings } from '@core/DataTable/DataTable';
import { PageTitle } from '@core/PageTitle/PageTitle';

import { userSelector } from '@services/userService';
import { RootState } from '@services/index';
import { alertActions } from '@services/alertService';
import { getDictionaryList, dictionaryListSelector, editDictionaryElement, setDictionaryList } from '@services/dictionaryEditService';
import { getMUIDatatableColumns, getSortOrder } from '@helpers/dataTableHelper';
import { IDictionaryListElement } from '@helpers/dictionaryEditHelper';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { useListStyles } from './styles';
import { idFieldName } from '../methods';

interface IUniversalListProps extends DictionaryReduxProps {
    config: {
        apiListFunction: string;
        apiEditFunction: string;
        name: string;
        title: string;
        clearDictionaryName?: string | undefined;
        columns: any;
        model: IFormField[];
        hideDelete?: boolean;
    };
}

const UniversalList = ({ user, listData, config }: IUniversalListProps) => {
    const classes = useListStyles();

    const dispatch = useDispatch<AppDispatch>();

    const [editVisible, setEditVisible] = useState(false);
    const [elementData, setElementData] = useState({} as IDictionaryListElement);
    const [tableSettings, setTableSettings] = useState({} as IDataTableSettings);

    const showEditDialog = (value?: string) => {
        if (value) {
            const current = listData.find((item) => {
                if ('Id' in item) {
                    return item.Id === value;
                }
                return item.id === value;
            });
            if (current) {
                setElementData(current);
            }
        } else {
            setElementData({} as IDictionaryListElement);
        }
        setEditVisible(true);
    };

    const closeEditDialog = () => {
        setEditVisible(false);
    };

    const onSaveElement = () => {
        dispatch(getDictionaryList(config.apiListFunction, user));
    };

    useEffectOnce(() => {
        dispatch(getDictionaryList(config.apiListFunction, user));
    });

    useEffect(() => {
        setTableSettings({
            options: { sortOrder: getSortOrder(config.columns) },
            columns: getMUIDatatableColumns({
                columns: config.columns,
                showEditDialog,
                listActionClass: classes.listAction,
                idColumnName: idFieldName(config.name),
            }),
        });
    }, [listData]);

    const onDeleteConfirm = (id: string, isDeleted: boolean) => {
        dispatch(
            editDictionaryElement(
                config.apiEditFunction,
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

    return (
        <React.Fragment>
            <PageTitle
                title={
                    <span>
                        <Link to="/dictionary">Справочники</Link> &#8250; {config.title}
                    </span>
                }
            />
            <DataTable
                columns={config.columns}
                data={listData}
                options={tableSettings.options}
                showEditDialog={showEditDialog}
                onDeleteConfirm={config.hideDelete ? undefined : onDeleteConfirm}
                idColumnName = {idFieldName(config.name)}
            />
            {editVisible ? (
                <UniversalElement
                    onSave={onSaveElement}
                    onClose={closeEditDialog}
                    elementData={{ ...elementData }}
                    elementModel={config.model}
                    apiEditFunction={config.apiEditFunction}
                    clearDictionaryName={config.clearDictionaryName}
                />
            ) : null}
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

export default compose(connector)(UniversalList);
