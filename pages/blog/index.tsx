import React, { FC } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { Box, Container, Heading, Text, Tag } from '@chakra-ui/react';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Link } from '@components/core';
import { getSortedPosts, Post } from '@/lib/posts';
import { PostTitle } from '@/pages/blog/[filename]';

const meta: MetaOptions = {
  title: "Blog",
  description: "The official blog from jamduo on our projects, products and services.",
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getSortedPosts();
  return {
    props: {
      posts,
    }
  }
}

const PreviewMaxLength = 256;
const PostPreview: FC<Post> = ({ filename, content, preview }) => {
  var preview_text;
  
  if (preview) {
    preview_text = preview;
  } else {
    const paragraphs = [...content.matchAll(/<p>(.+?)<\/p>/g)].map(match => match[1]);
    const body = paragraphs.join(' ');
    preview_text = body.length <= PreviewMaxLength ? body : body.substring(0, PreviewMaxLength - 3) + '...';
  }

  return (
    <Text>
      {preview_text ?? "Preview Unavailable"}
      <Link href={`/blog/${filename}`} m="0 0.5rem">
        <Tag>Read More</Tag>
      </Link>
    </Text>
  );
};

const PostDescription: FC<Post> = ({ children, ...post }) => {

  return (
    <Box as="article" textAlign="start">
      <PostTitle {...post} isPreview />
      <PostPreview {...post} />
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