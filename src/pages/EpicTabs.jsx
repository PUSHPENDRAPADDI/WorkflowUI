import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Container,
    CircularProgress,
    Button,
    IconButton,
} from '@mui/material';
import useApi from '../hooks/useApi';
import { URLCONSTANTS } from '../constants/urlConstants';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { setProductEditModal } from '../redux/silces/HomeScreenSlice';
import ProductRoadmapEditModal from '../components/ProductRoadmapEditModal'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';


function EpicTabs({ currentIdeaName }) {
    const dispatch = useDispatch();
    const [epicsData, setEpicsData] = useState([])
    const [open, setOpen] = useState(false);
    const [deleteDetails, setDeleteDetails] = useState(null);
    const editData = useSelector((state) => state.homeScreenReducer.productEditModalData);
    const { data: fetchedEPICSData, loading: EPICSLoading, error: EPICSError, fetchData: fetchEPICS } = useApi("EPICS", `${URLCONSTANTS.GET_PARTICULAR_AGENT_RESPONSE + currentIdeaName}/jira_epic_agent`, "GET");
    const { data: publishJiraData, loading: publishJiraLoading, error: publishJiraError, fetchData: publishJiraEPICS } = useApi("UPDATEEPIC", `${URLCONSTANTS.PUBLISHJIRA + currentIdeaName}`, "POST");
    const { data: deleteEpic, loading: deleteEpicLoading, error: deleteEpicError, fetchData: deleteEpicEntry } = useApi("DELETEEPIC", `${URLCONSTANTS.DELETE_ENTRY + currentIdeaName}/jira_epic_agent/${deleteDetails?.id}`, "DELETE");
    const {
        data: updateData,
        loading: updateLoading,
        error: updateError,
        fetchData: updateEntry
    } = useApi(
        "UPDATEPROductENTRY",
        `${URLCONSTANTS.UPDATE_ENTRY + currentIdeaName}/${editData?.agentName}/${editData?.id}`,
        "PUT"
    );

    const handlePublish = () => {
        publishJiraEPICS();
    }

    useEffect(() => {
        setEpicsData(fetchedEPICSData?.jira_epic_agent?.jira_epic_agent)
    }, [fetchedEPICSData]);

    useEffect(() => {
        fetchEPICS()
    }, [deleteEpic, updateData]);

    const handleDelete = (epic) => {
        setOpen(true);
        setDeleteDetails(epic);
    }


    const handleDeleteEpic = () => {
        deleteEpicEntry()
    }

    const handleUpdateEpic = () => {
        updateEntry({
            epic_title: editData.name,
            description: editData.des
        });
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 1 }}>
            {EPICSLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center', mb: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePublish}
                            sx={{ marginRight: 2 }}
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
                        <IconButton
                            sx={{
                                backgroundColor: 'white',
                                boxShadow: 1,
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                            }}
                            size="small"
                            color='primary'
                        >
                            <AddIcon fontSize='large' />
                        </IconButton>
                    </Box>
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
                                    padding: 1,
                                    borderRadius: 3,
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
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
                                    <Typography variant="h6" color="primary">
                                        {epic.epic_title}
                                    </Typography>

                                    {Array.isArray(epic.description) ? (
                                        <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                                            {epic.description.map((item, index) => (
                                                <li key={index}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {item}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <Typography variant="body2" color="textSecondary">
                                            {epic.description}
                                        </Typography>
                                    )}
                                </CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: 1,
                                        padding: 1,
                                    }}
                                >
                                    <IconButton
                                        onClick={() => dispatch(setProductEditModal({ name: epic.epic_title, des: epic?.description, agentName: 'jira_epic_agent', id: epic?.id }))}
                                        sx={{
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
                                        onClick={() => handleDelete(epic)}
                                        sx={{
                                            backgroundColor: 'white',
                                            boxShadow: 1,
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                            color: 'red',
                                        }}
                                        size="small"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Card>

                        ))}
                    </Box>
                </>
            )}
            <ProductRoadmapEditModal handleUpdateEpic={handleUpdateEpic} />
            <ConfirmDeleteModal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDeleteEpic}
                itemName={deleteDetails}
            />
        </Container>
    );
}

export default EpicTabs;
