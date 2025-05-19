import React, { useEffect, useState } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Card,
    CardContent,
    Grid,
    Container,
    Chip,
    CircularProgress,
    Button,
} from '@mui/material';
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';


function EpicTabs({ currentIdeaName }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [epicsData, setEpicsData] = useState([])
    const { data: fetchedEPICSData, loading: EPICSLoading, error: EPICSError, fetchData: fetchEPICS } = useApi("EPICS", `${URLCONSTANTS.GET_PARTICULAR_AGENT_RESPONSE + currentIdeaName}/jira_epic_agent`, "GET");
    const { data: publishJiraData, loading: publishJiraLoading, error: publishJiraError, fetchData: publishJiraEPICS } = useApi("publishJira", `${URLCONSTANTS.PUBLISHJIRA + currentIdeaName}`, "POST");


    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handlePublish = () => {
        publishJiraEPICS();
    }

    useEffect(() => {
        setEpicsData(fetchedEPICSData?.jira_epic_agent?.jira_epic_agent)
    }, [fetchedEPICSData]);

    useEffect(() => {
        fetchEPICS()
    }, []);
    console.log(epicsData, 'This ');

    return (
        <Container maxWidth="lg" sx={{ mt: 1 }}>
            {EPICSLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            justifyContent: 'flex-start',
                        }}
                    >
                        {epicsData?.map((epic, index) => (
                            <Card
                                key={index}
                                variant="outlined"
                                sx={{
                                    width: '32%',
                                    height: '350px',
                                    padding: 1,
                                    borderRadius: 3,
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    '&:hover': {
                                        transform: "translateY(-5px)",
                                        boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)"
                                    },
                                    '@media (max-width: 900px)': {
                                        width: '48%',
                                    },
                                    '@media (max-width: 600px)': {
                                        width: '100%',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" color='primary'>{epic.epic_title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {epic.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePublish}
                        sx={{ mt: 2, position: 'relative' }}
                        disabled={publishJiraLoading}
                    >
                        Publish Jira
                        {publishJiraLoading && (
                            <CircularProgress
                                size={20}
                                color="inherit"
                                sx={{
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                }}
                            />
                        )}
                    </Button>
                </>
            )}
        </Container>
    );
}

export default EpicTabs;
