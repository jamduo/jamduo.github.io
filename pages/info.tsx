// import Image from 'next/image';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Box, Center, Heading, Code, Grid, GridItem } from '@chakra-ui/react';
import TagLine from '@/components/tagline';
import { Link } from '@components/core';
import { NextPage, GetStaticProps } from 'next';
import env from '@/lib/env';
import { FC } from 'react';

const meta: MetaOptions = {
  title: "Information",
  description: "zyrn.dev's information / stats page.",
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      commit_hash: env.commit_hash,
      commit_message: env.commit_message,
      commit_ref: env.commit_ref,
      time: (new Date()).getTime()
    },
  };
}

type BuildStats = {
  commit_hash: string;
  commit_message: string;
  commit_ref: string;
  time: number;
}

const Stats: FC<{ stats: string[][]}> = ({ stats }) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)">
      {stats.map(([key, value]) => (
        <Stat key={key} name={key} value={value} />
      ))}
    </Grid>
  );
}

const Stat: FC<{name: string, value: string}> = ({ name, value }) => {
  return (
    <>
      <GridItem>
        <TagLine as="h2" size="md" textAlign="center" m="0">
          {name}:
        </TagLine>
      </GridItem>
      <GridItem>
        <Code size="lg">{value}</Code>
      </GridItem>
    </>
  );
}

const Info: NextPage<BuildStats> = (buildStats) => {
  return (
    <Layout meta={meta}>
      <Heading as="h1" size="4xl" m="0.83rem 0">
        Information
      </Heading>
      <Stats stats={[
        ["Build Commit Hash", buildStats.commit_hash],
        ["Build Commit Message", buildStats.commit_message],
        ["Build Commit Ref", buildStats.commit_ref],
        ["Build Time", (new Date(buildStats.time)).toLocaleString("en-AU", {timeZone: "Australia/Sydney"}) + " (AEST)"],

      ]} />
    </Layout>
  )
}
export default Info;