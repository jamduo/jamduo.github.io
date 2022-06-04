import React, { FC } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { Box, Flex, Container, Heading, Text, Tag as ChakraTag, useColorModeValue, Input } from '@chakra-ui/react';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Link } from '@components/core';
import { getSortedPosts, getTagsSortedByPostCount, Post, Tag } from '@/lib/posts';
import { PostDescription, PostPreview, PostTitle } from '@/components/post';

const meta: MetaOptions = {
  title: "Blog",
  description: "The official blog from jamduo on our projects, products and services.",
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getSortedPosts();
  const tags = await getTagsSortedByPostCount();
  
  return {
    props: {
      posts,
      tags,
    }
  }
}

const RightHandPanel: FC<{ tags: Tag[] }> = ({ tags }) => {
  const [search, setSearch] = React.useState("");

  return (
    <Box w="20rem" m="0.5em 0" p="0.5em" pos="relative" display={["none", "none", "none", "block"]}>
      <Link href="/blog/tags/">
        <Heading as="h3" size="lg" mt="0">All Tags</Heading>
      </Link>
      <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <DisplayTags tags={tags.filter(tag => tag.name.toLowerCase().includes(search.toLowerCase()))} />
    </Box>
  );
};

const DisplayTags: FC<{ tags: Tag[] }> = ({ tags }) => {
  const bgColour = useColorModeValue("gray.300", "gray.700");
  return (
    <>
      {tags.map(tag => (
        <Link m="0.5rem 0.5rem" href={`/blog/tags/${encodeURIComponent(tag.name)}`} display={"inline-flex"} key={tag.name} mr="0.6em">
          <ChakraTag size="lg" bgColor={bgColour}>
            {tag.name + " | " + tag.posts.length}
          </ChakraTag>
        </Link>
      ))}
    </>
  );
}

const Blog: NextPage<{ posts: Post[], tags: Tag[] }> = ({ posts, tags }) => {
  return (
    <Layout meta={meta}>
      <Container maxW="container.xl" p="0 0.5em">
        <Heading as="h1" size="4xl">Blog Posts</Heading>
        <br/>
        <Flex wrap="wrap" justify="center" align="start" direction="row">
          <Container maxW="calc(100% - 20rem)">
            {posts.map(post => <PostDescription key={post.title} {...post} />)}
          </Container>
          <RightHandPanel tags={tags} />
        </Flex>
      </Container>
    </Layout>
  )
};
  
export default Blog;