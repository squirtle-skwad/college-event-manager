import { createMuiTheme } from "@material-ui/core";

const theme = {
    palette: {
        primary: {
            main: "#673AB7",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#ffffff",
            contrastText: "#673AB7",
        },
    },
    typography: {
        useNextVariants: true,
    },
};

export default createMuiTheme(theme);
