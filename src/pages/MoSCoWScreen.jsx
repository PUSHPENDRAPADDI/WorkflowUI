import React, { useState } from 'react';
import {
    Tabs,
    Tab,
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Grid
} from '@mui/material';

const featureData = {
    MUST_HAVE: [
        {
            feature_name: 'User Interface Redesign',
            description: 'Implement a clean, user-friendly interface that adapts to user behavior, reducing complexity and improving navigation.',
            labels: ['UI/UX', 'Design', 'User Experience']
        },
        {
            feature_name: 'Real-Time Performance Monitoring',
            description: 'Implement backend optimizations for real-time monitoring to ensure quick response times and reduce lag.',
            labels: ['Performance', 'Backend', 'Optimization']
        },
        {
            feature_name: 'Cross-Platform Synchronization',
            description: 'Ensure the app can seamlessly sync across various devices and operating systems.',
            labels: ['Integration', 'Cross-Platform', 'Synchronization']
        },
        {
            feature_name: 'Error Tracking and Crash Reporting',
            description: 'Enhance app stability with efficient error tracking and automated crash reporting systems.',
            labels: ['Stability', 'Error Tracking', 'Reliability']
        },
        {
            feature_name: 'AI-Powered Customer Support',
            description: 'Deploy AI-driven support systems for 24/7 assistance with tiered support options for complex issues.',
            labels: ['Support', 'AI', 'Customer Service']
        }
    ],
    SHOULD_HAVE: [
        {
            feature_name: 'Low-Power Mode',
            description: 'Implement energy-efficient algorithms to ensure minimized battery consumption for prolonged mobile use.',
            labels: ['Energy Efficiency', 'Battery', 'Sustainability']
        },
        {
            feature_name: 'User Data Control Dashboard',
            description: 'Provide users control over their data, reinforcing privacy measures with clear settings.',
            labels: ['Privacy', 'Data Management', 'User Control']
        },
        {
            feature_name: 'Responsive Design',
            description: 'Ensure user interface adjusts seamlessly to various screen sizes for consistent experience.',
            labels: ['UI/UX', 'Responsive', 'Design']
        }
    ],
    COULD_HAVE: [
        {
            feature_name: 'Customizable Themes and Layouts',
            description: 'Allow users to tailor the app interface with themes and layout customization.',
            labels: ['Customization', 'UI/UX', 'Design']
        },
        {
            feature_name: 'User Community Forums',
            description: 'Create platforms for user interactions and peer support, fostering a community around the app.',
            labels: ['Community', 'Support', 'Engagement']
        },
        {
            feature_name: 'API for Third-Party Integrations',
            description: 'Offer robust API access for enhanced third-party integration.',
            labels: ['Integration', 'API', 'Flexibility']
        }
    ],
    WONT_HAVE: [
        {
            feature_name: 'Built-in Advanced Analytics',
            description: 'Develop comprehensive analytics tools within the app, deferred for future updates.',
            labels: ['Analytics', 'Data', 'Advanced Features']
        }
    ]
};

const tabLabels = [
    { key: 'MUST_HAVE', label: 'Must Have 🔥' },
    { key: 'SHOULD_HAVE', label: 'Should Have ✅' },
    { key: 'COULD_HAVE', label: 'Could Have 💡' },
    { key: 'WONT_HAVE', label: "Won't Have 🚫" }
];

const MoSCoWScreen = () => {
    const [activeTab, setActiveTab] = useState('MUST_HAVE');

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box p={2}>
            <Box p={2}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                        backgroundColor: '#f5f7fa',
                        borderRadius: 2,
                        boxShadow: 2,
                        px: 2,
                        '& .MuiTab-root': {
                            fontWeight: 'bold',
                            textTransform: 'none',
                            mx: 1,
                            borderRadius: 1,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#e3f2fd',
                            }
                        },
                        '& .Mui-selected': {
                            color: '#1976d2 !important',
                            backgroundColor: '#e3f2fd',
                        }
                    }}
                >
                    {tabLabels.map(tab => (
                        <Tab key={tab.key} label={tab.label} value={tab.key} />
                    ))}
                </Tabs>
            </Box>
            <Box mt={3}>
                <Grid container spacing={2}>
                    {featureData[activeTab]?.map((feature, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {feature.feature_name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {feature.description}
                                    </Typography>
                                    <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                                        {feature.labels.map((label, i) => (
                                            <Chip key={i} label={label} size="small" />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default MoSCoWScreen;
