import { useEffect, useState } from 'react';
import {
    Tabs, Tab, Box, Typography, Avatar, Card, CardContent, Accordion, AccordionSummary,
    AccordionDetails, Divider, useTheme,
    CircularProgress,
    IconButton,
    Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonaEditModalOpen } from '../redux/silces/HomeScreenSlice';
import PersonaEditModal from '../components/PersonaEditModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import AddIcon from '@mui/icons-material/Add';
const users = [
    'Ash', 'Misty', 'Brock', 'Serena',
    'Naruto', 'Sasuke', 'Sakura', 'Kakashi',
    'Luffy', 'Zoro', 'Nami', 'Sanji',
    'Goku', 'Vegeta', 'Gohan', 'Trunks',
    'Itachi', 'Hinata', 'Gaara', 'Ino',
    'Eren', 'Mikasa', 'Armin', 'Levi',
    'Tanjiro', 'Nezuko', 'Inosuke', 'Zenitsu'
];

function PersonaCard({ user, handleDeletePersona, deleteDetails, setDeleteDetails, idx }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);


    const handlePersonaEdit = () => {
        dispatch(setPersonaEditModalOpen(user))
    }

    const handlePersonaDelete = () => {
        setOpen(true);
        setDeleteDetails({ id: user?.id, sec: user?.name });
    }

    return (
        <Card
            sx={{
                width: '100%',
                maxWidth: 500,
                margin: 'auto',
                mt: 4,
                borderRadius: 4,
                boxShadow: 6,
                bgcolor: theme.palette.background.default,
                overflow: 'hidden',
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="flex-end" gap={1} mb={1}>
                    <IconButton
                        onClick={handlePersonaEdit}
                        sx={{
                            backgroundColor: 'white',
                            boxShadow: 1,
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                        }}
                        size="small"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        onClick={handlePersonaDelete}
                        sx={{
                            backgroundColor: 'white',
                            boxShadow: 1,
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                            color: 'red'
                        }}
                        size="small"
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar
                        alt={user?.role}
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${users[idx]}`}
                        sx={{ width: 64, height: 64, border: `2px solid ${theme.palette.primary.main}` }}
                    />
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            {user?.role || 'N/A'}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Decision Making Power:</strong> {user?.decision_making_power} &nbsp;&nbsp;|&nbsp;&nbsp;
                    <strong>Experience Level:</strong> {user?.experience_level}
                </Typography>

                <Divider sx={{ my: 2 }} />
                {[['Pain Points', user?.pain_points], ['Motivations', user?.motivations], ['Key Solutions', user?.key_solutions]].map(([title, items]) => (
                    <Accordion key={title} elevation={0}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">{title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul style={{ paddingLeft: '1rem' }}>
                                {items?.map((item, idx) => (
                                    <li key={idx}>
                                        <Typography variant="body2">{item}</Typography>
                                    </li>
                                ))}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </CardContent>
            <ConfirmDeleteModal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDeletePersona}
                itemName={deleteDetails}
            />
        </Card>
    );
}

export default function PersonaCards({ currentIdeaName }) {
    const [deleteDetails, setDeleteDetails] = useState(null);
    const data = useSelector((state) => state.homeScreenReducer.personaEditDetails);
    const { data: fetchedPERSONAData, loading: PERSONALoading, error: PERSONAError, fetchData: fetchPERSONA } = useApi("PERSONA", `${URLCONSTANTS.GET_PARTICULAR_AGENT_RESPONSE + currentIdeaName}/persona_agent`, "GET");
    const {
        data: updatePersona,
        loading: updatePersonaLoading,
        error: updatePersonaError,
        fetchData: updateEntry
    } = useApi(
        "UPDATEPERSONA",
        `${URLCONSTANTS.UPDATE_ENTRY + currentIdeaName}/persona_agent/${data?.id}`,
        "PUT"
    );

    const { data: deletePersona, loading: deletePersonaLoading, error: deletePersonaError, fetchData: deletePersonaEntry } = useApi("UPDATEENTRY", `${URLCONSTANTS.DELETE_ENTRY + currentIdeaName}/persona_agent/${deleteDetails?.id}`, "DELETE");

    const userInfo = fetchedPERSONAData && fetchedPERSONAData.persona_agent.persona_agent;

    useEffect(() => {
        fetchPERSONA();
    }, [updatePersona, deletePersona]);

    const handleEditPersona = (formData) => {
        updateEntry(formData)
    }

    const handleDeletePersona = () => {
        deletePersonaEntry()
    }
    console.log();

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    mt: 2,
                    mb: 1,
                }}
            >
                <IconButton
                    sx={{
                        backgroundColor: 'white',
                        boxShadow: 1,
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                    size="small"
                    color='primary'
                >
                    <AddIcon fontSize='large' />
                </IconButton>
            </Box>
            {PERSONALoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <CircularProgress color="primary" />
                </Box >
            ) : (
                <Grid container spacing={2}>
                    {userInfo?.map((user, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={user.id || idx}>
                            <PersonaCard
                                user={user}
                                handleDeletePersona={handleDeletePersona}
                                deleteDetails={deleteDetails}
                                setDeleteDetails={setDeleteDetails}
                                idx={idx}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            <PersonaEditModal handleEdit={handleEditPersona} />
        </Box>
    );
}
