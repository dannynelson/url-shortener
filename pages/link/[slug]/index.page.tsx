import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

import Layout from 'components/Layout';

const LinkPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const urlSlug = Array.isArray(slug) ? slug[0] : slug;

  return (
    <Layout title="Shorten URL | Link">
      <h1 className="my-4">URL Shortener</h1>
      <Alert className={styles.shortenedUrl} variant="light">
        {/* Temporarily hide link if rendering in server environment since we don't have access to query params yet */}
        {urlSlug != null && (
          <a
            href={`${getBaseUrl()}/${urlSlug}`}
          >{`${getBaseUrl()}/${urlSlug}`}</a>
        )}
      </Alert>
      <Link href="/">
        <Button className="my-2" variant="primary" size="lg">
          Shorten another URL
        </Button>
      </Link>
    </Layout>
  );
};

function getBaseUrl(): string {
  // window only available client-side
  return typeof window !== 'undefined' ? window.location.origin : '';
}

export default LinkPage;
