import { createTheme } from '@mui/material/styles';

const cmsTheme = createTheme({

    palette: {
        mode: 'dark',
        primary: {
            main: '#7C3AED', // var(--cms-primary)
        },
        background: {
            default: '#12101C', // var(--cms-bg-main)
            paper: '#171526',   // var(--cms-bg-sidebar) 
        },
        text: {
            primary: '#FFFFFF', // var(--cms-text-main)
            secondary: '#A78BFA', // var(--cms-text-muted)
        },
        success: {
            main: '#10B981', // var(--status-success)
        },
        warning: {
            main: '#F59E0B', // var(--status-pending)
        },
        error: {
            main: '#EF4444', // var(--status-error)
        },
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: '"Inter", "Geist Sans", sans-serif',
    },
    components: {

        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
    },
});
export default cmsTheme;