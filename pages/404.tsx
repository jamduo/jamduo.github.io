// import Image from 'next/image';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Box, Flex, Heading, Spacer, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router'

const meta: MetaOptions = {
  title: "404 Not Found",
  description: "jamduo.org's offical website for all our projects, products and services.",
};

export default function _404() {
  const router = useRouter();
  return (
    <Layout meta={meta}>
      <Spacer />
      <Spacer />
      <Flex align="center" m="auto" direction={{ base: "column", md: "row" }}>
        <Heading as="h1" size="xl" m="0">404</Heading>
        <Heading as="h1" size="xl" p="0 1rem" display={{ base: "none", md: "block" }} >|</Heading>
        <Text m="0">This page could not be found.</Text>
      </Flex>
      <Spacer />
      <Button onClick={() => router.back()} aria-label="Return To Last Page">Go Back</Button>
      <Spacer />
      <Spacer />
    </Layout>
  )
}
