/* eslint-disable max-lines-per-function */
import { extendTheme } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools';
import components from "./components";
import palette from "./palette";

const colors = {
  light: palette.light,
  dark: palette.dark,
};

const styles = {
  //This is mean to change the core colours of the theme (but the default theme is already good!?!?!)
  global: (props: any) => ({
    "*, *::before, ::after": {
      borderWidth: 0,
      borderStyle: "solid",
      boxSizing: "border-box",
    },
    html: {
      "lineHeight": 1.5,
      "-webkit-text-size-adjust": "100%",
      "fontFamily": "system-ui,sans-serif",
      "-webkit-font-smoothing": "antialiased",
      "textRendering": "optimizeLegibility",
      "-moz-osx-font-smoothing": "grayscale",
      "touchAction": "manipulation",
    },
    body: {
      margin: 0,
      // color: mode(palette.light.foreground, palette.dark.foreground)(props),
      // bgColor: mode(palette.light.base, palette.dark.base)(props),
    },
    a: {
      textDecoration: "inherit",
      backgroundColor: "transparent",
    },
    button: {
      lineHeight: "inherit",
      backgroundColor: "transparent",
    },
    'button, input, optgroup, select, textarea': {
      padding: 0,
      lineHeight: "inherit",
      color: "inherit",
      fontFamily: "inherit",
      fontSize: "100%",
      margin: 0,
    },
    'button, [role="button"]': {
      cursor: "pointer",
    },
  }),
};

const fonts = {
  heading: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  body: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
  cssVarPrefix: "theme",
};

const theme = extendTheme({ config, colors, components, fonts, styles });

export default theme;