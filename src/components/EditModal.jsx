import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditText, setIsEditModalOpen } from "../redux/silces/HomeScreenSlice";

const EditModal = ({ item, handleSave }) => {
    const dispatch = useDispatch();
    const isEditModalOpen = useSelector((state) => state.homeScreenReducer.isEditModalOpen);
    const editData = useSelector((state) => state.homeScreenReducer.editData);

    const handleClose = () => {
        dispatch(setIsEditModalOpen());
    }
    const handleSubmit = () => {
        handleClose();
    };

    return (
        <Dialog open={isEditModalOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Content</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Content"
                    fullWidth
                    value={editData}
                    onChange={(e) => dispatch(setEditText(e.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditModal;
