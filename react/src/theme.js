import { createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

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
        warn: red,
    },
    typography: {
        useNextVariants: true,
    },
};

export default createMuiTheme(theme);
