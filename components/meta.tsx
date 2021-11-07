import Head from "next/head";
import { FC } from "react";

export interface MetaOptions {
  title?: string;
  description?: string;
  image?: string;
  robots?: string;
}

const Meta: FC<MetaOptions> = ({ title, description, image, robots }) => (
  <Head>
    <meta name="robots" content={robots ?? "index, follow"} />
    <title>{title ?? "New Page"} | jamduo</title>
    {title && <meta name="og:title" content={title} />}
    {description && <meta name="description" content={description} />}
    {image && <meta property="og:image" content={image} />}
  </Head>
);

export default Meta;