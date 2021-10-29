import palette from "../palette";
import { mode } from '@chakra-ui/theme-tools'
import { Dict } from "@chakra-ui/utils";

const Link = {
    baseStyle: (props: Dict) => ({
        color: mode(palette.light.cyan, palette.dark.cyan)(props),
        textDecoration: "none",
        _hover: {
            textDecoration: "underline",
        },
        _focus: {
            textDecoration: "underline",
        },
        _active: {
            textDecoration: "underline",
        },
    }),
};

export default Link;