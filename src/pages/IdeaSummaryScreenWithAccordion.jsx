import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Chip,
    Divider,
    List,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    ListItem,
    Tabs,
    Tab,
    CardContent,
    Card,
    CardActions,
} from '@mui/material';

import {
    Edit,
    Star,
    Lightbulb,
    Compare,
    ErrorOutline,
    BarChart,
    ExpandMore,
    Face,
} from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';
import EditModal from '../components/EditModal';
import { useDispatch, useSelector } from 'react-redux';
import { setIsEditModalOpen } from '../redux/silces/HomeScreenSlice';

const sidebarSteps = [
    'Step 1 Understanding',
    'Step 2 User Persona',
    'Step 3 Feature List',
    'Step 4 Swot Analysis',
    'Step 5 Product Roadmap',
];

const stepSections = [
    {
        stepTitle: 'Step 1 Understanding',
        sections: [
            {
                type: 'Problem',
                icon: <ErrorOutline />,
                description: [
                    'Lack of standardized training for retail garment store employees',
                    'Inconsistent customer service due to varying levels of employee knowledge',
                    'High turnover rates leading to frequent need for training new employees',
                ],
                tags: ['problem', 'pain point', 'issues'],
            },
            {
                type: 'Alternatives',
                icon: <Compare />,
                description: [
                    'Retail Training Apps',
                    'In-person training sessions',
                    'Online training courses',
                ],
                tags: ['similar apps', 'existing'],
            },
            {
                type: 'Solutions',
                icon: <Lightbulb />,
                description: [
                    'Provide a standardized training platform accessible via mobile devices',
                    'Offer interactive and engaging training modules',
                    'Track employee progress and performance through the app',
                ],
                tags: ['solution', 'functionality', 'features'],
            },
            {
                type: 'Key Metrics',
                icon: <BarChart />,
                description: [
                    'Number of active users',
                    'Completion rate of training modules',
                    'Employee performance improvement',
                    'Reduction in training costs',
                ],
                tags: ['performance', 'success', 'results'],
            },
            {
                type: 'Value Proposition',
                icon: <Star />,
                description: [
                    'Benefits of centralized training for all employees',
                    'Improved customer service through better-trained staff',
                    'Convenient and accessible training platform',
                ],
                tags: ['value proposition', 'benefits', 'differentiator'],
            },
        ],
    },
    {
        stepTitle: 'Step 2 User Persona',
        sections: [
            {
                type: 'Primary Users',
                icon: <Face />,
                description: [
                    'Newly hired sales associates in garment stores',
                    'Often under 25 years old and have little to no experience',
                ],
                tags: ['beginner', 'entry-level', 'primary'],
            },
            {
                type: 'Secondary Users',
                icon: <Face />,
                description: [
                    'Store managers responsible for staff training and performance',
                    'Require quick onboarding processes and reporting features',
                ],
                tags: ['manager', 'admin', 'secondary'],
            },
            {
                type: 'User Goals',
                icon: <Lightbulb />,
                description: [
                    'Learn customer handling and product knowledge quickly',
                    'Earn certifications to grow within the organization',
                ],
                tags: ['goals', 'motivation'],
            },
            {
                type: 'Pain Points',
                icon: <ErrorOutline />,
                description: [
                    'Confusing or overwhelming training materials',
                    'Inconsistent access to up-to-date resources',
                ],
                tags: ['frustrations', 'problems'],
            },
        ],
    },
    {
        stepTitle: 'Step 3 Feature List',
        sections: [
            {
                type: 'Core Features',
                icon: <Lightbulb />,
                description: [
                    'Interactive training modules with quizzes',
                    'Progress tracking dashboard for employees and managers',
                    'Certificate generation upon module completion',
                ],
                tags: ['core', 'main', 'important'],
            },
            {
                type: 'Admin Panel',
                icon: <BarChart />,
                description: [
                    'Manage content and update training materials',
                    'Monitor individual and group performance metrics',
                ],
                tags: ['admin', 'management'],
            },
            {
                type: 'Gamification',
                icon: <Star />,
                description: [
                    'Badges and leaderboards to encourage engagement',
                    'Daily challenges to retain learning habits',
                ],
                tags: ['fun', 'retention', 'motivation'],
            },
        ],
    },
    {
        stepTitle: 'Step 4 Swot Analysis',
        sections: [
            {
                type: 'Strengths',
                icon: <Star />,
                description: [
                    'Easy-to-use mobile interface',
                    'Highly scalable for different store sizes',
                    'Real-time data and insights',
                ],
                tags: ['strength', 'advantage'],
            },
            {
                type: 'Weaknesses',
                icon: <ErrorOutline />,
                description: [
                    'Initial setup time for new stores',
                    'Dependence on stable internet connectivity',
                ],
                tags: ['limitation', 'concern'],
            },
            {
                type: 'Opportunities',
                icon: <Lightbulb />,
                description: [
                    'Expansion into other retail sectors',
                    'Integration with HR systems for seamless onboarding',
                ],
                tags: ['growth', 'future'],
            },
            {
                type: 'Threats',
                icon: <Compare />,
                description: [
                    'Competition from existing learning platforms',
                    'Technological resistance from older employees',
                ],
                tags: ['risk', 'challenge'],
            },
        ],
    },
    {
        stepTitle: 'Step 5 Product Roadmap',
        sections: [
            {
                type: 'Phase 1 - MVP',
                icon: <BarChart />,
                description: [
                    'User login & onboarding flow',
                    'Basic training module creation and consumption',
                    'Performance tracking for individual users',
                ],
                tags: ['initial', 'launch'],
            },
            {
                type: 'Phase 2 - Scale',
                icon: <BarChart />,
                description: [
                    'Admin panel with analytics and content management',
                    'Role-based access control',
                    'Feedback collection from users',
                ],
                tags: ['scale', 'growth'],
            },
            {
                type: 'Phase 3 - Expansion',
                icon: <Star />,
                description: [
                    'AI-driven content recommendations',
                    'Integration with payroll and HR systems',
                    'Support for multiple languages',
                ],
                tags: ['expansion', 'future'],
            },
        ],
    },
];

const SidebarTabs = ({ currentStep = 0, setCurrentStep }) => {
    const handleChange = (event, newValue) => {
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
            }}
        >
            <Tabs
                value={currentStep}
                onChange={handleChange}
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
                {sidebarSteps.map((step, index) => (
                    <Tab key={step} label={step} />
                ))}
            </Tabs>

            <Divider sx={{ my: 1 }} />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                size="small"
                sx={{ fontSize: 12 }}
            >
                Generate Persona
            </Button>
        </Box>
    );
};

const IdeaSummaryScreenWithAccordion = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [currentStep, setCurrentStep] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const currentIdeaName = useSelector((state) => state.homeScreenReducer.currentIdeaName);
    const dispatch = useDispatch();
    useEffect(() => {
        setActiveStep(stepSections[currentStep]?.sections || []);
    }, [currentStep]);
    const { data: setData, loading: setLoading, error: setError, fetchData: setlist } = useApi("UNDERSTANDING", `${URLCONSTANTS.UNDERSTANDING}`, "POST");

    const { data: fetchedData, loading: listLoading, error: listError, fetchData: fetchlist } = useApi("UNDERSTANDINGFORGET", `${URLCONSTANTS.GET_IDEAS}${currentIdeaName}`, "GET");
    const { data: proceedData, loading: proceedLoading, error: proceedError, fetchData: fetchproceed } = useApi("fetchproceed", `${URLCONSTANTS.PROCEED}`, "POST");

    const [fetchAgenstsData, setFetchAgentsData] = React.useState([]);

    useEffect(() => {
        setFetchAgentsData(fetchedData)
    }, [fetchedData, proceedData]);

    useEffect(() => {
        setFetchAgentsData({ ...fetchAgenstsData, ...proceedData?.next_agent_output })
    }, [proceedData]);

    useEffect(() => {
        fetchlist();
    }, []);

    const handleProceed = (agentName) => {
        const agentNA = agentName.includes("_") ? agentName : `${agentName}_agent`
        fetchproceed({
            concept_name: currentIdeaName,
            current_agent: agentNA
        })
    }


    return (
        <Box sx={{ display: 'flex', padding: '0', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
                <SidebarTabs
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep} />
                {!fetchAgenstsData ? <Box mb={4}>
                    <Box sx={{ p: 2, background: 'white', borderRadius: 2 }}>
                        <Typography variant="h6">JJ</Typography>
                        <TextField
                            label="Enter your input"
                            variant="outlined"
                            size="small"
                            fullWidth
                            multiline
                            rows={4}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </Box>
                    <Button
                        title='Submit'
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={() => setlist({ description: inputValue })}
                    >Submit</Button>
                </Box> :
                    <Grid container spacing={2}>
                        {fetchAgenstsData && Object.keys(fetchAgenstsData).map((sec, idx) => {
                            const secIdentifier = fetchAgenstsData[sec];
                            console.log(secIdentifier, 'this is identifier');
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
                                                Array.isArray(items) && items.length > 0 && typeof items[0] === 'object' ?
                                                    (
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
                                                                                <Button size="small" variant="outlined" onClick={() => dispatch(setIsEditModalOpen(item.name || item.benefit || item.advantage || item.issue || item.revenue_stream || item.segment_name || item.impact || item.solution || item.strategic_positions))}>
                                                                                    Edit
                                                                                </Button>
                                                                                <Button size='small' variant="outlined" color="error">
                                                                                    Delete
                                                                                </Button>
                                                                            </CardActions>
                                                                        </Card>

                                                                        {item.key_metrics && (
                                                                            <Box mt={1} ml={2}>
                                                                                <Typography variant="subtitle2" fontWeight="bold">
                                                                                    Metric: {item.key_metrics.metric_name}
                                                                                </Typography>
                                                                                <Typography variant="body2">{item.key_metrics.description}</Typography>
                                                                            </Box>
                                                                        )}
                                                                        {Array.isArray(item.proposed_solutions) && item?.proposed_solutions.map((issueObj, index) => (
                                                                            <Box key={index}>
                                                                                <ListItem key={i} alignItems="flex-start">
                                                                                    <ListItemText
                                                                                        primary={<Typography variant="subtitle1">{issueObj.title}</Typography>}
                                                                                        secondary={<Typography variant="body2" color="text.secondary">{issueObj.description}</Typography>}
                                                                                    />
                                                                                </ListItem>
                                                                            </Box>
                                                                        ))}
                                                                        {Array.isArray(item.strategies) && item?.strategies.map((issueObj, index) => (
                                                                            <Box key={index}>
                                                                                <ListItem key={i} alignItems="flex-start">
                                                                                    <ListItemText
                                                                                        primary={<Typography variant="subtitle1">{issueObj}</Typography>}
                                                                                    />
                                                                                </ListItem>
                                                                            </Box>
                                                                        ))}
                                                                        {Array.isArray(item.related_solutions) && (
                                                                            <Box mt={1} ml={2}>
                                                                                <Typography variant="subtitle2" fontWeight="bold">
                                                                                    Related Solutions:
                                                                                </Typography>
                                                                                <Box>
                                                                                    {item.related_solutions.map((sol, idx) => (
                                                                                        <Chip
                                                                                            key={idx}
                                                                                            label={sol}
                                                                                            size="small"
                                                                                            sx={{ mr: 1, mb: 1 }}
                                                                                        />
                                                                                    ))}
                                                                                </Box>
                                                                            </Box>
                                                                        )}
                                                                        {Array.isArray(item.features) && (
                                                                            <Box mt={1} ml={2}>
                                                                                <Typography variant="subtitle2" fontWeight="bold">
                                                                                    features:
                                                                                </Typography>
                                                                                <Box>
                                                                                    {item.features.map((sol, idx) => (
                                                                                        <Chip
                                                                                            key={idx}
                                                                                            label={sol}
                                                                                            size="small"
                                                                                            sx={{ mr: 1, mb: 1 }}
                                                                                        />
                                                                                    ))}
                                                                                </Box>
                                                                            </Box>
                                                                        )}
                                                                        {Array.isArray(item.key_benefits) && (
                                                                            <Box mt={1} ml={2}>
                                                                                <Typography variant="subtitle2" fontWeight="bold">
                                                                                    features:
                                                                                </Typography>
                                                                                <Box>
                                                                                    {item.key_benefits.map((sol, idx) => (
                                                                                        <Chip
                                                                                            key={idx}
                                                                                            label={sol}
                                                                                            size="small"
                                                                                            sx={{ mr: 1, mb: 1 }}
                                                                                        />
                                                                                    ))}
                                                                                </Box>
                                                                            </Box>
                                                                        )}
                                                                        {Array.isArray(item.needs) && (
                                                                            <Box mt={1} ml={2}>
                                                                                <Typography variant="subtitle2" fontWeight="bold">
                                                                                    Needs
                                                                                </Typography>
                                                                                <Box>
                                                                                    {item.needs.map((sol, idx) => (
                                                                                        <Chip
                                                                                            key={idx}
                                                                                            label={sol}
                                                                                            size="small"
                                                                                            sx={{ mr: 1, mb: 1 }}
                                                                                        />
                                                                                    ))}
                                                                                </Box>
                                                                            </Box>
                                                                        )}
                                                                        {Array.isArray(item.pain_points) && (
                                                                            <Box mt={1} ml={2}>
                                                                                <Typography variant="subtitle2" fontWeight="bold">
                                                                                    pain_points
                                                                                </Typography>
                                                                                <Box>
                                                                                    {item.pain_points.map((sol, idx) => (
                                                                                        <Chip
                                                                                            key={idx}
                                                                                            label={sol}
                                                                                            size="small"
                                                                                            sx={{ mr: 1, mb: 1 }}
                                                                                        />
                                                                                    ))}
                                                                                </Box>
                                                                            </Box>
                                                                        )}

                                                                    </li>
                                                                ))}
                                                            </Box>
                                                        </Box>
                                                    ) : (Object.entries(items).map(([subKey, items]) => (
                                                        <Box key={subKey} mb={2}>
                                                            <Box component="ul" sx={{ pl: 2 }}>
                                                                {Array.isArray(items) ?
                                                                    items.map((item, index) => (
                                                                        <li key={index} style={{ marginBottom: '12px' }}>
                                                                            {item.name && <Card
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
                                                                                    <Typography variant="body1" fontWeight="bold">{item.name}</Typography>
                                                                                </CardContent>
                                                                                <CardActions sx={{ justifyContent: "flex-end" }}>
                                                                                    <Button size="small" variant="outlined" onClick={() => console.log("Edit button clicked")}>
                                                                                        Edit
                                                                                    </Button>
                                                                                    <Button size='small' variant="outlined" color="error">
                                                                                        Delete
                                                                                    </Button>
                                                                                </CardActions>
                                                                            </Card>}
                                                                            {item.benefit && <Card
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
                                                                                    <Typography variant="body1" fontWeight="bold">{item.benefit}</Typography>
                                                                                </CardContent>
                                                                                <CardActions sx={{ justifyContent: "flex-end" }}>
                                                                                    <Button size="small" variant="outlined" onClick={() => console.log("Edit button clicked")}>
                                                                                        Edit
                                                                                    </Button>
                                                                                    <Button size='small' variant="outlined" color="error">
                                                                                        Delete
                                                                                    </Button>
                                                                                </CardActions>
                                                                            </Card>}
                                                                            {item.description && <Typography variant="body2" color="text.secondary">{item.description}</Typography>}
                                                                            {item.stringsArray && Array.isArray(item.stringsArray) && item.stringsArray.length > 0 && (
                                                                                <ul>
                                                                                    {item.stringsArray.map((str, subIndex) => (
                                                                                        <li key={subIndex}>
                                                                                            <Typography variant="body2" color="text.secondary">{str}</Typography>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </li>
                                                                    )) :
                                                                    Object.entries(items).map(([subSubKey, subItems]) => (
                                                                        <Box key={subSubKey} mb={2}>
                                                                            <List>
                                                                                <ListItem>
                                                                                    <ListItemText primary="Description" secondary={subItems} />
                                                                                </ListItem>
                                                                                <ListItem>
                                                                                    <ListItemText primary="Difficulty to Copy" secondary={subItems.difficulty_to_copy} />
                                                                                </ListItem>
                                                                                <ListItem>
                                                                                    <ListItemText primary="Sustainability" secondary={subItems.sustainability} />
                                                                                </ListItem>
                                                                            </List>
                                                                        </Box>
                                                                    ))}
                                                            </Box>
                                                        </Box>
                                                    )))
                                            ))}

                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            )
                        })}
                    </Grid>}
            </Box>
            <EditModal />
        </Box>
    );
};

export default IdeaSummaryScreenWithAccordion;
