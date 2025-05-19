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
    setEditTextForProduct,
    setProductEditModal
} from "../redux/silces/HomeScreenSlice";

const ProductRoadmapEditModal = ({ handleUpdateEpic }) => {
    const dispatch = useDispatch();
    const isEditModalOpen = useSelector(
        (state) => state.homeScreenReducer.productEditModalOpen
    );
    const editData = useSelector((state) => state.homeScreenReducer.productEditModalData);

    const handleClose = () => {
        dispatch(setProductEditModal());
    };

    const handleSubmit = () => {
        handleUpdateEpic()
        handleClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setEditTextForProduct({ key: name, value }));
    };

    return (
        <Dialog open={isEditModalOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Product</DialogTitle>
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
                    multiline
                    minRows={3}
                    maxRows={10}
                    value={editData?.des || ""}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductRoadmapEditModal;
