import React, { useEffect } from 'react';
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
import jsPDF from "jspdf";
import "jspdf-autotable";

const sidebarSteps = [
    'Idea Elaboration',
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

    const generatePDF = () => {
        const doc = new jsPDF();
        let y = 10;
        const addSection = (title, data) => {
            doc.setFontSize(16);
            doc.setTextColor("#1e88e5");
            doc.text(title, 14, y);
            y += 8;
            const columns = [
                { header: "ID", dataKey: "id" },
                { header: "Name", dataKey: "name" },
                { header: "Description", dataKey: "description" }
            ];
            doc.autoTable({
                startY: y,
                headStyles: { fillColor: "#2196f3" },
                bodyStyles: { fontSize: 10 },
                margin: { left: 14, right: 14 },
                theme: "striped",
                columns: columns,
                body: data,
                styles: { overflow: "linebreak" },
                didDrawPage: (data) => {
                    y = data.cursor.y + 10;
                }
            });
        };
        Object.entries(fetchAgenstsData).forEach(([key, value]) => {
            const title = key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());
            addSection(title, value);
        });
        doc.save("data_report.pdf");
    };

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                {currentIdeaName.replace(/_/g, ' ')}
            </Typography>
            <Box sx={{ display: 'flex', padding: 0, gap: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <SidebarTabs
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        currentIdeaName={currentIdeaName}
                        handleProceedToNext={proceedNext}
                        agentName={fetchAgenstsData && Object.keys(fetchAgenstsData)}
                    />
                    <Box sx={{ display: 'flex', justifyItems: 'end' }}>                    <IconButton
                        size="small"
                        color="primary"
                        onClick={generatePDF}
                    >
                        Download PDF
                    </IconButton></Box>
                    {currentStep === 0 ? (
                        <Grid container spacing={2}>
                            {fetchAgenstsData &&
                                Object.keys(fetchAgenstsData).map((sec, idx) => {
                                    const secIdentifier = fetchAgenstsData[sec];
                                    return Object.entries(secIdentifier || {}).map(([sectionKey, items], innerIdx) => (
                                        <Grid item xs={12} sm={6} md={4} key={`${idx}-${innerIdx}`}>
                                            <Card
                                                sx={{
                                                    height: '100%',
                                                    padding: 2,
                                                    borderRadius: 4,
                                                    boxShadow: 6,
                                                    boxSizing: 'border-box',
                                                }}
                                            >
                                                <CardContent>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            mb: 2,
                                                        }}
                                                    >
                                                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                                            {sec.replace('_agent.json', '').replace(/_/g, ' ').toUpperCase()}
                                                        </Typography>

                                                        <IconButton
                                                            onClick={() =>
                                                                dispatch(
                                                                    setIsEditModalOpen({
                                                                        taskName: sec.replace('_agent.json', '').replace(/_/g, ' ').toUpperCase(),
                                                                    })
                                                                )
                                                            }
                                                            sx={{
                                                                backgroundColor: 'white',
                                                                boxShadow: 1,
                                                                '&:hover': {
                                                                    backgroundColor: '#f5f5f5',
                                                                },
                                                            }}
                                                            size="small"
                                                            color="primary"
                                                        >
                                                            <AddIcon fontSize="medium" />
                                                        </IconButton>
                                                    </Box>
                                                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                                        {items.map((item, i) => (
                                                            <Box
                                                                key={i}
                                                                component="li"
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    mb: 1,
                                                                    pr: 1,
                                                                    px: 2,
                                                                    py: 1.5,
                                                                    borderRadius: 2,
                                                                    backgroundColor: '#f9f9f9',
                                                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight="bold"
                                                                    color="primary"
                                                                    sx={{ maxWidth: '70%' }}
                                                                >
                                                                    {item.name}
                                                                </Typography>
                                                                <Box>
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            dispatch(
                                                                                setIsEditModalOpen({
                                                                                    name: item.name,
                                                                                    id: item?.id,
                                                                                    agentName: sec.split('.')[0],
                                                                                    taskName: sec.replace('_agent.json', '').replace(/_/g, ' ').toUpperCase(),
                                                                                })
                                                                            )
                                                                        }
                                                                        sx={{
                                                                            backgroundColor: 'white',
                                                                            marginRight: '5px',
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
                                                                        onClick={() => handleDelete(item.id, sec.split('.')[0])}
                                                                        sx={{
                                                                            backgroundColor: 'white',
                                                                            boxShadow: 1,
                                                                            '&:hover': {
                                                                                backgroundColor: '#f5f5f5',
                                                                            },
                                                                        }}
                                                                        size="small"
                                                                        color="error"
                                                                    >
                                                                        <DeleteIcon fontSize="small" />
                                                                    </IconButton>
                                                                </Box>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ));
                                })}
                        </Grid>
                    ) : currentStep === 1 ? (
                        <Grid container spacing={2}>
                            <PersonaCards currentIdeaName={currentIdeaName} />
                        </Grid>
                    ) : currentStep === 2 ? (
                        <Grid>
                            <MoSCoWScreen currentIdeaName={currentIdeaName} />
                        </Grid>
                    ) : (
                        <Grid>
                            <EpicTabs currentIdeaName={currentIdeaName} />
                        </Grid>
                    )}
                </Box>
                <EditModal />
                <ConfirmDeleteModal
                    open={open}
                    onClose={() => setOpen(false)}
                    onConfirm={handleDeleteCofirm}
                    itemName={deleteDetails}
                />
            </Box>
        </Box>
    );
};

export default IdeaSummaryScreenWithAccordion;
