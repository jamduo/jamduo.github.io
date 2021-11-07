// import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@styles/theme/index";
import Layout from '@/components/layouts/main';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
export default MyApp;