import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, Table } from 'react-bootstrap';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import { getRecipeSlug } from '~utils';

export default function MixerPage({ data }) {
  const mixer = data.mixersJson;
  const recipes = data.allRecipesJson.nodes;
  const filteredRecipes = recipes.filter(
    (recipe) => mixer.recipes.indexOf(parseInt(recipe.id, 10)) > -1
  );

  filteredRecipes.sort((a, b) => b.views - a.views);

  const title = mixer.name;
  const description = `${filteredRecipes.length} recipes`;

  return (
    <Layout>
      <SEO title={title} description={description} />
      <Container>
        <h1>{mixer.name}</h1>
        <Table striped>
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Created</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipes.map((recipe) => (
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

    allRecipesJson {
      nodes {
        id
        name
        views
      }
    }
  }
`;
