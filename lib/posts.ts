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

export function getPosts(): Post[] {
  const filenames = getPostFileNames();
  return filenames
    .map(filename => getPost(filename))
    .filter(post => post.published || is_dev); // Allow unpublished posts in dev mode
}

const sortByDateDesc = (a: PostMetaData, b: PostMetaData) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
export function getSortedPosts(): PostMetaData[] {
  const posts = getPosts();
  return posts.sort(sortByDateDesc);
}

export function getPostPaths(): { params: { filename: string } }[] {
  const posts = getPosts();
  return posts.map(post => ({ params: { filename: post.filename } }));
}

export function getPost(filename: string): Post {
  const fullPath = path.join(postsDirectory, filename + ".md");
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the post metadata section
  const { content, data: metadata }: { content: string, data: PostMetaData } = matter(fileContents) as any;

  return {
    filename,
    ...metadata,
    content:  markdown_pipeline.processSync(content).toString(),
  };
}