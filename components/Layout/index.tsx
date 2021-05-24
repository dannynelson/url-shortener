import React, { ReactNode } from 'react';
import Head from 'next/head';
import styles from './styles.module.css';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({
  children,
  title = 'URL Shortener',
}: Props) => (
  <div className={styles.urlShortenerApp}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />{' '}
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {/* <h1 className="my-4">URL Shortener</h1> */}
    {children}
  </div>
);

export default Layout;
