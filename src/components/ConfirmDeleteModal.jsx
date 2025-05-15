import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

const ConfirmDeleteModal = ({
    open,
    onClose,
    onConfirm,
    itemName = 'this item'
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete {itemName?.sec} This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} variant="contained" color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteModal;
