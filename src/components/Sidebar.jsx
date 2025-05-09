import React from 'react';
import {
  Accordion,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Home, Search, Menu, Add, WorkOffOutlined, AccountBoxRounded, Person } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setIsCreateIdeaModalOpen } from '../redux/silces/HomeScreenSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" open={isOpen}>
      <div style={{ width: isOpen ? 240 : 60, transition: '0.3s' }}>
        <IconButton onClick={toggleSidebar}>
          <Menu />
        </IconButton>
        <List>
          <Tooltip title="Home" placement="right">
            <ListItem button onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
              <ListItemIcon><Home /></ListItemIcon>
              {isOpen && <ListItemText primary="Home" />}
            </ListItem>
          </Tooltip>
          <Tooltip title="Search" placement="right">
            <ListItem button>
              <ListItemIcon><Search /></ListItemIcon>
              {isOpen && <ListItemText primary="Search" />}
            </ListItem>
          </Tooltip>
          <Tooltip title="New Idea" placement="right">
            <ListItem button onClick={() => dispatch(setIsCreateIdeaModalOpen())} sx={{ cursor: 'pointer' }}>
              <ListItemIcon><Add /></ListItemIcon>
              {isOpen && <ListItemText primary="New Idea" />}
            </ListItem>
          </Tooltip>
          <Tooltip title="Workflows" placement="right">
            <ListItem button onClick={() => navigate('/ideaSummaryScreen')} sx={{ cursor: 'pointer' }}>
              <ListItemIcon><AccountBoxRounded /></ListItemIcon>
              {isOpen && <ListItemText primary='Workflows' />}
            </ListItem>
          </Tooltip>
          <Tooltip title="Persona" placement="right">
            <ListItem button onClick={() => navigate('/persona')} sx={{ cursor: 'pointer' }}>
              <ListItemIcon><Person /></ListItemIcon>
              {isOpen && <ListItemText primary='Persona' />}
            </ListItem>
          </Tooltip>
          <Tooltip title="MOSCOW" placement="right">
            <ListItem button onClick={() => navigate('/moscow')} sx={{ cursor: 'pointer' }}>
              <ListItemIcon><Person /></ListItemIcon>
              {isOpen && <ListItemText primary='moscow' />}
            </ListItem>
          </Tooltip>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
