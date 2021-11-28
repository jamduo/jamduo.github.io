import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import prism from 'remark-prism';
import { is_dev } from '@lib/env';

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostMetaData {
  date: string,
  title: string,
  author: string,
  published: boolean,
  preview?: string,
  [key: string]: string | any | undefined
}

export interface Post extends PostMetaData {
  filename: string,
  content: string
}

const fileExt = /\.md$/;

const markdown_pipeline = remark()
  .use(html, { sanitize: false })
  .use(gfm)
  .use(prism);

export function getPostFileNames() {
  return fs
    .readdirSync(postsDirectory)
    .filter(filename => fileExt.test(filename))
    .map(filename => filename.replace(fileExt, ''));
}

export async function getPosts(): Promise<Post[]> {
  const filenames = getPostFileNames();
  const post_promises = filenames.map(filename => getPost(filename))
  const posts = await Promise.all(post_promises)

  return posts.filter(post => post.published || is_dev); // Allow unpublished posts in dev mode
}

const sortByDateDesc = (a: PostMetaData, b: PostMetaData) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
export async function getSortedPosts(): Promise<PostMetaData[]> {
  const posts = await getPosts();
  return posts.sort(sortByDateDesc);
}

export async function getPostPaths(): Promise<{ params: { filename: string } }[]> {
  const posts = await getPosts();
  return posts.map(post => ({ params: { filename: post.filename } }));
}

export async function getPost(filename: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, filename + ".md");
  const fileContents = await fs.promises.readFile(fullPath, 'utf8');
  
  // Use gray-matter to parse the post metadata section
  const { content: rawContent, data: metadata }: { content: string, data: PostMetaData } = matter(fileContents) as any;
  const content = await markdown_pipeline.process(rawContent).then(result => result.toString());
  return {
    filename,
    ...metadata,
    content,
  };
}