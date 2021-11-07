import { FC } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { IconButton, Link as ChakraLink, LinkProps as ChakraLinkProps, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import palette from '@styles/theme/palette';

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

export const Link: FC<NextLinkProps & ChakraLinkProps & { isText?: boolean }> = ({ children, isText = false, ...props }) => {
  const colour = useColorModeValue(palette.light.cyan, palette.dark.cyan);
  props.color = isText ? colour : undefined;

  return (
    <NextLink href={props.href} passHref>
      <ChakraLink as="a" {...props}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};
