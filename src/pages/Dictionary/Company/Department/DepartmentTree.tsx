import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src';

import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import TreeItem from '@mui/lab/TreeItem';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { getDepartments } from '@services/dictionaryService';
import { editDictionaryElement } from '@services/dictionaryEditService';
import { useEffectOnce } from '@hooks/useEffectOnce';

import ConfirmDialog from '@core/ConfirmDialog/ConfirmDialog';

import DepartmentsElement from '@pages/Dictionary/Company/Department/DepartmentElement';
import { IDepartmentColumnElement } from '@pages/Dictionary/Company/Department/columns';

import { useElementStyles } from '@pages/Dictionary/Universal/styles';
import { treeItemSx, treeSx } from './styles';
import { phoneMask } from '@helpers/methods';

interface IDepartmentTreeProps {
    companyId: string;
    treeData: IDepartmentColumnElement[];
    setTreeData: (newTreeData: IDepartmentColumnElement[]) => void;
    onChange: () => void;
}

const DepartmentTree = ({ companyId, treeData, setTreeData, onChange }: IDepartmentTreeProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useElementStyles();

    const [isLoading, setIsLoading] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [deptId, setDeptId] = useState('');
    const [parentId, setParentId] = useState('');

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteData, setDeleteData] = useState({ Id: '', Name: '', IsDeleted: false });

    const showEditDialog = (current?: IDepartmentColumnElement) => {
        if (current) {
            setDeptId(current.Id);
        } else {
            if (!parentId) {
                setParentId(companyId);
            }
        }
        setEditVisible(true);
    };

    const closeEditDialog = () => {
        setEditVisible(false);
        setDeptId('');
        setParentId('');
    };

    const onSaveDept = () => {
        setEditVisible(false);
        onChange();
    };

    const idsArray = (treeData: IDepartmentColumnElement[]) => {
        return treeData.map((item) => {
            return item.Id;
        });
    };

    const onDeleteClick = (Id: string, Name: string, IsDeleted: boolean) => {
        setDeleteData({ Id, Name, IsDeleted });
        setIsDeleteDialogOpen(true);
    };

    const onConfirmDeleteDialog = () => {
        if (deleteData.Id) {
            setIsLoading(true);
            dispatch(
                editDictionaryElement(
                    'Dictionary.DepartmentEdit',
                    { Id: deleteData.Id, IsDeleted: !deleteData.IsDeleted },
                    {
                        onSuccess: (res) => {
                            const newTreeData = treeData.map((item) => {
                                if (item.Id === deleteData.Id) {
                                    return { ...item, IsDeleted: !deleteData.IsDeleted };
                                }
                                return item;
                            });
                            setTreeData(newTreeData);
                            setDeleteData({ Id: '', Name: '', IsDeleted: false });
                            setIsDeleteDialogOpen(false);
                            setIsLoading(false);
                        },
                        onError: (res) => {
                            setIsLoading(false);
                        },
                    },
                ),
            );
        }
    };

    const onCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setDeleteData({ Id: '', Name: '', IsDeleted: false });
    };

    useEffectOnce(() => {
        dispatch(getDepartments({ CompanyId: companyId }));
    });

    const drawTree = (rootElementId: string, treeData: IDepartmentColumnElement[]): ReactNode => {
        if (!treeData) return <></>;

        const elements = treeData.filter((item) => item.ParentId === rootElementId);
        const tree = elements.map((item) => {
            return (
                <TreeItem
                    key={item.Id}
                    nodeId={item.Id}
                    sx={treeItemSx.item}
                    label={
                        <Box sx={treeItemSx.boxRow} key={item.Id}>
                            <Box sx={treeItemSx.boxName}>
                                <b>{item.Name || '–'}</b>
                            </Box>
                            <Box sx={treeItemSx.rightBox}>
                                <Box sx={treeItemSx.boxContactPerson}>{item.ContactPerson || '–'}</Box>
                                <Box sx={treeItemSx.boxPhone}>{item.Phone ? phoneMask(item.Phone) : '–'}</Box>
                                <Box sx={treeItemSx.boxEmail}>{item.Email || '–'}</Box>
                                <Tooltip title="Редактировать">
                                    <EditIcon sx={treeItemSx.editIcon} onClick={() => showEditDialog(item)} className={classes.listAction} />
                                </Tooltip>
                                <Tooltip title={item.IsDeleted ? 'Снять пометку на удаление' : 'Пометить на удаление'}>
                                    <DeleteForeverIcon
                                        sx={{ ...treeItemSx.deleteIcon, color: item.IsDeleted ? '#FF7070 !important' : '#ddd !important' }}
                                        onClick={() => onDeleteClick(item.Id, item.Name, item.IsDeleted)}
                                    />
                                </Tooltip>
                            </Box>
                        </Box>
                    }
                >
                    {drawTree(item.Id, treeData)}
                </TreeItem>
            );
        });
        return tree;
    };

    return (
        <Box sx={treeSx.container}>
            <Box sx={treeSx.boxAdd}>
                <Tooltip title="Добавить подразделение" placement="top">
                    <IconButton onClick={() => showEditDialog()}>
                        <AddBoxIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Paper>
                <Box className={classes.deptTree}>
                    {treeData ? (
                        <TreeView
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            onNodeSelect={(event: React.SyntheticEvent, nodeIds: Array<string> | string) => {
                                setParentId(nodeIds as string);
                            }}
                            defaultExpanded={idsArray(treeData)}
                        >
                            {drawTree(companyId, treeData)}
                        </TreeView>
                    ) : (
                        <Typography variant="subtitle1">У организации пока нет подразделений.</Typography>
                    )}
                </Box>
            </Paper>
            {editVisible && (
                <DepartmentsElement onSave={onSaveDept} onClose={closeEditDialog} deptId={deptId} parentId={parentId} companyId={companyId} />
            )}
            {isDeleteDialogOpen && (
                <ConfirmDialog
                    title="Пометка на удаление"
                    text={
                        deleteData.IsDeleted
                            ? `Снять пометку на удаление у подразделения "${deleteData.Name}"?`
                            : `Пометить на удаление подразделение "${deleteData.Name}"?`
                    }
                    onConfirm={onConfirmDeleteDialog}
                    onClose={onCloseDeleteDialog}
                />
            )}
        </Box>
    );
};

export default DepartmentTree;
