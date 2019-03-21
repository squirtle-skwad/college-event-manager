import { createMuiTheme } from "@material-ui/core";

const theme = {
    palette: {
        primary: {
            main: "#003171",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#ffffff",
            contrastText: "#003171",
        },
    },
    typography: {
        useNextVariants: true,
    },
};

export default createMuiTheme(theme);
