import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import type { AppProps } from 'next/app';

// This default export is required in a new `pages/_app.js` file.
const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
