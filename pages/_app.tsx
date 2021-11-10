import '@styles/prism-okaidia.css';

import type { AppProps } from 'next/app';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@styles/theme/index";
import Layout from '@/components/layouts/main';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <Layout router={router}>
        <AnimatePresence initial={true} exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  )
}
export default MyApp;