import { useState } from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFeedbackOpen } from '../redux/silces/HomeScreenSlice';
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';
import mammoth from "mammoth";

const FeedbackModal = ({ handleEditFeature }) => {
    const dispatch = useDispatch();
    const feedbackModalOpen = useSelector((state) => state.homeScreenReducer.isFeedbackOpen);
    const currentIdeaName = useSelector((state) => state.homeScreenReducer.currentIdeaName);
    const [feedback, setFeedback] = useState('');

    const { data: addFeedbackResponse, loading: addFeedbackLoading, error: addFeedbackError, fetchData: addFeedbackFunction } = useApi("addFeedback", `${URLCONSTANTS.ADD_FEEDBACK}`, "POST");

    const handleChange = (e) => {
        setFeedback(e.target.value);
    };

    const onClose = () => {
        dispatch(setIsFeedbackOpen());
        setFeedback('')
    }

    const handleSave = () => {
        addFeedbackFunction({
            concept_name: currentIdeaName,
            feedback
        })
        onClose();
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const fileType = file.name.split('.').pop().toLowerCase();

        try {
            if (fileType === 'txt') {
                const text = await file.text();
                setFeedback(text)
            } else if (fileType === 'docx') {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer });
                setFeedback(result.value);
            } else {
                console.warn("Unsupported file type:", fileType);
            }
        } catch (error) {
            console.error("Error processing file:", error);
        }
    };

    return (
        <Dialog open={feedbackModalOpen} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Feedback</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    multiline
                    minRows={3}
                    name="description"
                    label="Describe your feedback"
                    placeholder="Highlight key features, their importance, benefits, and end goal."
                    margin="dense"
                    value={feedback}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Tooltip title="Only .txt and .docx files are supported">
                    <Button
                        variant="outlined"
                        component="label"
                        color="primary"
                    >
                        Upload Doc
                        <input
                            type="file"
                            hidden
                            onChange={handleFileUpload}
                            accept=".txt,.docx"
                        />
                    </Button>
                </Tooltip>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    color="primary"
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FeedbackModal;
