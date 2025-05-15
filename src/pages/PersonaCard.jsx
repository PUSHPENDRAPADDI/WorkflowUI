import { useEffect, useState } from 'react';
import {
    Tabs, Tab, Box, Typography, Avatar, Card, CardContent, Accordion, AccordionSummary,
    AccordionDetails, Divider, useTheme,
    CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';

function PersonaCard({ user }) {
    const theme = useTheme();

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
                        alt={user.role}
                        sx={{ width: 64, height: 64, border: `2px solid ${theme.palette.primary.main}` }}
                    />
                    <Box>
                        <Typography variant="h5" fontWeight="bold">{user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.role || 'N/A'}
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Decision Making Power:</strong> {user.decision_making_power} &nbsp;&nbsp;|&nbsp;&nbsp;
                    <strong>Experience Level:</strong> {user.experience_level}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Accordion elevation={0} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Pain Points</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul style={{ paddingLeft: '1rem' }}>
                            {user.pain_points?.map((point, idx) => (
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
                            {user.motivations?.map((motivation, idx) => (
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
                            {user.key_solutions?.map((solution, idx) => (
                                <li key={idx}>
                                    <Typography variant="body2">{solution}</Typography>
                                </li>
                            ))}
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    );
}

export default function PersonaCards({ currentIdeaName }) {
    const [activeTab, setActiveTab] = useState(0);
    const { data: fetchedPERSONAData, loading: PERSONALoading, error: PERSONAError, fetchData: fetchPERSONA } = useApi("PERSONA", `${URLCONSTANTS.GET_PARTICULAR_AGENT_RESPONSE + currentIdeaName}/persona_agent`, "GET");

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const userInfo = fetchedPERSONAData && fetchedPERSONAData.persona_agent.persona_agent;
    useEffect(() => {
        fetchPERSONA();
    }, []);

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
                    {userInfo && <PersonaCard user={userInfo[activeTab]} />}
                </Box>}
        </Box>
    );
}
