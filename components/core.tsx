import { FC } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { Box, IconButton, Link as ChakraLink, LinkProps as ChakraLinkProps, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export const ThemeToggleButton: FC<{ size?: string | number }> = ({ size = "1.25em" }) => {
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(MoonIcon, SunIcon);
  return (
    <IconButton
        aria-label="Toggle theme"
        icon={<Icon boxSize={size} />}
        onClick={toggleColorMode}
    />
  );
}

export const Link: FC<NextLinkProps & ChakraLinkProps> = ({ children, ...props }) => (
  <NextLink href={props.href} passHref>
    <ChakraLink as="a" {...props}>
      {children}
    </ChakraLink>
  </NextLink>
);