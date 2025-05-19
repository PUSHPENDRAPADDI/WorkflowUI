import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import { ToastContainer } from 'react-toastify';
import Header from './Header';

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen((prev) => !prev);

    return (
        <Box>
            <Header />
            <Box display="flex" height="calc(100vh - 64px)">
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <Box
                    component="main"
                    flexGrow={1}
                    ml={isOpen ? 30 : 10}
                    p={3}
                    sx={{ transition: 'margin 0.3s ease-in-out' }}
                >
                    {children}
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default Layout;
