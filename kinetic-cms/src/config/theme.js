import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const cmsTheme = createTheme({

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            xxl: 1920,
        },
    },

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
            primary: '#ffffff', // var(--cms-text-main)
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

const theme = responsiveFontSizes(cmsTheme);

export default theme;