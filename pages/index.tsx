// import Image from 'next/image';
import Layout, { MetaOptions } from '@components/layouts/main';
import { Button, Link, Heading } from '@chakra-ui/react';
import Description from '@components/description';

const meta: MetaOptions = {
  title: "Home",
  description: "jamduo.org's offical website for all our projects, products and services.",
};

export default function Home() {
  return (
    <Layout meta={meta}>
      <Heading as="h1" lineHeight="1.15" fontSize="4rem" textAlign="center" m="0.83rem 0">
        Welcome to <Link href="https://www.jamduo.org">jamduo!</Link>
      </Heading>
      <Description as="h2" lineHeight="1.5" fontSize="1.5rem">
        making loveable software together
      </Description>
    </Layout>
  )
}
