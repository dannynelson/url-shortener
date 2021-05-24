import React from 'react';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import ShortenUrlForm from 'components/ShortenUrlForm';

const IndexPage: React.FC = () => {
  const router = useRouter();

  async function shortenUrl(url: string) {
    const response = await fetch(`${getBaseUrl()}/api/shorten_url`, {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    if (response.status === 200) {
      const urlSlug = await response.json();
      router.push(`/link/${urlSlug}`);
    } else {
      router.push('/500');
    }
  }

  return (
    <Layout title="URL Shortener">
      <h1 className="my-4">URL Shortener</h1>
      <ShortenUrlForm onSubmit={shortenUrl} />
    </Layout>
  );
};

function getBaseUrl(): string {
  // window only available client-side
  return typeof window !== 'undefined' ? window.location.origin : '';
}

export default IndexPage;
