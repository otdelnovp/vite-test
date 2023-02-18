import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { AppDispatch } from 'src';

import DataTable from '@core/DataTable/DataTable';
import { PageTitle } from '@core/PageTitle/PageTitle';
import { Loader } from '@core/Loader/Loader';

import { userSelector } from '@services/userService';
import { RootState } from '@services/index';
import { alertActions } from '@services/alertService';
import { getDictionaryList, dictionaryListSelector, editDictionaryElement, setDictionaryList } from '@services/dictionaryEditService';
import { getMUIDatatableOptions, getSortOrder } from '@helpers/dataTableHelper';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { companyColumns } from '@pages/Dictionary/Company/columns';


const CompanyList = ({ user, listData, isLoading }: DictionaryReduxProps) => {
    const dispatch = useDispatch<AppDispatch>();
    let navigate = useNavigate();

    const showEditDialog = (current?: string) => {
        if (current) {
            navigate(`/dictionary/company/${current}`);
        } else {
            navigate(`/dictionary/company/new`);
        }
    };

    const onDeleteConfirm = (id: string, isDeleted: boolean) => {
        dispatch(
            editDictionaryElement(
                'Dictionary.CompanyEdit',
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

    useEffectOnce(() => {
        dispatch(getDictionaryList('Dictionary.CompanyList', user));
    });

    const options = { ...getMUIDatatableOptions({ showEditDialog, data: listData }), sortOrder: getSortOrder(companyColumns) };

    return (
        <React.Fragment>
            <PageTitle
                title={
                    <span>
                        <Link to="/dictionary">Справочники</Link> &#8250; Организации
                    </span>
                }
            />
            {isLoading ? (
                <Loader />
            ) : (
                <DataTable
                    columns={companyColumns}
                    data={listData}
                    options={options}
                    showEditDialog={showEditDialog}
                    onDeleteConfirm={onDeleteConfirm}
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

export default compose(connector)(CompanyList);