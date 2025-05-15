import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, MenuItem, FormGroup, FormControlLabel, Checkbox, Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCreateIdeaModalOpen } from '../redux/silces/HomeScreenSlice';
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';

const IdeaModal = () => {
    const dispatch = useDispatch();
    const { data: setIdeaData, loading: setIdeaLoading, error: setIdeaError, fetchData: fetchsetIdea } = useApi("SET_IDEAS", `http://localhost:8000/add_concept`, "POST");
    const { data: fetchedConcept, loading: conceptLoading, error: conceptError, fetchData: fetchConcept } = useApi("GET_CONCEPTS", `${URLCONSTANTS.GET_CONCEPTS}`, "GET");

    const open = useSelector((state) => state.homeScreenReducer.isCreateIdeaModalOpen);
    const [form, setForm] = useState({
        concept_name: '',
        description: '',
        industry: '',
        strategy: '',
        user_groups: [],
        business_nature: ''
    });
    useEffect(() => {
        fetchConcept();
    }, [setIdeaData]);
    
    console.log(setIdeaLoading, ' this is loading');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            user_groups: checked
                ? [...prevForm.user_groups, value]
                : prevForm.user_groups.filter((group) => group !== value),
        }));
    };

    const onClose = () => {
        dispatch(setIsCreateIdeaModalOpen());
        setForm({
            concept_name: '',
            description: '',
            industry: '',
            strategy: '',
            user_groups: [],
            business_nature: ''
        })
    };

    const handleSubmit = () => {
        console.log('Form submitted:', form);
        fetchsetIdea(form);
        onClose();
    };


    // Form validation
    const isFormValid = () => {
        return (
            form.concept_name &&
            form.description
        );
    };

    useEffect(() => {
        // Check if form is valid when any field changes
    }, [form]);

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
                        backgroundColor: 'white',
                    },
                },
            }}>
            <DialogTitle>Create New Idea</DialogTitle>
            <DialogContent dividers>
                <TextField
                    fullWidth
                    name="concept_name"
                    label="Name your idea"
                    variant="outlined"
                    margin="dense"
                    value={form.concept_name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    name="description"
                    label="Describe your idea"
                    placeholder="Highlight key features, their importance, benefits, and end goal."
                    margin="dense"
                    value={form.description}
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
                                    checked={form.user_groups.includes(group)}
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
                    name="business_nature"
                    label="Describe the nature of your business"
                    placeholder="e.g., Business to Customer, Business to Business..."
                    margin="dense"
                    value={form.business_nature}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!isFormValid() || setIdeaLoading}
                >
                    {setIdeaLoading ? 'Saving...' : 'Transform your idea'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IdeaModal;
