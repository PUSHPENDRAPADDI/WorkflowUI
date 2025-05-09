import React, { useState } from 'react';
import {
    Tabs, Tab, Box, Typography, Avatar, Card, CardContent, Accordion, AccordionSummary,
    AccordionDetails, Divider, useTheme, alpha
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const userData = [
    {
        "user_role": "Tech-Savvy Professional",
        "role_details": {
            "role": "End User",
            "DMP": "High",
            "level": "Mid-level to Senior-level",
            "pain_points": [
                "Limited functionality and integration",
                "Slow performance",
                "Privacy concerns"
            ]
        },
        "persona_insights": {
            "demographics": {
                "age_range": "25-45",
                "education": "Bachelor's degree or higher",
                "occupation": "IT professionals, engineers, tech entrepreneurs"
            },
            "psychographics": {
                "tech_inclination": "High",
                "values": ["Efficiency", "Integration", "Customization"]
            },
            "needs": [
                "Advanced functionalities with seamless integration",
                "Reliable and fast performance",
                "Sophisticated privacy and security measures"
            ]
        },
        "deviceUsage": {
            "Laptop": 6,
            "Tablet": 3,
            "Phone": 4
        },
        "image": "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&auto=format&fit=crop&q=60"
    },
    {
        "user_role": "Field Sales Representative",
        "role_details": {
            "role": "Mobile Workforce",
            "DMP": "Medium",
            "level": "Entry-level to Mid-level",
            "pain_points": [
                "Poor connectivity in remote areas",
                "Manual data entry burden",
                "Limited offline access to tools"
            ]
        },
        "persona_insights": {
            "demographics": {
                "age_range": "22-40",
                "education": "Diploma or Bachelor's degree",
                "occupation": "Sales executives, territory managers"
            },
            "psychographics": {
                "tech_inclination": "Medium",
                "values": ["Mobility", "Simplicity", "Responsiveness"]
            },
            "needs": [
                "Mobile-first tools with offline capabilities",
                "Easy data capture and sync",
                "Fast-loading apps with minimal clicks"
            ]
        },
        "deviceUsage": {
            "Laptop": 2,
            "Tablet": 4,
            "Phone": 6
        },
        "image": "https://images.unsplash.com/photo-1670202602615-ec8ee6c2ea7a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1pbmlvbnN8ZW58MHx8MHx8fDA%3D"
    },
    {
        "user_role": "Executive Leader",
        "role_details": {
            "role": "Decision Maker",
            "DMP": "High",
            "level": "Senior-level to C-suite",
            "pain_points": [
                "Lack of high-level insights",
                "Time-consuming reporting processes",
                "Difficulty aligning teams with strategy"
            ]
        },
        "persona_insights": {
            "demographics": {
                "age_range": "40-60",
                "education": "MBA or equivalent",
                "occupation": "CEOs, CTOs, Directors"
            },
            "psychographics": {
                "tech_inclination": "Medium to High",
                "values": ["Strategic Alignment", "ROI", "Innovation"]
            },
            "needs": [
                "Dashboard-style overviews with KPIs",
                "Real-time data for quick decisions",
                "Tools to enhance strategic planning and communication"
            ]
        },
        "deviceUsage": {
            "Laptop": 5,
            "Tablet": 2,
            "Phone": 5
        },
        "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

function PersonaCard({ user }) {
    const theme = useTheme();
    const deviceData = Object.entries(user.deviceUsage || {}).map(([device, hours]) => ({
        device,
        hours
    }));

    return (
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
                        src={user.image}
                        alt={user.user_role}
                        sx={{ width: 64, height: 64, border: `2px solid ${theme.palette.primary.main}` }}
                    />
                    <Box>
                        <Typography variant="h5" fontWeight="bold">{user.user_role}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.persona_insights?.demographics?.occupation || 'N/A'}
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Role:</strong> {user.role_details?.role} &nbsp;&nbsp;|&nbsp;&nbsp;
                    <strong>DMP:</strong> {user.role_details?.DMP} &nbsp;&nbsp;|&nbsp;&nbsp;
                    <strong>Level:</strong> {user.role_details?.level || 'N/A'}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Accordion elevation={0}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Pain Points</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul style={{ paddingLeft: '1rem' }}>
                            {user.role_details?.pain_points?.map((point, idx) => (
                                <li key={idx}>
                                    <Typography variant="body2">{point}</Typography>
                                </li>
                            ))}
                        </ul>
                    </AccordionDetails>
                </Accordion>

                <Accordion elevation={0}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Needs</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul style={{ paddingLeft: '1rem' }}>
                            {user.persona_insights?.needs?.map((need, idx) => (
                                <li key={idx}>
                                    <Typography variant="body2">{need}</Typography>
                                </li>
                            ))}
                        </ul>
                    </AccordionDetails>
                </Accordion>

                <Accordion elevation={0}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Values</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul style={{ paddingLeft: '1rem' }}>
                            {user.persona_insights?.psychographics?.values?.map((value, idx) => (
                                <li key={idx}>
                                    <Typography variant="body2">{value}</Typography>
                                </li>
                            ))}
                        </ul>
                    </AccordionDetails>
                </Accordion>

                <Divider sx={{ my: 3 }} />
                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        Behavioral Insights
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Average daily device usage (hours)
                    </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={deviceData} barSize={20}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="device" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="hours"
                                fill={theme.palette.primary.main}
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}

export default function PersonaCards() {
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: theme.palette.background.paper }}>
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
                        bgcolor: theme.palette.primary.main,
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
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                        }
                    },
                    '& .Mui-selected': {
                        bgcolor: alpha(theme.palette.primary.main, 0.15),
                    }
                }}
            >
                {userData.map((user, idx) => (
                    <Tab
                        key={idx}
                        label={user.user_role}
                        icon={<Avatar src={user.image} sx={{ width: 32, height: 32 }} />}
                        iconPosition="start"
                    />
                ))}
            </Tabs>
            <Divider sx={{ my: 2, mx: 4 }} />
            <Box>
                <PersonaCard user={userData[activeTab]} />
            </Box>
        </Box>
    );
}
