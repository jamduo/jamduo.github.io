import { FC } from "react";
import Head from "next/head";
import { Center } from "@chakra-ui/react";
import { content_min_height } from "@components/layouts/main"
import Meta, { MetaOptions } from "@components/meta";


const Layout: FC<{ meta: MetaOptions }> = ({ meta = {}, children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Meta {...meta} />
      <Center minH={content_min_height} flexDir="column" as="section" flex="1" p="1rem" textAlign="center">
        {children}
      </Center>
    </>
  );
};

export default Layout;