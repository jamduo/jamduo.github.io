import { FC, JSXElementConstructor, ReactElement } from "react";
import { Box, BoxProps, ButtonGroup, Center, Flex, Heading, Text } from '@chakra-ui/react';
import Layout, { MetaOptions } from '@components/layouts/main';
import Description from '@components/description';
import { Link } from "@components/core";
import { GithubLink, GitlabLink, WebsiteLink, DiscordLink } from "@components/social_links";

interface ProfileOptions {
  name: string;
  description: string;
  github?: string;
  gitlab?: string;
  website?: {
    name: string;
    url: string;
  },
  discord?: {
    tag: string;
    user_id: string;
  }
}

const profiles: ProfileOptions[] = [
  {
    name: "Justin",
    description: "It works on my machine",
    github: "justinac0",
    // gitlab: "justinac",
    website: {
      name: "Justinac0",
      url: "https://justinac0.github.io",
    },
  },
  {
    name: "Mitch",
    description: "It's ugly, but it works",
    github: "ZyrnDev",
    gitlab: "Zyrn",
    website: {
      name: "Zyrn.Dev",
      url: "https://zyrn.dev",
    },
    discord: {
      tag: "Zyrn#0001",
      user_id: "416841964013748234",
    },
  },
];

const meta: MetaOptions = {
  title: "About Us",
  description: "About Us: jamduo! Find out about who we are, our members and our mission.",
};

  export default function AboutUs() {
  return (
    <Layout meta={meta}>
      <Heading as="h1" lineHeight="1.15" fontSize="3rem">
        Who are we?
      </Heading>
      <Description as="h2" lineHeight="1.5" fontSize="1.25rem">
        jamduo: we jam &amp; theres 2 of us.
        {/* Justin And Mitch (JAM), a DUO of software developers, working on various passion projects. */}
      </Description>
      
      <Flex as="section" wrap="wrap" textAlign="center">
        {profiles.map((profile) => (<Profile key={profile.name} {...profile} />))}
      </Flex>
    </Layout>
  )
}

const Profile: FC<BoxProps & ProfileOptions > = ({ name, description, github, gitlab, website, discord, children, ...props }) => (
  <Box p="1rem" minW="15rem" m="auto" {...props}>
    <Heading as="h1" fontSize="2rem">{name}</Heading>
      
    <Description as="h2" fontSize="1.25rem">&quot;{description}&quot;</Description>
    <ButtonGroup>
      {github && <GithubLink path={github} />}
      {gitlab && <GitlabLink path={gitlab} />}
      {website && <WebsiteLink {...website} />}
      {discord && <DiscordLink {...discord} />}
    </ButtonGroup>
    {children}
  </Box>
);