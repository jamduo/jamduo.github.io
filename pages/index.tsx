// import Image from 'next/image';
import Layout from '@components/layouts/main';
import { Button, Link, Heading } from '@chakra-ui/react';
import Description from '@components/description';

export default function Home() {
  return (
    <Layout title="Home">
      <Heading as="h1" lineHeight="1.15" fontSize="4rem" textAlign="center" m="0.83rem 0">
        Welcome to <Link href="https://jamduo.org">jamduo!</Link>
      </Heading>
      <Description as="h2" lineHeight="1.5" fontSize="1.5rem">
        making loveable software
      </Description>
    </Layout>
  )
}
