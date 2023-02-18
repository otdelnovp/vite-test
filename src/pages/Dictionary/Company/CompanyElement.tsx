import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from 'src';

import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Loader } from '@core/Loader/Loader';
import { MuiTabs } from '@core/Tabs/MuiTabs';
import { IMuiTab } from '@core/Tabs/methods';
import UniversalForm from '@core/UniversalForm/UniversalForm';
import { checkFormFullfilled } from '@core/UniversalForm/methods';

import { clearDictionary, dictSelectors, getCompanyOwnershipTypes } from '@services/dictionaryService';
import { alertActions } from '@services/alertService';
import { RootState } from '@services/index';
import { editDictionaryElement, getDictionaryElement } from '@services/dictionaryEditService';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { ICompanyElement } from '@pages/Dictionary/Company/model';
import { companyModel } from '@pages/Dictionary/Company/model';
import DepartmentTree from '@pages/Dictionary/Company/Department/DepartmentTree';
import ContractList from '@pages/Dictionary/Company/Contract/ContractList';
import { useElementStyles } from '@pages/Dictionary/Universal/styles';
import { IDepartmentColumnElement } from './Department/columns';
import { IContractColumnElement } from './Contract/columns';
import { fillCounterparty } from './methods';

interface ICompanyElementForm extends DictionaryReduxProps {
    companyId: string;
}

const CompanyElement = ({ companyId, companyOwnershipTypes }: ICompanyElementForm) => {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useElementStyles();
    const navigate = useNavigate();

    const [changed, setChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [body, setBody] = useState({} as ICompanyElement);
    const [tabIndex, setTabIndex] = useState(0);

    const onFieldChange = (name: string, value: any) => {
        let newBody = { ...body, [name]: value };
        if (name === 'OwnershipTypeCode' && value !== 'ИП') {
            newBody.INN = newBody.INN ? newBody.INN.slice(0, 10) : '';
            newBody.OGRN = newBody.OGRN ? newBody.OGRN.slice(0, 13) : '';
        } else if ((name === 'Name' || name === 'INN') && value.LegalName) {
            newBody = { ...body, ...value };
        }
        setBody(newBody);
        setChanged(true);
    };

    const handleSubmit = () => {
        const validationErrorMsg = checkFormFullfilled(companyModel, body);
        if (!validationErrorMsg) {
            setIsLoading(true);
            dispatch(
                editDictionaryElement('Dictionary.CompanyEdit', body, {
                    onSuccess: (res) => {
                        if (res.Id) {
                            dispatch(clearDictionary({ name: 'companies' }));
                            dispatch(alertActions.alertSuccess({ message: 'Успешно записано.' }));
                            navigate(`/dictionary/company/${res.Id}`);
                            setBody({ ...body, Id: res.Id });
                            setIsLoading(false);
                        }
                    },
                    onError: (res) => {
                        setIsLoading(false);
                    },
                }),
            );
        } else {
            dispatch(alertActions.alertError({ message: validationErrorMsg }));
        }
    };

    const handleClose = () => {
        navigate('/dictionary/company');
    };

    useEffectOnce(() => {
        if (companyId !== 'new') {
            setIsLoading(true);
            dispatch(
                getDictionaryElement('Dictionary.CompanyGet', companyId, {
                    onSuccess: (res) => {
                        console.log("Dictionary.CompanyGet res", res)
                        const newBody = { ...res, Contracts: fillCounterparty(companyId, res.Contracts) };
                        setBody(newBody);
                        setIsLoading(false);
                    },
                    onError: (res) => {
                        setIsLoading(false);
                    },
                }),
            );
        } else {
            setIsLoading(false);
        }
    });

    const updateTable = (tableName: string): void => {
        dispatch(
            getDictionaryElement('Dictionary.CompanyGet', companyId, {
                onSuccess: (res) => {
                    switch (tableName) {
                        case 'departments':
                            setTabIndex(1);
                            break;
                        case 'contracts':
                            setTabIndex(2);
                            break;
                        default:
                            setTabIndex(0);
                            break;
                    }
                    const newBody = { ...res, Contracts: fillCounterparty(companyId, res.Contracts) };
                    setBody(newBody);
                    setIsLoading(false);
                },
                onError: (res) => {
                    setIsLoading(false);
                },
            }),
        );
    };

    const setTreeData = (newTreeData: IDepartmentColumnElement[]) => {
        setBody({ ...body, Departments: [...newTreeData] });
    };
    const setContractListData = (newListData: IContractColumnElement[]) => {
        setBody({ ...body, Contracts: [...newListData] });
    };

    useEffect(() => {
        if (!companyOwnershipTypes.find((item: any) => item.Code === body.OwnershipTypeCode)) {
            setBody({ ...body, OwnershipTypeCode: '' });
        }
    }, [body.OwnershipTypeCode]);

    useEffectOnce(() => {
        dispatch(getCompanyOwnershipTypes());
    });

    const pageTitle = body.Id ? 'Редактирование организации' : 'Добавление организации';

    const tabList: IMuiTab[] = [
        {
            index: 0,
            label: 'Основное',
            children: (
                <Paper>
                    <Box className={classes.formBox}>
                        <UniversalForm data={body} onFieldChange={onFieldChange} model={companyModel} onSubmit={handleSubmit} />
                    </Box>
                </Paper>
            ),
        },
        {
            index: 1,
            label: 'Подразделения',
            children: (
                <DepartmentTree
                    companyId={body?.Id}
                    treeData={body?.Departments}
                    onChange={() => updateTable('departments')}
                    setTreeData={setTreeData}
                />
            ),
        },
        {
            index: 2,
            label: 'Договоры',
            children: (
                <ContractList
                    companyId={body?.Id}
                    listData={body?.Contracts}
                    onChange={() => updateTable('contracts')}
                    setListData={setContractListData}
                />
            ),
        },
    ];

    return (
        <React.Fragment>
            <Box className={classes.header}>
                <Box className={classes.pageTitle}>
                    <Typography component="h1" variant="h1">
                        <Link to="/dictionary">Справочники</Link> &#8250; <Link to="/dictionary/company">Организации</Link> &#8250; {pageTitle}
                    </Typography>
                </Box>
                <Box>
                    <Button sx={{ marginRight: '8px' }} onClick={handleSubmit} disabled={!changed} variant="contained">
                        Сохранить
                    </Button>
                    <Button sx={{ marginRight: '8px' }} onClick={handleClose} variant="outlined">
                        Вернуться к списку
                    </Button>
                </Box>
            </Box>
            <Box className={classes.tabBox}>
                {isLoading || !body ? (
                    <Loader />
                ) : (
                    <form className={classes.editForm}>
                        <MuiTabs list={tabList} gutterBottom={true} externalTabControl extTabValue={tabIndex} setExtTabValue={setTabIndex} />
                    </form>
                )}
            </Box>
        </React.Fragment>
    );
};

// export default CompanyElement;

const mapStateToProps = (state: RootState) => {
    const { companyOwnershipTypes } = dictSelectors.companyOwnershipTypes(state);
    return { companyOwnershipTypes };
};

const connector = connect(mapStateToProps);
type DictionaryReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(CompanyElement);
