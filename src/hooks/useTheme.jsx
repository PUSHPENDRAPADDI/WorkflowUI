import { useTheme } from '@mui/material/styles';

const useCustomTheme = () => {
    const theme = useTheme();
    return {
        ...theme,
        isLightWhitishGray: theme.palette.primary.main === '#f5f5f5',
    };
};

export default useCustomTheme;
