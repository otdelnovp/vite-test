import React, { ReactNode, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TreeItem from '@mui/lab/TreeItem';

import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

import { createRequest } from '@services/dispatcher';

import { IDepartmentColumnElement } from '@pages/Dictionary/Company/Department/columns';
import { useElementStyles } from '@pages/Dictionary/Universal/styles';

import { treeItemLabelNameSX, treeItemLabelSX, treeItemSX } from './styles';

interface IDepartmentTreeProps {
    onSelect: (selectedText: string, selectedValue: string) => void;
    onClose: () => void;
}

const DepartmentInputDialog = ({ onSelect, onClose }: IDepartmentTreeProps) => {
    const classes = useElementStyles();

    const [companyId, setCompanyId] = useState('');
    const [treeData, setTreeData] = useState([] as IDepartmentColumnElement[]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDept, setSelectedDept] = useState({ text: '', value: '' });

    const idsArray = (treeData: IDepartmentColumnElement[]) => {
        return treeData.map((item) => {
            return item.Id;
        });
    };

    useEffect(() => {
        const fetchData = async (companyId: string) => {
            if (companyId) {
                setIsLoading(true);
                const params = {
                    type: 'Dictionary.DepartmentList',
                    body: {
                        CompanyId: companyId,
                    },
                };
                const fetchData = await createRequest(params);
                // @ts-ignore
                const { error, body: newBody } = fetchData.data as IServerResponse;
                if (error) {
                    throw error;
                } else {
                    setTreeData(newBody);
                }
                setIsLoading(false);
            }
        };
        fetchData(companyId);
    }, [companyId]);

    const drawTree = (rootElementId: string, treeData: IDepartmentColumnElement[]): ReactNode => {
        if (!treeData) return <></>;

        const elements = treeData.filter((item) => item.ParentId === rootElementId);
        const tree = elements.map((item) => {
            return (
                <TreeItem
                    key={item.Id}
                    nodeId={item.Id}
                    sx={treeItemSX}
                    label={
                        <Box component="div" sx={treeItemLabelSX} key={item.Id}>
                            <Box component="div" sx={treeItemLabelNameSX}>
                                <b>{item.Name || '–'}</b>
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
        <Dialog open={true} onClose={() => null} fullWidth={true} maxWidth="sm">
            <DialogTitle>Выберите подразделение</DialogTitle>
            <DialogContent>
                <Grid item xs={12}>
                    <AutocompleteInput
                        name={'CompanyId'}
                        required={true}
                        label="Организация"
                        dictionaryName="companies"
                        selectProps={{
                            valueField: 'Id',
                            textField: 'Name',
                        }}
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                        error={!companyId}
                    />
                </Grid>
                <Box component="div" className={classes.deptTree}>
                    {treeData && treeData.length ? (
                        <TreeView
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            onNodeSelect={(event: React.SyntheticEvent, nodeIds: Array<string> | string) => {
                                const text = treeData.find((item) => item.Id === nodeIds)?.Name || '';
                                const value = nodeIds as string;
                                setSelectedDept({ text, value });
                            }}
                            defaultExpanded={idsArray(treeData)}
                        >
                            {drawTree(companyId, treeData)}
                        </TreeView>
                    ) : (
                        <Typography variant="subtitle1">Выберите организацию, чтобы увидеть подразделения.</Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Закрыть
                </Button>
                <Button
                    onClick={() => {
                        onSelect(selectedDept.text, selectedDept.value);
                        onClose();
                    }}
                    variant="contained"
                >
                    Выбрать
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DepartmentInputDialog;

