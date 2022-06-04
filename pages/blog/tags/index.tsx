import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import { Container, Heading, Tag as ChakraTag } from '@chakra-ui/react';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Link } from '@components/core';
import { getTagsSortedByPostCount, Tag } from '@/lib/posts';

// TODO(Mitch): Fix Metadata
const meta: MetaOptions = {
  title: "Blog",
  description: "The official blog from zyrn.dev on my projects, products and services.",
};

export const getStaticProps: GetStaticProps = async () => {
  const tags = await getTagsSortedByPostCount(); 

  return {
    props: {
      tags,
    }
  }
}

const Render: NextPage<{ tags: Tag[] }> = ({ tags }) => {
  return (
    <Layout meta={meta}>
      <Container maxW="container.lg" p="0 0.5em">
        <Heading as="h1" size="4xl">Blog Tags</Heading>
        <br/>
        {tags.map(tag => (
          <Link m="0.5rem 0.5rem" href={`/blog/tags/${encodeURIComponent(tag.name)}`} display={"inline-flex"} key={tag.name} mr="0.6em">
            <ChakraTag size="lg">
              {tag.name + " | " + tag.posts.length}
            </ChakraTag>
          </Link>
        ))}
      </Container>
    </Layout>
  )
};
  
export default Render;