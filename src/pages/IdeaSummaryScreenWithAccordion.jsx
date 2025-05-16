import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tabs,
    Tab,
    CardContent,
    Card,
    CardActions,
    TextField,
} from '@mui/material';
import {
    ExpandMore
} from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';
import EditModal from '../components/EditModal';
import { useDispatch, useSelector } from 'react-redux';
import { setIsEditModalOpen } from '../redux/silces/HomeScreenSlice';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import PersonaCards from './PersonaCard';
import MoSCoWScreen from './MoSCoWScreen'
import EpicTabs from './EpicTabs';

const sidebarSteps = [
    'Understanding',
    'User Persona',
    'Feature List',
    'Product Roadmap',
];

const SidebarTabs = ({ currentStep = 0, setCurrentStep, currentIdeaName, agentName, handleProceedToNext }) => {
    const [feedback, setFeedback] = useState('');
    const [feedbackIsShown, setFeedbackIsShown] = useState(false);
    const { data: addFeedbackResponse, loading: addFeedbackLoading, error: addFeedbackError, fetchData: addFeedbackFunction } = useApi("addFeedback", `${URLCONSTANTS.ADD_FEEDBACK}`, "POST");

    const handlefeedback = () => {
        if (feedbackIsShown) {
            addFeedbackFunction({
                concept_name: currentIdeaName,
                feedback
            })
            setFeedbackIsShown(false)
        } else {
            setFeedbackIsShown(true)
        }
    }

    return (
        <Box
            sx={{
                p: 1,
                bgcolor: '#f5f5f5',
                color: '#333',
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            <Tabs
                value={currentStep}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    mb: 1,
                    '& .MuiTab-root': {
                        fontSize: 13,
                        textTransform: 'none',
                        minHeight: 36,
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        color: '#333',
                        backgroundColor: '#fff',
                        transition: 'all 0.2s ease-in-out',
                        mr: 1,
                    },
                    '& .Mui-selected': {
                        bgcolor: '#90caf9',
                        color: '#0d47a1',
                    },
                    '& .MuiTab-root:hover': {
                        backgroundColor: '#f0f0f0',
                    },
                    '& .Mui-selected:hover': {
                        backgroundColor: '#64b5f6',
                    },
                }}
            >
                {sidebarSteps.map((step) => (
                    <Tab key={step} label={step} />
                ))}
            </Tabs>
            <Divider sx={{ my: 1 }} />
            {feedbackIsShown && <TextField
                fullWidth
                name="description"
                label="Describe your feedback"
                placeholder="Highlight key features, their importance, benefits, and end goal."
                margin="dense"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
            />}
           {currentStep !== 3 && <Box sx={{
                display: 'flex',
                gap: 2
            }}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ fontSize: 12 }}
                    onClick={handlefeedback}
                >
                    Add Feedback
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ fontSize: 12 }}
                    onClick={handleProceedToNext}
                >
                    Generate {sidebarSteps[currentStep + 1]}
                </Button>
            </Box>}
        </Box>
    );
};

const IdeaSummaryScreenWithAccordion = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [currentStep, setCurrentStep] = React.useState(0);
    const [deleteDetails, setDeleteDetails] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [fetchAgenstsData, setFetchAgentsData] = React.useState([]);

    const currentIdeaName = useSelector((state) => state.homeScreenReducer.currentIdeaName);
    const dispatch = useDispatch();

    const { data: deleteData, loading: deleteLoading, error: deleteError, fetchData: deleteEntry } = useApi("UPDATEENTRY", `${URLCONSTANTS.DELETE_ENTRY + currentIdeaName}/${deleteDetails?.sec}/${deleteDetails?.id}`, "DELETE");
    const { data: fetchedData, loading: listLoading, error: listError, fetchData: fetchlist } = useApi("UNDERSTANDINGFORGET", `${URLCONSTANTS.GET_IDEAS}${currentIdeaName}`, "GET");
    const { data: proceedToNext, loading: proceedToNextLoading, error: proceedToNextError, fetchData: proceedToNextFunction } = useApi("PROCEEDTONEXT", `${URLCONSTANTS.PROCEED_TO_NEXT_AGENT}`, "POST");

    useEffect(() => {
        setFetchAgentsData(fetchedData)
    }, [fetchedData]);

    useEffect(() => {
        fetchlist();
    }, []);

    useEffect(() => {
        fetchlist();
    }, [deleteData])

    const handleDelete = (id, sec) => {
        setOpen(true);
        setDeleteDetails({ id, sec });
    }

    const handleDeleteCofirm = () => {
        setOpen(false);
        deleteEntry();
    }

    const proceedNext = () => {
        setCurrentStep(currentStep + 1 === sidebarSteps.length ? 0 : currentStep + 1);
        proceedToNextFunction({
            concept_name: currentIdeaName,
            current_agent: currentStep === 0 ? fetchAgenstsData && Object.keys(fetchAgenstsData)[Object.keys(fetchAgenstsData).length - 1].split('.')[0] : currentStep === 1 ? 'persona_agent' : currentStep === 2 ? 'features_list_agent' : 'jira_epic_agent'
        });
    }

    return (
        <Box sx={{ display: 'flex', padding: '0', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
                <SidebarTabs
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    currentIdeaName={currentIdeaName}
                    handleProceedToNext={proceedNext}
                    agentName={fetchAgenstsData && Object.keys(fetchAgenstsData)} />
                {currentStep === 0 ? <Grid container spacing={2}>
                    {fetchAgenstsData && Object.keys(fetchAgenstsData).map((sec, idx) => {
                        const secIdentifier = fetchAgenstsData[sec];
                        return (
                            <Grid item xs={12} key={idx}>
                                <Accordion expanded={idx === activeIndex} onChange={() => setActiveIndex(idx)}>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <Box display="flex" alignItems="center">
                                            {sec?.icon}
                                            <Typography variant="h6" ml={1}>
                                                {sec.split('.')[0].toUpperCase()}
                                            </Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {Object.entries(secIdentifier || {}).map(([sectionKey, items]) => (
                                            <Box key={sectionKey} mt={3}>
                                                <Box component="ul" sx={{ pl: 2 }}>
                                                    {items.map((item, i) => (
                                                        <li key={i} style={{ marginBottom: '8px' }}>
                                                            <Card
                                                                sx={{
                                                                    margin: 2,
                                                                    padding: 1,
                                                                    background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
                                                                    borderRadius: 3,
                                                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                                                    transition: "transform 0.2s, box-shadow 0.2s",
                                                                    '&:hover': {
                                                                        transform: "translateY(-5px)",
                                                                        boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)"
                                                                    }
                                                                }}>
                                                                <CardContent>
                                                                    <Typography variant="body1" fontWeight="bold">
                                                                        {item.name || item.benefit || item.advantage || item.issue || item.revenue_stream || item.segment_name || item.impact || item.solution || item.strategic_positions}
                                                                    </Typography>
                                                                    {item.description && (
                                                                        <Typography variant="body2">{item.description}</Typography>
                                                                    )}
                                                                </CardContent>
                                                                <CardActions sx={{ justifyContent: "flex-end" }}>
                                                                    <Button size="small" variant="outlined" onClick={() => dispatch(setIsEditModalOpen({ name: item.name || item.benefit || item.advantage || item.issue || item.revenue_stream || item.segment_name || item.impact || item.solution || item.strategic_positions, des: item?.description, id: item?.id, agentName: sec.split('.')[0].toUpperCase() }))}>
                                                                        Edit
                                                                    </Button>
                                                                    <Button size='small' variant="outlined" color="error" onClick={() => handleDelete(item.id, sec.split('.')[0].toUpperCase())}>
                                                                        Delete
                                                                    </Button>
                                                                </CardActions>
                                                            </Card>
                                                        </li>
                                                    ))}
                                                </Box>
                                            </Box>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        )
                    })}
                </Grid> : currentStep === 1 ? (
                    <Grid container spacing={2}><PersonaCards currentIdeaName={currentIdeaName} />
                    </Grid>
                ) : currentStep === 2 ? (<Grid>
                    <MoSCoWScreen currentIdeaName={currentIdeaName} />
                </Grid>) :
                    <Grid>
                        <EpicTabs currentIdeaName={currentIdeaName} />
                    </Grid>
                }
            </Box>
            <EditModal />
            <ConfirmDeleteModal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDeleteCofirm}
                itemName={deleteDetails} />
        </Box>
    );
};

export default IdeaSummaryScreenWithAccordion;
