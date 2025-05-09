import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, MenuItem, FormGroup, FormControlLabel, Checkbox, Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCreateIdeaModalOpen } from '../redux/silces/HomeScreenSlice';

const IdeaModal = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.homeScreenReducer.isCreateIdeaModalOpen);
    const [form, setForm] = useState({
        ideaName: '',
        ideaDesc: '',
        industry: '',
        strategy: '',
        userGroups: [],
        businessNature: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            userGroups: checked
                ? [...prevForm.userGroups, value]
                : prevForm.userGroups.filter((group) => group !== value),
        }));
    };

    const onClose = () => {
        dispatch(setIsCreateIdeaModalOpen());

    }
    const handleSubmit = () => {
        console.log('Submitting form:', form);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        minHeight: '98vh', 
                    },
                },
            }}>
            <DialogTitle>Create New Idea</DialogTitle>
            <DialogContent dividers>
                <TextField
                    fullWidth
                    name="ideaName"
                    label="Name your idea"
                    variant="outlined"
                    margin="dense"
                    value={form.ideaName}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    name="ideaDesc"
                    label="Describe your idea"
                    placeholder="Highlight key features, their importance, benefits, and end goal."
                    margin="dense"
                    value={form.ideaDesc}
                    onChange={handleChange}
                />
                <TextField
                    select
                    fullWidth
                    name="industry"
                    label="Select the industry"
                    margin="dense"
                    value={form.industry}
                    onChange={handleChange}
                >
                    {['Education', 'Healthcare', 'Finance', 'Technology'].map((industry) => (
                        <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    fullWidth
                    name="strategy"
                    label="Choose your strategy"
                    margin="dense"
                    value={form.strategy}
                    onChange={handleChange}
                >
                    {['B2B', 'B2C', 'Freemium', 'Subscription', 'Ad-based'].map((strategy) => (
                        <MenuItem key={strategy} value={strategy}>{strategy}</MenuItem>
                    ))}
                </TextField>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>Select user groups</Typography>
                <FormGroup row>
                    {['Business Users', 'End Consumers', 'Technical Users', 'Creative Users', 'Government Users'].map((group) => (
                        <FormControlLabel
                            key={group}
                            control={
                                <Checkbox
                                    value={group}
                                    checked={form.userGroups.includes(group)}
                                    onChange={handleCheckboxChange}
                                />
                            }
                            label={group}
                        />
                    ))}
                </FormGroup>
                <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    name="businessNature"
                    label="Describe the nature of your business"
                    placeholder="e.g., Business to Customer, Business to Business..."
                    margin="dense"
                    value={form.businessNature}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Transform your idea
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IdeaModal;
