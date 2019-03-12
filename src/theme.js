import { createMuiTheme } from "@material-ui/core";
import { teal } from '@material-ui/core/colors';

const theme = {
    palette: {
        primary: {
            main: "#ffffff",
            contrastText: "#673AB7",
        },
        secondary: {
            main: "#673AB7",
            contrastText: "#ffffff",
        },
    },
    typography: {
        useNextVariants: true,
    },
};

export default createMuiTheme(theme);
