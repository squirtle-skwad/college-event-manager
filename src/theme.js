import { createMuiTheme } from "@material-ui/core";

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
