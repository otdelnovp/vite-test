import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { useStyles } from './styles';
import { Description } from '@mui/icons-material';

interface IConfirmDialogProps {
    title: string;
    text?: string;
    confirmTitle?: string;
    closeTitle?: string;
    children?: JSX.Element | JSX.Element[]
    onConfirm: () => void
    onClose: () => void
}

const ConfirmDialog = ({ title, text, confirmTitle, closeTitle, children, onConfirm, onClose }: IConfirmDialogProps) => {
    const classes = useStyles();

    return <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="sm">
        <DialogTitle>
            <Typography variant="h1">{title}</Typography>
        </DialogTitle>
        <DialogContent>
            {children ? <>{children}</> : <Typography variant="body1">{text ? text : ""}</Typography>}
        </DialogContent>
        <DialogActions>
            <Button onClick={onConfirm} variant="contained" >
                {confirmTitle ? confirmTitle : "Ок"}
            </Button>
            <Button onClick={onClose} variant="outlined">
                {closeTitle ? closeTitle : "Отменить"}
            </Button>
        </DialogActions>
    </Dialog>

};

export default ConfirmDialog;