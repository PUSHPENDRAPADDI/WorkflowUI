import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, MenuItem, FormGroup, FormControlLabel, Checkbox, Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeScreenLoader, setIsCreateIdeaModalOpen } from '../redux/silces/HomeScreenSlice';
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';

const IdeaModal = () => {
    const dispatch = useDispatch();
    const { data: setIdeaData, loading: setIdeaLoading, error: setIdeaError, fetchData: fetchsetIdea } = useApi("SET_IDEAS", `http://localhost:8000/add_concept`, "POST");
    const { data: fetchedConcept, loading: conceptLoading, error: conceptError, fetchData: fetchConcept } = useApi("GET_CONCEPTS", `${URLCONSTANTS.GET_CONCEPTS}`, "GET");

    const open = useSelector((state) => state.homeScreenReducer.isCreateIdeaModalOpen);
    const [form, setForm] = useState({
        concept_name: '',
        description: ''
    });
    useEffect(() => {
        fetchConcept();
    }, [setIdeaData]);

    useEffect(() => {
        dispatch(setHomeScreenLoader(setIdeaLoading))
    }, [setIdeaLoading]);

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
        })
    };

    const handleSubmit = () => {
        fetchsetIdea(form);
        onClose();
    };

    const isFormValid = () => {
        return (
            form.concept_name &&
            form.description
        );
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
                        minHeight: '60vh',
                        backgroundColor: 'white',
                    },
                },
            }}>
            <DialogTitle>Create New Concept</DialogTitle>
            <DialogContent dividers>
                <TextField
                    fullWidth
                    name="concept_name"
                    label="Name your Concept"
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
                    label="Describe your Concept"
                    placeholder="Highlight key features, their importance, benefits, and end goal."
                    margin="dense"
                    value={form.description}
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
                    {setIdeaLoading ? 'Saving...' : 'Transform your Concept'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IdeaModal;
