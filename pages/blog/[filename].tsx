import React, { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Box, Container, Flex, Heading, Spacer, Text, Tag, useColorModeValue } from '@chakra-ui/react';
import { getPost, getPostPaths, Post } from '@/lib/posts';
import Layout from '@components/layouts/centered';
import TagLine from '@components/tagline';
import { Link } from '@components/core';
import { PostTitle } from '@/components/post';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params?.filename as string)
  return {
    props: {
      ...post,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostPaths();
  return {
    paths,
    fallback: false
  }
}

const Render: FC<Post> = ({ children, ...post }) => {
  const { title, content, preview } = post;
  return (
    <Layout meta={{ title: "Blog - " + title, description: preview }}>
      <Container as="article" maxW="container.lg" textAlign="start">
        <PostTitle {...post} />
        <Box id="blog-article" dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </Layout>
  );
};

export default Render;