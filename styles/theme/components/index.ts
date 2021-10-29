// import palette from "../palette";
// import { mode } from '@chakra-ui/theme-tools';
import Link from "./link";
const components = {
    Link,
    Heading: {
        baseStyle: (props: any) => ({
            fontWeight: "bold",
            m: "0.83rem 0",
        }),
    },
    ButtonGroup: {
        defaultProps: {
            colorScheme: "twitter"
        },
    },
    Button: {
        defaultProps: {
            colorScheme: "twitter"
        },
    },
    IconButton: {
        defaultProps: {
            colorScheme: "twitter"
        },
    },
};
export default components;