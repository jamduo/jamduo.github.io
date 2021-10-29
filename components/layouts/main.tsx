import { FC } from 'react';
import Head from 'next/head';
import { ButtonGroup, Button, Center, Spacer, Text } from '@chakra-ui/react';
import { Link, ThemeToggleButton } from '@components/core';

const Layout: FC<{ meta?: MetaOptions }> = ({ meta, children}) => (
  <Center flexDir="column" minH="100vh" p="0.5rem 0.5rem">
    <Header meta={meta} />
    <Navbar />

    <Center flexDir="column" as="main" flex="1" p="5rem 0">
      {children}
    </Center>

    <Footer />
  </Center>
);

const Header: FC<{ meta?: MetaOptions }> = ({ meta = {} }) => (
  <Head>
    {/* <Meta {...meta} /> */}
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export interface MetaOptions {
  title?: string;
  description?: string;
}

const Meta: FC<MetaOptions> = ({ title, description }) => {
  return (
    <Head>
      <title>{title ?? "New Page"} | jamduo</title>
      {description && <meta name="description" content={description} />}
    </Head>
  );
};

const Footer: FC = () => (
  <Center as="footer" w="100%" h="100px">
    Made with <Text as="span" color="dark.red" p="0 0.2rem">❤</Text> by jamduo
  </Center>
);

const Navbar: FC = () => {
  return (
    <ButtonGroup w="100%">
      <NavItem href="/" label="Home" />
      <NavItem href="/about-us" label="About Us" />
      <Spacer />
      <ThemeToggleButton />
    </ButtonGroup>
  );
};

const NavItem: FC<{href: string, label: string}> = ({href, label}) => (
  <Link href={href}>
      <Button p="0.5rem 1rem" mr="0.5rem" aria-label={label}>{label}</Button>
  </Link>
);

export default Layout;