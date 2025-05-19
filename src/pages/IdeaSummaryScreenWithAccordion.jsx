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
    IconButton,
} from '@mui/material';
import {
    ExpandMore
} from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';
import EditModal from '../components/EditModal';
import { useDispatch, useSelector } from 'react-redux';
import { setIsEditModalOpen, setIsFeedbackOpen } from '../redux/silces/HomeScreenSlice';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import PersonaCards from './PersonaCard';
import MoSCoWScreen from './MoSCoWScreen'
import EpicTabs from './EpicTabs';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedbackModal from '../components/FeedbackModal';

const sidebarSteps = [
    'Understanding',
    'User Persona',
    'Feature List',
    'Product Roadmap',
];

const SidebarTabs = ({ currentStep = 0, setCurrentStep, currentIdeaName, agentName, handleProceedToNext }) => {
    const dispatch = useDispatch();

    const handlefeedback = () => {
        dispatch(setIsFeedbackOpen());
    }

    const handleTabChange = (event, newValue) => {
        setCurrentStep(newValue);
    };

    return (
        <Box
            sx={{
                p: 1,
                bgcolor: '#f5f5f5',
                color: '#333',
                borderRadius: 2,
                boxShadow: 2,
                marginBottom: '15px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 1,
                }}
            >
                <Tabs
                    value={currentStep}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
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
                    {sidebarSteps.map((step, index) => (
                        <Tab key={step} label={step} value={index} />
                    ))}
                </Tabs>
                {currentStep !== 3 && (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            flexShrink: 0,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ fontSize: 12 }}
                            onClick={handlefeedback}
                        >
                            Add Feedback
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ fontSize: 12 }}
                            onClick={handleProceedToNext}
                        >
                            Generate {sidebarSteps[currentStep + 1]}
                        </Button>
                    </Box>
                )}
            </Box>
            <FeedbackModal />
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
        <Box >
            <Typography variant="h4" component="h1" gutterBottom>{currentIdeaName}</Typography>
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
                                    <Accordion onChange={() => setActiveIndex(idx)}>
                                        <AccordionSummary expandIcon={<ExpandMore />}>
                                            <Box display="flex" alignItems="center">
                                                {sec?.icon}
                                                <Typography variant="h6" ml={1} >
                                                    {sec.replace('_agent.json', '').replace(/_/g, ' ').toUpperCase()}
                                                </Typography>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {Object.entries(secIdentifier || {}).map(([sectionKey, items]) => (
                                                <Box key={sectionKey}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'end',
                                                            alignItems: 'center',
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
                                                            <AddIcon fontSize='large'/>
                                                        </IconButton>
                                                    </Box>
                                                    <Box component="ul" sx={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: 2,
                                                        pl: 0,
                                                        listStyle: 'none',
                                                    }}>
                                                        {items.map((item, i) => (
                                                            <Card
                                                                key={i}
                                                                sx={{
                                                                    width: {
                                                                        xs: '100%',
                                                                        sm: '48%',
                                                                        md: '30%',
                                                                    },
                                                                    padding: 1,
                                                                    borderRadius: 4,
                                                                    boxShadow: 6,
                                                                }}>
                                                                <CardContent>
                                                                    <Typography variant="body1" fontWeight="bold" color='primary'>
                                                                        {item.name || item.benefit || item.advantage || item.issue || item.revenue_stream || item.segment_name || item.impact || item.solution || item.strategic_positions}
                                                                    </Typography>
                                                                    {item.description && (
                                                                        <Typography variant="body2"color="textSecondary">{item.description}</Typography>
                                                                    )}
                                                                </CardContent>
                                                                <CardActions sx={{ justifyContent: "flex-end" }}>
                                                                    <IconButton
                                                                        onClick={() => dispatch(setIsEditModalOpen({ name: item.name || item.benefit || item.advantage || item.issue || item.revenue_stream || item.segment_name || item.impact || item.solution || item.strategic_positions, des: item?.description, id: item?.id, agentName: sec.split('.')[0].toUpperCase() }))}
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
                                                                        onClick={() => handleDelete(item.id, sec.split('.')[0].toUpperCase())}
                                                                        sx={{
                                                                            backgroundColor: 'white',
                                                                            boxShadow: 1,
                                                                            '&:hover': {
                                                                                backgroundColor: '#f5f5f5',
                                                                            },
                                                                        }}
                                                                        size="small"
                                                                        color='error'
                                                                    >
                                                                        <DeleteIcon fontSize="small" />
                                                                    </IconButton>
                                                                </CardActions>
                                                            </Card>

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
        </Box>

    );
};

export default IdeaSummaryScreenWithAccordion;
