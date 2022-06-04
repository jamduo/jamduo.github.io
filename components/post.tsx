import { FC } from "react";
import { Box, Flex, Heading, Spacer, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "@components/core";
import { Post } from "@/lib/posts";
import TagLine from "@components/tagline";

export const PostDescription: FC<Post> = ({ children, ...post }) => {
  return (
    <Box as="article" textAlign="start">
      <PostTitle {...post} isPreview />
      <PostPreview {...post} />
    </Box>
  );
};

export const PostTitle: FC<Post & { isPreview?: boolean }> = ({ filename, title, date, author, published, tags, isPreview = false }) => {
  const titleSize = isPreview ? 'lg' : '2xl';
  const subTitleSize = isPreview ? 'sm' : 'md';
  const tagSize = isPreview ? 'md' : 'lg';
  const bottomMargin = isPreview ? "0.2rem" : "0.6rem"; //"0.8rem";
  const textDecoration = isPreview ? 'underline' : 'none';

  return (
    <>
      <Heading as="h1" size={titleSize} m="0.1em 0" textDecoration={textDecoration}>{ published || (<Text as="span" color="red">(Not Published) </Text>) }{title}</Heading>
      <Flex align="center">
        <TagLine as="h2" size={subTitleSize} m="0" mb={bottomMargin} colorScheme="gray">by {author}</TagLine>
        <Spacer />
        <Heading as="time" size={subTitleSize} m="0" mb={bottomMargin} colorScheme="gray" dateTime={(new Date(date)).toISOString()}>{date}</Heading>
      </Flex>
      <PostTags tags={tags} headingSize={subTitleSize} tagSize={tagSize} />
    </>
  );
};

export const PostTags: FC<{ tags: string[], headingSize: string, tagSize: string }> = ({ tags, headingSize, tagSize }) => {
  const tagColour = useColorModeValue("gray.300", "gray.700");
  return (
    <Flex wrap="wrap">
      <Heading as="h4" m="auto 0" mr="0.6rem" size={headingSize}>Tags: </Heading>
      {tags?.map(tag => (
        <Link href={`/blog/tags/${encodeURIComponent(tag)}`} key={tag} display="inline-flex" m="0.2rem 0" mr="0.6em">
          <Tag size={tagSize} whiteSpace="nowrap" bgColor={tagColour}>
            {tag}
          </Tag>
        </Link>
      ))}
    </Flex>
  )
};

type PostPreviewOptions = {
  maxLines?: number | string,
  lineHeight?: number | string,
}
export const PostPreview: FC<Post & PostPreviewOptions > = ({ filename, preview, maxLines = 3, lineHeight = 1 }) => {
  return (
    <>
      <Text 
         overflow="hidden"
         textOverflow="ellipsis"
         css={{
          display: "-webkit-box",
          "WebkitBoxOrient": "vertical",
          "WebkitLineClamp": maxLines as any
        }}
      >{preview ?? "Preview Unavailable"}</Text>
      <ReadMore filename={filename}/>
    </>
  );
};

export const ReadMore: FC<{ filename: string }> = ({ filename }) => {
  return (
    <Link href={`/blog/${filename}`} mt="0.25rem" mb="0.5rem" display="inline-block">
      <Tag>Read More</Tag>
    </Link>
  );
}