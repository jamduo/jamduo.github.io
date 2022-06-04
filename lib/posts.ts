import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import prism from 'remark-prism';
import { is_dev } from '@lib/env';

const postsDirectory = path.join(process.cwd(), 'posts');

const posts: { [key: string]: Post } = {};
import crypto from 'crypto';
function md5_hash(data: string): string {
  return crypto.createHash('md5').update(data ?? "").digest('hex');
}

const cacheFile = path.join(postsDirectory, 'cache.json');
function getCachedPost(filename: string, hash: string): Post | undefined {
  if (!fs.existsSync(cacheFile))
    return undefined;

  const cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
  const cached_post = cache[filename];

  if (cached_post && cached_post.hash == hash) {
    // console.log("Cache hit for " + filename);
    delete cached_post.hash;
    return cached_post;
  }

  return undefined;
}

function storeCachedPost(post: Post, hash: string) {
  const cache: { [key: string]: CachedPost } = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, 'utf8')) : {};
  cache[post.filename] = {
    hash,
    ...post
  };
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
}

export interface Tag {
  name: string;
  posts: Post[];
}

export interface PostMetaData {
  date: string,
  title: string,
  author: string,
  published: boolean,
  tags: string[],
  preview?: string,
  [key: string]: string | any | undefined
}

export interface Post extends PostMetaData {
  filename: string,
  content: string
}

export interface CachedPost extends Post {
  hash: string
}

const MAX_PREVIEW_LENGTH  = 1000;
const generatePreview = (preview: string | undefined, content: string) => {
  if (preview)
    return preview;

  var text = content;

  text = text.replaceAll(/<style[^>]*?>.*?<\/style>/gms, ''); // Remove Styles
  text = text.replaceAll(/<script[^>]*?>.*?<\/script>/gms, ''); // Remove Scripts

  while ([...text.matchAll(/<\/?[^>]*?>/gms)].length > 0) {
    text = text.replaceAll(/<\/?[^>]*?>/gms, '');
  }
  
  text.replaceAll(/\s+/gm, ' '); // Remove excess white space

  return text.length <= MAX_PREVIEW_LENGTH ? text : text.substring(0, MAX_PREVIEW_LENGTH);
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

const invalidTagCaracters = /[\/<>:"\\\|\?\*]/g;
function validateTags(tags: Tag[]) {
  // Check for possible url encoding issues / file system issues
  tags.forEach(tag => {
    if (invalidTagCaracters.test(tag.name)) {
      throw new Error(`Invalid tag: "${tag.name}"`);
    }
  })
}

export async function getTags(): Promise<Tag[]> {
  const posts = await getPosts();

  const tagsMap = posts.filter(post => post.published || is_dev).reduce((tags, post) => {
    post.tags?.forEach(tag => {
      let mapTag = tags.get(tag) ?? { name: tag, posts: [] };

      mapTag.posts.push(post);

      tags.set(tag, mapTag);
    });
    return tags;
  }, new Map<string, Tag>());
  
  const tags = Array.from(tagsMap.values());
  validateTags(tags);
  return tags; // Allow unpublished posts in dev mode
}

export async function getPosts(): Promise<Post[]> {
  const filenames = getPostFileNames();
  const post_promises = filenames.map(filename => getPost(filename))
  const posts = await Promise.all(post_promises)

  return posts.filter(post => post.published || is_dev); // Allow unpublished posts in dev mode
}

const sortByPostCountDesc = (a: Tag, b: Tag) => (b.posts.length - a.posts.length);
export async function getTagsSortedByPostCount(): Promise<Tag[]> {
  const tags = await getTags();
  const sorted_tags = tags.sort(sortByPostCountDesc);
  return sorted_tags;
}

const sortByDateDesc = (a: PostMetaData, b: PostMetaData) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
export async function getSortedPosts(): Promise<PostMetaData[]> {
  const posts = await getPosts();
  return posts.sort(sortByDateDesc);
}

export async function getTag(tag: string): Promise<Tag | undefined> {
  const tags = await getTags();
  return tags.find(t => t.name == tag);
}

export async function getTagPaths(): Promise<{ params: { tag: string } }[]> {
  const tags = await getTags();
  return tags.map(tag => ({ params: { tag: tag.name } }));
}

export async function getPostPaths(): Promise<{ params: { filename: string } }[]> {
  const posts = await getPosts();
  return posts.map(post => ({ params: { filename: post.filename } }));
}

export async function getPost(filename: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, filename + ".md");
  const fileContents = await fs.promises.readFile(fullPath, 'utf8');
  
  const hash = md5_hash(fileContents);
  const cached_post = getCachedPost(filename, hash); 
  if (cached_post) return cached_post;
  
  const { content: rawContent, data: metadata }: { content: string, data: PostMetaData } = matter(fileContents) as any;
  const content = await markdown_pipeline.process(rawContent).then(result => result.toString());
  const post: Post = {
    filename,
    preview: generatePreview(metadata.preview, content),
    ...metadata,
    content,
  };

  storeCachedPost(post, hash);
  return post;
}