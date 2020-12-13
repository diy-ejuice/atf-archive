import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Container, Table } from 'react-bootstrap';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import { getRecipeSlug } from '~utils';

export default function MixerPage({ data }) {
  const mixer = data.mixersJson;
  const recipes = data.allRecipesJson.nodes;

  recipes.sort((a, b) => b.views - a.views);

  const title = mixer.name;
  const description = `${recipes.length} recipes`;

  return (
    <Layout>
      <SEO title={title} description={description} />
      <Container>
        <Card>
          <Card.Header>
            <Card.Title>
              <h1>{mixer.name}</h1>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Table striped>
              <thead>
                <tr>
                  <th>Recipe</th>
                  <th>Created</th>
                  <th>Views</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe) => (
                  <tr key={recipe.id}>
                    <td>
                      <Link to={getRecipeSlug(recipe)}>{recipe.name}</Link>
                    </td>
                    <td></td>
                    <td>{recipe.views}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}

MixerPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query($name: String) {
    mixersJson(name: { eq: $name }) {
      name
      recipes
    }

    allRecipesJson(filter: { author: { eq: $name } }) {
      nodes {
        id
        name
        views
      }
    }
  }
`;
