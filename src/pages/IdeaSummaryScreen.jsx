import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Delete,
  Edit,
  Star,
  Lightbulb,
  Compare,
  ErrorOutline,
  BarChart,
} from '@mui/icons-material';

const sidebarSteps = [
  'Step 1 Understanding',
  'Step 2 User Persona',
  'Step 3 Feature List',
  'Step 4 Swot Analysis',
  'Step 5 Product Roadmap',
];

const sections = [
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
];

const SidebarSteps = ({ activeIndex = 1 }) => (
  <Box
    sx={{
      width: 240,
      p: 2,
      bgcolor: '#f5f5f5',
      color: '#333',
      borderRadius: 2,
      boxShadow: 2,
      height: "100%"
    }}
  >
    <List disablePadding>
      {sidebarSteps.map((step, index) => (
        <ListItemButton
          key={step}
          selected={activeIndex === index}
          sx={{
            borderRadius: 1,
            mb: 1,
            bgcolor: activeIndex === index ? '#1976d2' : 'transparent',
            color: activeIndex === index ? 'white' : 'black',
            '&:hover': {
              bgcolor: activeIndex === index ? '#1565c0' : '#e0e0e0',
            }
          }}
        >
          <ListItemText primary={step} />
        </ListItemButton>
      ))}
    </List>
    <Divider sx={{ my: 2 }} />
    <Button fullWidth variant="contained" color="primary">
      Generate User Persona
    </Button>
  </Box>
);

const IdeaSummaryScreen = () => {
  return (
    <Box sx={{ display: 'flex', p: 2, gap: 2 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box mb={4}>
          <Card sx={{ p: 2, background: '#E3F2FD' }}>
            <Typography variant="h6">JJ</Typography>
            <Typography variant="subtitle1">
              A mobile app for training employees of a retail garment store
            </Typography>
          </Card>
        </Box>
        <Grid container spacing={2}>
          {sections.map((sec, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    {sec.icon}
                    <Typography variant="h6" ml={1}>
                      {sec.type}
                    </Typography>
                  </Box>
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <SidebarSteps />
    </Box>
  );
};

export default IdeaSummaryScreen;
