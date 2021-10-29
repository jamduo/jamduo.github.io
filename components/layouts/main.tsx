import { FC } from 'react';
import Head from 'next/head';
import { Container, ButtonGroup, Button, Center, Spacer, Text } from '@chakra-ui/react';
import { Link, ThemeToggleButton } from '@components/core';

const Layout: FC<{ meta?: MetaOptions }> = ({ meta, children}) => (
  <Center flexDir="column" minH="100vh" p="0.5rem">
    <Header meta={meta} />
    

    <Center flexDir="column" as="main" flex="1" p="5rem 0">
      {children}
    </Center>

    <Footer />
  </Center>
);

const Header: FC<{ meta?: MetaOptions }> = ({ meta = {} }) => (
  <Container as="header" display="contents">
    <Navbar />
    <Meta {...meta} />
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  </Container>
);

export interface MetaOptions {
  title?: string;
  description?: string;
  image?: string;
  robots?: string;
}

const Meta: FC<MetaOptions> = ({ title, description, image, robots }) => (
  <Head>
    <meta name="robots" content={robots ?? "index, follow"} />
    <title>{title ?? "New Page"} | jamduo</title>
    {title && <meta name="og:title" content={title} />}
    {description && <meta name="description" content={description} />}
    {image && <meta property="og:image" content={image} />}
  </Head>
);

const Footer: FC = () => (
  <Center as="footer" w="100%" h="100px">
    made with <Text as="span" color="dark.red" p="0 0.2rem">❤</Text> by jamduo
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