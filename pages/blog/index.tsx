import React, { FC } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { Box, Container, Heading, Flex, Spacer, Text } from '@chakra-ui/react';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Link } from '@components/core';
import { getSortedPosts, Post } from '@/lib/posts';
import Description from '@components/description';
import { PostTitle } from '@/pages/blog/[filename]';

const meta: MetaOptions = {
  title: "Blog",
  description: "The official blog from jamduo on our projects, products and services.",
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getSortedPosts();
  return {
    props: {
      posts: posts.slice(0, 5),
    }
  }
}

const PreviewMaxLength = 256;
const PostPreview: FC<{ filename: string, content: string }> = ({ filename, content }) => {
  const paragraphs = [...content.matchAll(/<p>(.+?)<\/p>/g)].map(match => match[1]);
  const body = paragraphs.join(' ');
  const preview = body.length > PreviewMaxLength + 3 ? body.slice(0, PreviewMaxLength) + "..." : body;

  return (
    <Text>
      {preview ?? "Preview Unavailable"}
      <Link href={`/blog/${filename}`} p="0 0.5rem">[Read More]</Link>
    </Text>
  );
};

const PostDescription: FC<Post> = ({ children, ...post }) => {
  const { filename, title, date, content } = post;
  return (
    <Box as="article" textAlign="start">
      <PostTitle {...post} isPreview />
      <PostPreview filename={filename} content={content} />
    </Box>
  );
};

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout meta={meta}>
      <Container maxW="container.lg">
        <Heading as="h1" size="4xl">Blog Posts</Heading>
        {posts.map(post => <PostDescription key={post.title} {...post} />)}
      </Container>
    </Layout>
  )
};
  
export default Blog;