import Head from 'next/head';
// import Image from 'next/image';
import styles from '@styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | jamduo.org</title>
        <meta name="description" content="jamduo.org's offical website for all our projects, products and services." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to <a href="https://jamduo.org">jamduo!</a></h1>
        <h2 className={styles.description}>making loveable software</h2>
      </main>

      <footer className={styles.footer}>Made with <span className={styles.heart}>❤</span> by Jamduo</footer>
    </div>
  )
}
