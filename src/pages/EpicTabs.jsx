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

    return (
        <Container maxWidth="lg" sx={{ mt: 1 }}>
            {EPICSLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Tabs
                        value={selectedTab}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {epicsData?.map((epic) => (
                            <Tab key={epic.id} label={epic.epic_title} />
                        ))}
                    </Tabs>
                    <Box>
                        <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
                            Linked Agents:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                            {epicsData && epicsData[selectedTab]?.linked_agents.map((agent, idx) => (
                                <Chip key={idx} label={agent.replace(/_/g, ' ')} color="primary" variant="outlined" />
                            ))}
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" gutterBottom>
                                User Stories
                            </Typography>
                            <Grid container spacing={2}>
                                {epicsData && epicsData[selectedTab]?.user_stories.map((story) => (
                                    <Grid item xs={12} sm={6} md={4} key={story.id}>
                                        <Card variant="outlined" sx={{ height: '100%' }}>
                                            <CardContent>
                                                <Typography variant="h6">{story.title}</Typography>
                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    {story.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePublish}
                        sx={{ mt: 2 }}
                    >
                        Publish Jira
                    </Button>
                </>
            )}
        </Container>
    );
}

export default EpicTabs;
