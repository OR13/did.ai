import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { pink, amber, teal } from "@material-ui/core/colors";
import { darken, lighten } from "@material-ui/core/styles/colorManipulator";

const config = {
  splashImage: "https://source.unsplash.com/random",
  primaryColor: amber[500],
  secondaryColor: teal[500]
};

const theme = createMuiTheme({
  //   splashImage: config.splashImage,
  //   typography: {
  //     useNextVariants: true
  //   },
  //   palette: {
  //     primary: {
  //       light: lighten(config.primaryColor, 0.07),
  //       main: config.primaryColor,
  //       dark: darken(config.primaryColor, 0.5)
  //     },
  //     secondary: {
  //       light: lighten(config.secondaryColor, 0.07),
  //       main: config.secondaryColor,
  //       dark: darken(config.secondaryColor, 0.5)
  //     },
  //     alert: {
  //       light: lighten(pink.A400, 0.07),
  //       main: pink.A400,
  //       dark: darken(pink.A400, 0.5)
  //     }
  //   },
  //   overrides: {
  //     MuiInput: {
  //       // Name of the component ⚛️ / style sheet
  //       input: {
  //         fontFamily: '"Roboto Condensed"'
  //       }
  //     },
  //     MuiInputLabel: {
  //       // Name of the component ⚛️ / style sheet
  //       root: {
  //         fontFamily: '"Roboto Condensed"'
  //       }
  //     },
  //     MuiAppBar: {
  //       root: {
  //         // boxShadow: 'none',
  //       }
  //     },
  //     MuiTableCell: {
  //       root: {
  //         padding: "4px 0px 4px 24px"
  //       }
  //     },
  //     MuiButton: {
  //       // Name of the rule
  //       contained: {
  //         boxShadow: "none"
  //       }
  //     }
  //   }
});

function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
