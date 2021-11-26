import React, { FC } from 'react';
import { ButtonGroup, IconButton, Spacer, Menu, MenuList, MenuItem, MenuButton, Box, Button, Heading, ButtonGroupProps } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, ThemeToggleButton } from '@components/core';

type LinkType = { href: string; label: string }
const LINKS: LinkType[] = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  // { href: '/test', label: 'Test' },
];

const Navbar: FC<ButtonGroupProps> = ({ m, ...props }) => {
  return (
    <ButtonGroup as="nav" {...props}>
      <Logo />
      <NavDesktop />
      <Spacer />
      <ThemeToggleButton />
      <NavMobile />
    </ButtonGroup>
  );
};

const Logo: FC = () => {
  return (
    <Heading as="span" m="auto" p="0 0.5em" size='md' >
      <Link href='/' _hover={{ textDecoration: "none" }} _active={{ textDecoration: "none" }} _focus={{ textDecoration: "none" }}>
        jamduo
      </Link>
    </Heading>
  );
};

const NavDesktop: FC = () => {
  return (
    <Box display={{ base: 'none', md: 'block' }}>
      <Links />
    </Box>
  );
};

const NavMobile: FC = () => {
  return (
    <Box display={{ md: 'none' }}>
      <Menu isLazy>
        <MenuButton as={IconButton} aria-label="Navigation Menu" icon={<HamburgerIcon />} />
        <MenuList>
          <Links isMobile/>
        </MenuList>
      </Menu>
    </Box>
  );
};

type LinkProps = { isMobile?: boolean }
const Links: FC<{ isMobile?: boolean }> = ({ ...props }) => {
  return (
    <>
      {LINKS.map(link => (
        <NavItem key={link.href} {...link} {...props} />
      ))}
    </>
  );
};

type NavItemProps = LinkType & LinkProps
const NavItem: FC<NavItemProps> = ({ href, label, isMobile = false, ...props }) => {
  const content = isMobile ? (<MenuItem>{label}</MenuItem>) : (<Button p="0.5rem 1rem" mr="0.5rem" aria-label={label}>{label}</Button>);
  return (
    <Link key={href} href={href} {...props}>
      {content}
    </Link>
  );
};

export default Navbar;