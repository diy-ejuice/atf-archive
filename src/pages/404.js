import React from 'react';
import { Link } from 'gatsby';

import Layout from '~components/Layout';
import SEO from '~components/SEO';

export default function NotFound() {
  return (
    <Layout>
      <SEO title="Page Not Found" />
      <h1 className="display-1">Not Found</h1>
      <p>
        Sorry, that page doesn&apos;t exist. Please go back to{' '}
        <Link to="/">the index</Link> and try to find the page from there.
      </p>
    </Layout>
  );
}
