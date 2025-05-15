import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    setEditText,
    setIsEditModalOpen
} from "../redux/silces/HomeScreenSlice";
import useApi from "../hooks/useApi";
import { URLCONSTANTS } from "../constants/urlConstants";

const EditModal = () => {
    const dispatch = useDispatch();
    const isEditModalOpen = useSelector(
        (state) => state.homeScreenReducer.isEditModalOpen
    );
    const editData = useSelector((state) => state.homeScreenReducer.editData);
    const currentIdeaName = useSelector(
        (state) => state.homeScreenReducer.currentIdeaName
    );

    const {
        data: updateData,
        loading: updateLoading,
        error: updateError,
        fetchData: updateEntry
    } = useApi(
        "UPDATEENTRY",
        `${URLCONSTANTS.UPDATE_ENTRY + currentIdeaName}/${editData?.agentName}/${editData?.id}`,
        "PUT"
    );

    const handleClose = () => {
        dispatch(setIsEditModalOpen());
    };

    const handleSubmit = () => {
        updateEntry({
            name: editData.name,
            description: editData.des
        });
        handleClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setEditText({ key: name, value }));
    };

    return (
        <Dialog open={isEditModalOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Content</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    fullWidth
                    value={editData?.name || ""}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    name="des"
                    fullWidth
                    value={editData?.des || ""}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={updateLoading}>
                    {updateLoading ? "Saving..." : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditModal;
