import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import PendingIcon from '@mui/icons-material/Pending';
import DepartmentInputDialog from './DepartmentInputDialog';
import { StringLiteral } from 'typescript';

export interface IDepartmentInput {
    companyId?: string;
    name: string;
    label: string;
    value: string;
    text: string;
    required?: boolean;
    gridSize?: number;
    onChange: (name: string, value: string) => void;
}

const DepartmentInput: React.FC<IDepartmentInput> = ({ companyId, name, label, value, text, required, gridSize, onChange }) => {
    const [editVisible, setEditVisible] = useState(false);
    const [fieldText, setFieldText] = useState(text);

    const onCloseDialog = () => {
        setEditVisible(false);
    };

    const onSelect = (selectedText: string, selectedValue: string) => {
        onChange(name, selectedValue);
        setFieldText(selectedText);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={gridSize || 6}>
                <TextField
                    sx={{ width: '100%' }}
                    name={name}
                    label={label}
                    value={fieldText || ''}
                    variant="filled"
                    required={required}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setEditVisible(true)} edge="end">
                                    <PendingIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {editVisible && <DepartmentInputDialog onSelect={onSelect} onClose={onCloseDialog} />}
            </Grid>
        </Grid>
    );
};

export default DepartmentInput;

// Пример вызова:
{/* <DepartmentInput
    companyId={body.Id}
    name={'DepartmentId'}
    label={'Подр.'}
    value={testDept}
    text={''}
    onChange={(name, value) => {
        console.log('onChange', name, value);
        setTestDept(value);
    }}
/>; */}
