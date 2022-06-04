import Layout from "@/components/layouts/centered";
import { MetaOptions } from "@/components/meta";
import { getTag, getTagPaths, Post, Tag } from "@/lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { Container, Heading } from '@chakra-ui/react';
import { PostDescription } from "@/components/post";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = await getTag(params?.tag as string);
  
  return {
    props: {
      tag,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getTagPaths();

  return {
    paths,
    fallback: false
  }
}

// TODO(Mitch): Fix Metadata
const meta: MetaOptions = {
  title: "Home",
  description: "zyrn.dev's offical website for all our projects, products and services.",
};

const Render: FC<{ tag: Tag }> = ({ tag }) => {
  return (
    <Layout meta={meta}>
      <Container maxW="container.lg" p="0 0.5em">
        <Heading as="h1" size="4xl">Posts Tagged as &apos;{tag.name}&apos;</Heading>
        <br/>
        {tag.posts.map(post => <PostDescription key={post.title} {...post} />)}
      </Container>
    </Layout>
  )
}

export default Render;