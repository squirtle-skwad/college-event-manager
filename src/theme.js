import { createMuiTheme } from "@material-ui/core";
import { teal } from '@material-ui/core/colors';

const theme = {
    palette: {
        primary: {
            main: "#ffffff",
            contrastText: "#673AB7",
        },
    },
    typography: {
        useNextVariants: true,
    },
};

export default createMuiTheme(theme);
