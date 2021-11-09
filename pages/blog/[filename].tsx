import React, { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Box, Container, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { getPost, getPostPaths, Post } from '@/lib/posts';
import Layout from '@components/layouts/centered';
import Description from '@components/description';
import { Link } from '@components/core';

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

export const PostTitle: FC<Post & { isPreview?: boolean }> = ({ filename, title, date, author, published, isPreview = false }) => {
  const titleSize = isPreview ? 'lg' : '2xl';
  const bottomMargin = isPreview ? 0 : "0.8em";
  var Title = <Heading as="h1" size={titleSize} mb="0">{ published || (<Text as="span" color="red">(Not Published) </Text>) }{title}</Heading>;
  if (isPreview) {
    Title = <Link href={`/blog/${filename}`}>{Title}</Link>;
  }
  return (
    <>
      {Title}
      <Flex align="center">
        <Heading as="h2" size="sm" m="0" mb={bottomMargin}>by {author}</Heading>
        <Spacer />
        <Description as="time" size="sm" m="0" mb={bottomMargin} dateTime={(new Date(date)).toISOString()}>{date}</Description>
      </Flex>
    </>
  );
};

const Render: FC<Post> = ({ children, ...post }) => {
  const { title, content } = post;
  return (
    <Layout meta={{ title }}>
      <Container as="article" maxW="container.lg" textAlign="start">
        <PostTitle {...post} />
        <Box dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </Layout>
  );
};

export default Render;