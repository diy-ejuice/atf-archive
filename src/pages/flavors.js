import React from 'react';
import { Container } from 'react-bootstrap';

import Layout from '~components/Layout';
import SEO from '~components/SEO';

export default function FlavorsPage() {
  return (
    <Layout>
      <SEO title="Flavors" />
      <Container>
        <h1>Flavors</h1>
      </Container>
    </Layout>
  );
}
