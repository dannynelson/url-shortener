import React from 'react';
import { GetServerSideProps } from 'next';

import { getUrlFromSlug } from 'modules/urlShortener';

// This page should never render. Either redirects to the full URL or returns a 404.
const SlugPage: React.FC = () => <div></div>;

export default SlugPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;
  if (slug == null) {
    throw new Error('Expected slug to be defined');
  }
  if (Array.isArray(slug)) {
    throw new Error('Expected exactly 1 slug');
  }
  const url = await getUrlFromSlug(slug);
  if (url != null) {
    return {
      redirect: {
        destination: url,
        permanent: true,
      },
    };
  }
  return {
    notFound: true,
  };
};
