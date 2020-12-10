import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';

import Layout from '~components/Layout';
import SEO from '~components/SEO';

export default function FlavorPage({ data }) {
  const flavor = data.flavorsJson;

  return (
    <Layout>
      <SEO title={`${flavor.name} by ${flavor.vendor}`} />
      <Container>
        <h1>{flavor.name}</h1>
        <h2>by {flavor.vendor}</h2>
      </Container>
    </Layout>
  );
}

FlavorPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query($id: String) {
    flavorsJson(id: { eq: $id }) {
      name
      vendor
    }
  }
`;
