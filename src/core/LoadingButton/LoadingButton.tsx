import React from 'react';
import clsx from 'clsx';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { useButtonStyles } from './styles';

export interface ILoadingButton {
    title: string;
    onClick: (event: any) => void;
    successTitle?: string;
    failureTitle?: string;
    type?: 'button' | 'reset' | 'submit';
    isAsync?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    isSuccess?: boolean;
    fullWidth?: boolean;
    className?: string;
    variant?: 'text' | 'outlined' | 'contained';
    //color?: 'inherit' | 'primary' | 'secondary' | 'default';
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
    size?: 'large' | 'medium' | 'small';
    startIcon?: any;
    endIcon?: any;
}

const LoadingButton: React.FC<ILoadingButton> = ({
    onClick,
    title,
    successTitle,
    failureTitle,
    isLoading,
    isSuccess,
    isError,
    isAsync,
    className,
    variant,
    color,
    fullWidth,
    disabled,
    size,
    startIcon,
    endIcon,
    type,
}) => {
    const classes = useButtonStyles();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: isAsync && isSuccess,
        [classes.buttonFailure]: isAsync && isError,
    });

    const buttonTitle = isError && failureTitle ? failureTitle : isSuccess && successTitle ? successTitle : title;

    const rootStyle = fullWidth ? { width: '100%' } : {};

    return (
        <div className={className || classes.root} style={rootStyle}>
            <div className={classes.wrapper} style={rootStyle}>
                <Button
                    type={type}
                    fullWidth={fullWidth}
                    variant={variant}
                    color={color}
                    className={buttonClassname}
                    disabled={disabled || isLoading}
                    onClick={onClick}
                    startIcon={startIcon}
                    endIcon={endIcon}
                    size={size}
                >
                    {buttonTitle}
                </Button>
                {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </div>
    );
};

export default LoadingButton;
