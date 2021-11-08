import React, { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Box, Container, Flex, Heading, Spacer } from '@chakra-ui/react';
import { getPost, getPostPaths, Post } from '@/lib/posts';
import Layout from '@components/layouts/centered';
import Description from '@components/description';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params?.filename as string)
  return {
    props: {
      ...post,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostPaths();
  return {
    paths,
    fallback: false
  }
}

const Render: FC<Post> = ({ filename, title, date, content }) => {
  return (
    <Layout meta={{ title }}>
      <Container as="article" maxW="container.lg" textAlign="start">
        <Flex align="center">
          <Heading as="h1" size="2xl">{title}</Heading>
          <Spacer />
          <Description as="time" size="md" dateTime={(new Date(date)).toDateString()}>{date}</Description>
        </Flex>
        <Box dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </Layout>
  );
}
export default Render;