import { useTheme } from '@mui/material/styles';

const useCustomTheme = () => {
    const theme = useTheme();
    return {
        ...theme,
        isLightSkyBlue: theme.palette.primary.main === '#87CEFA',
    };
};

export default useCustomTheme;
