import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  Home,
  Search,
  Menu,
  Code,
  SmartToy,
  Terminal,
  Inventory2,
  MenuBook,
  ViewModule,
  Schema,
  Web,
  Speed,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', icon: <Home color="primary" />, route: '/' },
    { label: 'Search', icon: <Search color="primary" /> },
    { label: 'Knewron', icon: <Code color="primary" /> },
    { label: 'Agents', icon: <SmartToy color="primary" /> },
    { label: 'Prompts', icon: <Terminal color="primary" /> },
    { label: 'Collections', icon: <Inventory2 color="primary" /> },
    { label: 'Commands', icon: <Terminal color="primary" /> },
    { label: 'Playbook', icon: <MenuBook color="primary" /> },
    { label: 'Lean Business Canvas', icon: <ViewModule color="primary" /> },
    { label: 'Schema Mapper', icon: <Schema color="primary" /> },
    { label: 'Web utilities', icon: <Web color="primary" /> },
    { label: 'Self Service', icon: <Speed color="primary" /> },
  ];

  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      PaperProps={{
        sx: {
          top: '68px',
          height: 'calc(100% - 68px)',
        },
      }}
    >
      <div style={{ width: isOpen ? 240 : 60, transition: '0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconButton onClick={toggleSidebar}>
            <Menu color="primary" />
          </IconButton>
        </div>
        <List>
          {menuItems.map((item, index) => (
            <Tooltip key={index} title={item.label} placement="right">
              <ListItem
                button
                onClick={() => item.route && navigate(item.route)}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {isOpen && <ListItemText primary={item.label} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
