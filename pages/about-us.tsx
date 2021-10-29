import { FC, JSXElementConstructor, ReactElement } from "react";
import { Box, BoxProps, ButtonGroup, Center, Flex, Heading, Text } from '@chakra-ui/react';
import Layout from '@components/layouts/main';
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
    description: "I'm a software engineer...",
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

export default function AboutUs() {
  return (
    <Layout title="Test">
      <Heading as="h1" lineHeight="1.15" fontSize="3rem">
        Who are we?
      </Heading>
      <Description as="h2" lineHeight="1.5" fontSize="1.25rem">
        Justin And Mitch (ofc)
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