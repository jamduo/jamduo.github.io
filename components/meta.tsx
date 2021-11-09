import Head from "next/head";
import { FC } from "react";

export interface MetaOptions {
  title?: string;
  description?: string;
  image?: string;
  site_name?: string;
  robots?: string;
}

// eslint-disable-next-line max-lines-per-function
const Meta: FC<MetaOptions> = ({title = "New Page", description, image, site_name = "jamduo", robots }) => {
  return (
    <Head>
      <title>{title} | jamduo</title>
      {description && <meta name="description" content={description} />}

      {/* Facebook Meta Tags */}
      {/* <meta property="og:url" content="https://test.zyrn.dev:31500/blog/welcome/"> */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content={site_name} />

      {/* Twitter Meta Tags */}
      {/* <meta name="twitter:card" content="summary_large_image">
      <meta property="twitter:domain" content="test.zyrn.dev">
      <meta property="twitter:url" content="https://test.zyrn.dev:31500/blog/welcome/">
      <meta name="twitter:title" content="Welcome">
      <meta name="twitter:description" content="An exciting 😄 new update from the jamduo team. Our official launch 🚀 is finally here!">
      <meta name="twitter:image" content=""> */}      

      <meta name="robots" content={robots ?? "index, follow"} />
    </Head>
  );
};

export default Meta;