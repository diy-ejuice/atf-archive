import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, Table } from 'react-bootstrap';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import { getFlavorSlug } from '~utils';

export default function FlavorsPage({ data }) {
  const flavors = data.allFlavorsJson.nodes;

  return (
    <Layout>
      <SEO title="Flavors" />
      <Container>
        <h1>Flavors</h1>
        <Table striped>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {flavors.map((flavor) => (
              <tr key={flavor.id}>
                <td>{flavor.vendor}</td>
                <td>
                  <Link to={getFlavorSlug(flavor)}>{flavor.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
}

FlavorsPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query {
    allFlavorsJson {
      nodes {
        id
        name
        vendor
      }
    }
  }
`;
