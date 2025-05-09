import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(prev => !prev);

    return (
        <Box display="flex">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <Box flexGrow={1} ml={isOpen ? 30 : 10} p={3} transition="0.3s">
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
