import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Chip,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';

import {
    Delete,
    Edit,
    Star,
    Lightbulb,
    Compare,
    ErrorOutline,
    BarChart,
    ExpandMore,
    Face,
} from '@mui/icons-material';

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


const SidebarSteps = ({ currentStep = 0, setCurrentStep }) => (
    <Box
        sx={{
            width: 200,
            maxWidth: 200,
            minWidth: 200,
            p: 1,
            bgcolor: '#f5f5f5',
            color: '#333',
            borderRadius: 2,
            boxShadow: 2,
            height: '100%',
        }}
    >
        <List dense disablePadding>
            {sidebarSteps.map((step, index) => (
                <ListItemButton
                    key={step}
                    selected={currentStep === index}
                    sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        py: 0.5,
                        px: 1,
                        minHeight: 36,
                        bgcolor: currentStep === index ? '#90caf9' : '#ffffff',
                        color: currentStep === index ? '#0d47a1' : '#333',
                        '&:hover': {
                            bgcolor: currentStep === index ? '#64b5f6' : '#f0f0f0',
                        },
                        transition: 'all 0.2s ease-in-out',
                    }}
                    onClick={() => setCurrentStep(index)}
                >
                    <ListItemText
                        primary={step}
                        primaryTypographyProps={{ fontSize: 13 }}
                    />
                </ListItemButton>
            ))}
        </List>
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

const IdeaSummaryScreenWithAccordion = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [currentStep, setCurrentStep] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState([]);

    useEffect(() => {
        setActiveStep(stepSections[currentStep]?.sections || []);
    }, [currentStep]);

    return (
        <Box sx={{ display: 'flex', padding: '0', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Box mb={4}>
                    <Box sx={{ p: 2, background: '#E3F2FD', borderRadius: 2 }}>
                        <Typography variant="h6">JJ</Typography>
                        <Typography variant="subtitle1">
                            A mobile app for training employees of a retail garment store
                        </Typography>
                    </Box>
                </Box>
                <Grid container spacing={2}>
                    {activeStep.map((sec, idx) => (
                        <Grid item xs={12} key={idx}>
                            <Accordion expanded={idx === activeIndex} onChange={() => setActiveIndex(idx)}>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Box display="flex" alignItems="center">
                                        {sec.icon}
                                        <Typography variant="h6" ml={1}>
                                            {sec.type}
                                        </Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box component="ul" sx={{ pl: 2 }}>
                                        {sec.description.map((point, i) => (
                                            <li key={i}>
                                                <Typography variant="body2">{point}</Typography>
                                            </li>
                                        ))}
                                    </Box>
                                    <Box mt={2}>
                                        {sec.tags.map((tag) => (
                                            <Chip key={tag} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />
                                        ))}
                                    </Box>
                                    <Box mt={2} display="flex" justifyContent="space-between">
                                        <Button variant="outlined" startIcon={<Edit />}>
                                            Edit
                                        </Button>
                                        <Button variant="outlined" color="error" startIcon={<Delete />}>
                                            Delete
                                        </Button>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <SidebarSteps
                currentStep={currentStep}
                setCurrentStep={setCurrentStep} />
        </Box>
    );
};

export default IdeaSummaryScreenWithAccordion;
