import { Box, Grid, Typography, Card, CardMedia, CardContent, Chip, CircularProgress } from '@mui/material';
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { setIdeaName, setIsCreateIdeaModalOpen } from '../redux/silces/HomeScreenSlice';
import { useNavigate } from 'react-router-dom';

const recentItems = [
    {
        title: 'JJ',
        img: 'https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QUl8ZW58MHwwfDB8fHww',
        subtitle: 'Brainstormer',
        status: 'Done',
    },
    {
        title: 'Design Kit',
        img: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=600&auto=format&fit=crop&q=60',
        subtitle: 'Figma Team',
        status: 'In Progress',
    },
    {
        title: 'Meeting Notes',
        img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60',
        subtitle: 'Team Sync',
        status: 'Pending',
    },
    {
        title: 'Wireframe Updates',
        img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=60',
        subtitle: 'UX Designer',
        status: 'Done',
    },
    {
        title: 'API Contract',
        img: 'https://media.istockphoto.com/id/2188818713/photo/speed-lines-trail-from-night-city-lens-effect-technology-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=ooEhNlv-Xx1VUdYUVAj3ufNhqMswpLZ5224hrixaa4g=',
        subtitle: 'Backend Team',
        status: 'In Review',
    }
];

const getTagColor = (tag) => {
    switch (tag) {
        case 'New':
            return 'primary';
        case 'Old':
            return 'secondary';
        case 'In Review':
            return 'warning';
        case 'Completed':
        case 'Done':
            return 'success';
        case 'In Progress':
            return 'info';
        case 'Pending':
            return 'error';
        default:
            return 'default';
    }
};

const Dashboard = () => {
    const { data: fetchedConcept, loading: conceptLoading, error: conceptError, fetchData: fetchConcept } = useApi("GET_CONCEPTS", `${URLCONSTANTS.GET_CONCEPTS}`, "GET");
    const isLoading = useSelector((state) => state.homeScreenReducer.homeScreenLoader);
    const navigate = useNavigate();

    useEffect(() => {
        fetchConcept();
    }, []);

    const dispatch = useDispatch();

    const handleNavigate = (name) => {
        dispatch(setIdeaName(name))
        navigate('/ideaSummaryScreen')
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
                Let's craft something new today !
            </Typography>
            <Grid container spacing={2}>
                {fetchedConcept?.projects && fetchedConcept?.projects.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} onClick={() => handleNavigate(item.name)}>
                        <Card>
                            <CardMedia component="img" height="140" image={'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QUl8ZW58MHwwfDB8fHww'} />
                            <CardContent>
                                <Chip
                                    label='New'
                                    color='primary'
                                    size="small"
                                    sx={{ mb: 1 }}
                                />
                                <Typography>{item.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 2,
                            border: '1px solid #90caf9',
                            borderRadius: 2,
                            boxShadow: 3,
                            textAlign: 'center',
                            color: '#1976d2',
                            transition: '0.3s',
                            '&:hover': {
                                backgroundColor: '#e3f2fd',
                                boxShadow: 6,
                                cursor: 'pointer',
                            },
                        }}
                        onClick={() => dispatch(setIsCreateIdeaModalOpen())}
                    >
                        {isLoading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress color="primary" />
                            </Box>
                        ) : (<> <AddIcon sx={{ fontSize: 40 }} />
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Add New
                            </Typography>
                        </>)}
                    </Card>
                </Grid>
            </Grid>
            <Typography variant="h6" color="primary" sx={{ mt: 4 }} gutterBottom>
                Recent creations
            </Typography>
            <Grid container spacing={2}>
                {recentItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card>
                            <CardMedia component="img" height="140" image={item.img} />
                            <CardContent>
                                <Typography fontWeight="bold">{item.title}</Typography>
                                <Typography variant="body2">{item.subtitle}</Typography>
                                <Chip
                                    label={item.status}
                                    color={getTagColor(item.status)}
                                    size="small"
                                    sx={{ mt: 1 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
