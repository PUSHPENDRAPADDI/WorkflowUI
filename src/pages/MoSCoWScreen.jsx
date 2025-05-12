import { useEffect, useState } from 'react';
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
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';

const tabLabels = {
    MUST_HAVE: 'Must Have 🔥',
    SHOULD_HAVE: 'Should Have ✅',
    COULD_HAVE: 'Could Have 💡',
    "WON'T_HAVE": "Won't Have 🚫"
}


const MoSCoWScreen = () => {
    const [activeTab, setActiveTab] = useState('MUST_HAVE');
    const { data: fetchedFeaturesData, loading: featuresLoading, error: FeaturesError, fetchData: fetchFeatures } = useApi("Features", `${URLCONSTANTS.FEATURES}`, "GET");

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    let key = 'features_list.json';
    const featureData = fetchedFeaturesData && fetchedFeaturesData[key] ? fetchedFeaturesData[key] : {};
    useEffect(() => {
        fetchFeatures();
    }, []);

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
                    {Object.keys(featureData).map(tab => (
                        <Tab key={tab} label={tabLabels[tab]} value={tab} />
                    ))}
                </Tabs>
            </Box>
            <Box mt={3}>
                <Grid container spacing={2}>
                    {featureData[activeTab]?.map((feature, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <Card
                                variant="outlined"
                                sx={{
                                    height: 250,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {feature.title}
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
