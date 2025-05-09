import { Box, Grid, Typography, Card, CardMedia, CardContent, Chip } from '@mui/material';
import useApi from '../hooks/useApi';

const newItems = [
    {
        title: 'Brainstorm an idea',
        img: 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tag: 'New'
    },
    {
        title: 'Create User Story',
        img: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QUl8ZW58MHwwfDB8fHww',
        tag: 'New'
    },
    {
        title: 'Design UI Mockups',
        img: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=600&auto=format&fit=crop&q=60',
        tag: 'Old'
    },
    {
        title: 'Research Competitors',
        img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=60',
        tag: 'New'
    }
];

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

    const { loading: listLoading, error: listError, fetchData: fetchlist } = useApi("list", `url`, "POST");

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
                Let's craft something new today !
            </Typography>
            <Grid container spacing={2}>
                {newItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card>
                            <CardMedia component="img" height="140" image={item.img} />
                            <CardContent>
                                <Chip
                                    label={item.tag}
                                    color={getTagColor(item.tag)}
                                    size="small"
                                    sx={{ mb: 1 }}
                                />
                                <Typography>{item.title}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
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
