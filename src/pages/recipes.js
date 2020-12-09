import React from 'react';
import { Container } from 'react-bootstrap';

import Layout from '~components/Layout';
import SEO from '~components/SEO';

export default function RecipesPage() {
  return (
    <Layout>
      <SEO title="Recipes" />
      <Container>
        <h1>Recipes</h1>
      </Container>
    </Layout>
  );
}
