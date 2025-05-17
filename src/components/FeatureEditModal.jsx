import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setFeatureEditModalOpen } from '../redux/silces/HomeScreenSlice';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: '80vh',
    overflowY: 'auto',
};

const FeatureEditModal = ({ handleEditFeature }) => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.homeScreenReducer.featureEditModalOpen);
    const formDataFromReducer = useSelector((state) => state.homeScreenReducer.featureEditDetails);
    const [formData, setFormData] = useState(formDataFromReducer);

    useEffect(() => {
        setFormData(formDataFromReducer)
    }, [formDataFromReducer]);
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const onClose = () => {
        dispatch(setFeatureEditModalOpen());
    }

    const handleSave = () => {
        handleEditFeature(formData);
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Edit Feature</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <TextField
                    fullWidth
                    label="Title"
                    value={formData?.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    sx={{ mt: 2 }}
                />

                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    value={formData?.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{ mt: 3 }}
                >
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default FeatureEditModal;
