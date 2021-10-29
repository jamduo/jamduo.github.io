import Document, { Html, Head, Main, NextScript } from 'next/document';
// import { ColorModeScript } from "@chakra-ui/react";
// import theme from "@styles/theme";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}