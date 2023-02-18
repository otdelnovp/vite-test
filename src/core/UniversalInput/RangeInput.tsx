import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

export interface IRangeInput {
    id?: string;
    type?: string;
    name: string;
    label?: string;
    value?: any;
    onChange?: (event: any, params?: any, fieldName?: string) => void;
    className?: string;
    error?: boolean;
    variant?: 'outlined' | 'standard' | 'filled';
    size?: 'small' | 'medium';
    inputProps?: {
        max?: number;
        min?: number;
        step?: number;
    };
    required?: boolean;
    onRangeChange?: (event: any, newValue: number | number[], fieldName: any) => void;
    rangeProps?: {
        rangeText?: (value: number) => string;
        min?: number;
        max?: number;
        step?: number;
        marks?: boolean;
        customMarks?: Array<{
            value: number;
            label: string;
        }>;
    };
    color?: 'primary' | 'secondary';
    disabled?: boolean;
}

export const autoCompleteRule = 'off';

const baseInputProps = {};

const getFullInputProps = (inputProps: any) => {
    return inputProps ? { ...baseInputProps, ...inputProps } : baseInputProps;
};

export const RangeInput: React.FC<IRangeInput> = ({
    id,
    type,
    name,
    label,
    value,
    onChange,
    className,
    error,
    inputProps,
    variant,
    rangeProps,
    onRangeChange,
    size = 'small',
    color,
    disabled,
}) => {
    const prepareRangeLabel = () => {
        if (Array.isArray(value)) {
            if (typeof rangeProps?.rangeText === 'function') {
                return value[0] !== value[1]
                    ? `${label}: от ${rangeProps?.rangeText(value[0])} до ${rangeProps?.rangeText(value[1])}`
                    : `${label}: ${value[0]}`;
            } else {
                return value[0] !== value[1] ? `${label}: от ${value[0]} до ${value[1]}` : `${label}: ${value[0]}`;
            }
        }
        if (typeof rangeProps?.rangeText === 'function') {
            return `${label}: ${rangeProps?.rangeText(value)}`;
        } else {
            return `${label}: ${value}`;
        }
    };

    if (type === 'range-input') {
        return (
            <Box className={className}>
                <Typography id={name} gutterBottom>
                    {prepareRangeLabel()}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={8}>
                        <Slider
                            id={name + id + '__range'}
                            name={name}
                            value={value.slice()}
                            onChange={(event: any, newValue: number | number[]) =>
                                onRangeChange ? onRangeChange(event, newValue, name) : null
                            }
                            min={rangeProps?.min}
                            max={rangeProps?.max}
                            step={rangeProps?.step}
                            marks={rangeProps && (rangeProps.customMarks || rangeProps.marks)}
                            color={color}
                            disabled={disabled}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <TextField
                            id={name + id + '__range-input'}
                            name={name}
                            type={'number'}
                            value={value.slice()}
                            variant={variant}
                            size={size}
                            onChange={onChange}
                            error={error}
                            fullWidth
                            autoComplete={autoCompleteRule}
                            inputProps={getFullInputProps(inputProps)}
                            disabled={disabled}
                        />
                    </Grid>
                </Grid>
            </Box>
        );
    }
    return (
        <div className={className}>
            <label id={name + id}>{prepareRangeLabel()}</label>
            <Slider
                id={name + id}
                name={name}
                value={value}
                onChange={(event: any, newValue: number | number[]) =>
                    onRangeChange ? onRangeChange(event, newValue, name) : null
                }
                min={rangeProps?.min}
                max={rangeProps?.max}
                step={rangeProps?.step}
                marks={rangeProps && (rangeProps.customMarks || rangeProps.marks)}
                color={color}
                disabled={disabled}
            />
        </div>
    );
};
