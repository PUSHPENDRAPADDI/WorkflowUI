import { useEffect, useState } from 'react';
import {
    Tabs,
    Tab,
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Grid,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { setFeatureEditModalOpen } from '../redux/silces/HomeScreenSlice';
import FeatureEditModal from '../components/FeatureEditModal';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const tabLabels = {
    MUST_HAVE: 'Must Have 🔥',
    SHOULD_HAVE: 'Should Have ✅',
    COULD_HAVE: 'Could Have 💡',
    "WON'T_HAVE": "Won't Have 🚫"
}

const MoSCoWScreen = ({ currentIdeaName }) => {
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('MUST_HAVE');
    const [open, setOpen] = useState(false);
    const [deleteDetails, setDeleteDetails] = useState(null);
    const formDataFromReducer = useSelector((state) => state.homeScreenReducer.featureEditDetails);
    const { data: fetchedFeaturesData, loading: featuresLoading, error: FeaturesError, fetchData: fetchFeatures } = useApi("Features", `${URLCONSTANTS.GET_PARTICULAR_AGENT_RESPONSE + currentIdeaName}/features_list_agent`, "GET");
    const { data: moveFeaturesData, loading: moveFeaturesLoading, error: moveFeaturesError, fetchData: moveFeaturesFun } = useApi("MoveFeature", `${URLCONSTANTS.UPDATE_FEATURE_PRIORITY}`, "POST");

    const [anchorEl, setAnchorEl] = useState(null);
    const openOption = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const getKeyByValue = (obj, value) => {
        return Object.keys(obj).find(key => obj[key] === value);
    };

    const handleClose = (item, feature) => {
        const key = getKeyByValue(tabLabels, item);
        moveFeaturesFun({
            concept_name: currentIdeaName,
            feature_id: feature?.id,
            new_priority: key
        })
        setAnchorEl(null);
    };

    const {
        data: updatedFeature,
        loading: updateFeatureLoading,
        error: updateFeatureError,
        fetchData: updateFeatureFun
    } = useApi(
        "UPDATEFEATURE",
        `${URLCONSTANTS.UPDATE_ENTRY + currentIdeaName}/features_list_agent/${formDataFromReducer?.id}`,
        "PUT"
    );
    const { data: deleteFeature, loading: deleteFeatureLoading, error: deleteFeatureError, fetchData: deleteFeatureEntryFun } = useApi("DeleteFeatureENTRY", `${URLCONSTANTS.DELETE_ENTRY + currentIdeaName}/features_list_agent/${deleteDetails?.id}`, "DELETE");
    const featureData = fetchedFeaturesData && fetchedFeaturesData?.features_list_agent?.features_list;
    const filteredOptionsValues = Object.values(tabLabels).filter(label => label !== tabLabels[activeTab]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleFeatureEdit = (editItem) => {
        dispatch(setFeatureEditModalOpen(editItem))
    }


    const handleEditFeature = (item) => {
        updateFeatureFun(item)
    }

    useEffect(() => {
        fetchFeatures();
    }, [updatedFeature, deleteFeature, moveFeaturesData]);

    const handleFeatureDelete = (item) => {
        setOpen(true);
        setDeleteDetails({ id: item?.id, sec: item?.name });
    }

    const handleFeatureWithConfirmationDelete = () => {
        deleteFeatureEntryFun();
        setOpen(false);
    }

    return (
        featuresLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }} >
                <CircularProgress color="primary" />
            </Box >
        ) :
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
                        {featureData && Object.keys(featureData).map(tab => (
                            <Tab key={tab} label={tabLabels[tab]} value={tab} />
                        ))}
                    </Tabs>
                </Box>
                <Box mt={3}>
                    <Grid container spacing={2}>
                        {featureData && featureData[activeTab]?.map((feature, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        height: 250,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        position: 'relative'
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
                                    <IconButton
                                        onClick={() => handleFeatureEdit(feature)}
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 85,
                                            backgroundColor: 'white',
                                            boxShadow: 1,
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                        }}
                                        size="small"
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleFeatureDelete(feature)}
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 45,
                                            backgroundColor: 'white',
                                            boxShadow: 1,
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                            color: 'red'
                                        }}
                                        size="small"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton >
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 5,
                                            backgroundColor: 'white',
                                            boxShadow: 1,
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                        }}
                                        size="small"
                                        onClick={handleClick}>
                                        <MoreVertIcon fontSize="small" />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={openOption}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        {filteredOptionsValues.map((item, index) => {
                                            return (
                                                <MenuItem key={index} onClick={() => handleClose(item, feature)}>{item}</MenuItem>
                                            )
                                        })}
                                    </Menu>
                                    <ConfirmDeleteModal
                                        open={open}
                                        onClose={() => setOpen(false)}
                                        onConfirm={handleFeatureWithConfirmationDelete}
                                        itemName={deleteDetails} />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <FeatureEditModal handleEditFeature={handleEditFeature} />
                </Box>
            </Box>
    );
};

export default MoSCoWScreen;
