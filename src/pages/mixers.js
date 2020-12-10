import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, Table } from 'react-bootstrap';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import { getMixerSlug } from '~utils';

export default function MixersPage({ data }) {
  const mixers = data.allMixersJson.nodes;

  mixers.sort((a, b) => b.recipes.length - a.recipes.length);

  return (
    <Layout>
      <SEO title="Mixers" />
      <Container>
        <h1>Mixers</h1>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Recipes</th>
            </tr>
          </thead>
          <tbody>
            {mixers.map((mixer) => (
              <tr key={mixer.name}>
                <td>
                  <Link to={getMixerSlug(mixer)}>{mixer.name}</Link>
                </td>
                <td>{mixer.recipes.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
}

MixersPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query {
    allMixersJson {
      nodes {
        name
        recipes
      }
    }
  }
`;
