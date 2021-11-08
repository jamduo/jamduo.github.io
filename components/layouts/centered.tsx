import { FC } from "react";
import Head from "next/head";
import { Center } from "@chakra-ui/react";
import { content_min_height, Footer } from "@components/layouts/main"
import Meta, { MetaOptions } from "@components/meta";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 50, maxHeight: `calc(${content_min_height} - 100px)` },
  enter: { opacity: 1, y: 0, transitionEnd: { maxHeight: 'none' } },
  exit: { opacity: 0, y: 50, maxHeight: `calc(${content_min_height} - 100px)` },
};

const Layout: FC<{ meta: MetaOptions }> = ({ meta = {}, children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Meta {...meta} />
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        // style={{ minHeight: content_min_height, width: "100%" }}
        style={{ overflowY: "hidden",  }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Center minH={`calc(${content_min_height})`} flexDir="column" as="section" flex="1" p="1rem" textAlign="center">
          {children}
        </Center>
        <Footer />
      </motion.div>
    </>
  );
};

export default Layout;