import { Heading, HeadingProps, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

const Description: FC<HeadingProps | { [key: string]: string }> = ({children, ...props}) => {
  return (
    <Heading {...props} color={useColorModeValue("light.comment", "dark.comment")}>
      {children}
    </Heading>
  );
};

export default Description;