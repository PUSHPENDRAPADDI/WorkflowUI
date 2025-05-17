import { useEffect, useState } from 'react';
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
import { setPersonaEditModalOpen } from '../redux/silces/HomeScreenSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '95vh',
  overflowY: 'auto'
};

const PersonaEditModal = ({ handleEdit }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.homeScreenReducer.personaEditModalOpen);
  const data = useSelector((state) => state.homeScreenReducer.personaEditDetails);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(data)
  }, [data]);
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: updatedArray }));
  };

  const handleSave = () => {
    handleEdit(formData);
    onClose();
  };

  const onClose = () => {
    dispatch(setPersonaEditModalOpen());
  }

  if (!formData) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Edit Persona</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
        <TextField
          autoFocus
          fullWidth
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          autoFocus
          fullWidth
          label="Role"
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Decision Making Power"
          value={formData.decision_making_power}
          onChange={(e) => handleChange('decision_making_power', e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Experience Level"
          value={formData.experience_level}
          onChange={(e) => handleChange('experience_level', e.target.value)}
          sx={{ mt: 2 }}
        />

        {['pain_points', 'motivations', 'key_solutions'].map((field) => (
          <Box key={field} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>{field?.replace(/_/g, ' ')?.toUpperCase()}</Typography>
            {formData && formData[field]?.map((item, index) => (
              <TextField
                key={index}
                fullWidth
                value={item}
                onChange={(e) => handleArrayChange(field, index, e.target.value)}
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        ))}

        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 3 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default PersonaEditModal;
