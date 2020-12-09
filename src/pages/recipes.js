import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, Table } from 'react-bootstrap';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import { getRecipeSlug } from '~utils';

export default function RecipesPage({ data }) {
  const recipes = data.allRecipesJson.nodes;

  return (
    <Layout>
      <SEO title="Recipes" />
      <Container>
        <h1>Recipes</h1>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
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
                <td>{recipe.author}</td>
                <td></td>
                <td>{recipe.views}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
}

RecipesPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query {
    allRecipesJson {
      nodes {
        author
        id
        name
        views
      }
    }
  }
`;
