import { FC, JSXElementConstructor, ReactElement } from "react";
import { IconButton, IconProps } from "@chakra-ui/react";
import { Link } from "@components/core";
import { GithubIcon, GitlabIcon, WebsiteIcon, DiscordIcon } from "@components/icons/social";

export const SocialLink: FC<{ name: string, Icon: import("@chakra-ui/system").ComponentWithAs<"svg", IconProps>, url: string, size?: string }> = ({ name, Icon, url, size = "2em" }) => (
  <Link href={url} isExternal>
    <IconButton 
      aria-label={name}
      icon={(<Icon boxSize={size} />)}
    />
  </Link>
);

export const WebsiteLink: FC<{ name: string, url: string }> = ({ name, url }) => (
  <SocialLink name={name} Icon={WebsiteIcon} url={url} />
);

export const GithubLink: FC<{ path: string }> = ({ path }) => (
  <SocialLink name="Github" Icon={GithubIcon} url={`https://github.com/${path}`} />
);

export const GitlabLink: FC<{ path: string }> = ({ path }) => (
  <SocialLink name="Gitlab" Icon={GitlabIcon} url={`https://gitlab.com/${path}`} />
);

export const DiscordLink: FC<{ tag: string, user_id: string }> = ({ tag, user_id }) => (
  <SocialLink name={tag} Icon={DiscordIcon} url={`https://discord.com/channels/@me/${user_id}`} />
);