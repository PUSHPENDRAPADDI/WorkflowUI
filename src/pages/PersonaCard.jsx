import { useEffect, useState } from 'react';
import {
    Tabs, Tab, Box, Typography, Avatar, Card, CardContent, Accordion, AccordionSummary,
    AccordionDetails, Divider, useTheme,
    CircularProgress,
    IconButton
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

function PersonaCard({ user, handleDeletePersona, deleteDetails, setDeleteDetails }) {
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
        <Box position="relative">
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 700,
                    margin: 'auto',
                    mt: 4,
                    borderRadius: 4,
                    boxShadow: 6,
                    bgcolor: theme.palette.background.default,
                    overflow: 'hidden',
                }}
            >
                <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Avatar
                            alt={user?.role}
                            sx={{ width: 64, height: 64, border: `2px solid ${theme.palette.primary.main}` }}
                        />
                        <Box>
                            <Typography variant="h5" fontWeight="bold">{user?.name}</Typography>
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

                    <Accordion elevation={0} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Pain Points</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul style={{ paddingLeft: '1rem' }}>
                                {user?.pain_points?.map((point, idx) => (
                                    <li key={idx}>
                                        <Typography variant="body2">{point}</Typography>
                                    </li>
                                ))}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion elevation={0}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Motivations</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul style={{ paddingLeft: '1rem' }}>
                                {user?.motivations?.map((motivation, idx) => (
                                    <li key={idx}>
                                        <Typography variant="body2">{motivation}</Typography>
                                    </li>
                                ))}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion elevation={0}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Key Solutions</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul style={{ paddingLeft: '1rem' }}>
                                {user?.key_solutions?.map((solution, idx) => (
                                    <li key={idx}>
                                        <Typography variant="body2">{solution}</Typography>
                                    </li>
                                ))}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
            <IconButton
                onClick={handlePersonaEdit}
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 330,
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
                    position: 'absolute',
                    top: 12,
                    right: 290,
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
            <ConfirmDeleteModal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDeletePersona}
                itemName={deleteDetails} />
        </Box>
    );
}

export default function PersonaCards({ currentIdeaName }) {
    const [activeTab, setActiveTab] = useState(0);
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

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

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
    console.log(userInfo, 'This is info');

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={activeTab}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                centered
                TabIndicatorProps={{
                    sx: {
                        height: 4,
                        borderRadius: 2,
                    }
                }}
                sx={{
                    px: 2,
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        minWidth: 120,
                        px: 1,
                        py: 0.5,
                        borderRadius: 2,
                        transition: '0.3s',
                        '&:hover': {
                            // bgcolor: alpha(theme.palette.primary.main, 0.1),
                        }
                    },
                    '& .Mui-selected': {
                        // bgcolor: alpha(theme.palette.primary.main, 0.15),
                    }
                }}
            >
                {userInfo && userInfo.map((user, idx) => (
                    <Tab
                        key={idx}
                        label={user?.role}
                        icon={<Avatar src='https://images.unsplash.com/photo-1670202602615-ec8ee6c2ea7a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1pbmlvbnN8ZW58MHx8MHx8fDA%3D' sx={{ width: 32, height: 32 }} />}
                        iconPosition="start"
                    />
                ))}
            </Tabs>
            {PERSONALoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <CircularProgress color="primary" />
                </Box >
            ) :
                <Box sx={{
                    bgcolor: 'white',

                }}>
                    {userInfo && userInfo?.length > 0 && <PersonaCard user={userInfo[activeTab]} handleDeletePersona={handleDeletePersona} deleteDetails={deleteDetails} setDeleteDetails={setDeleteDetails} />}
                </Box>}
            <PersonaEditModal handleEdit={handleEditPersona} />
        </Box>
    );
}
