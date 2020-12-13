import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Col, FormControl, ListGroup, Row } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import useSearch from '~components/useSearch';
import { getRecipeSlug } from '~utils';

export default function Mixer({ data }) {
  const mixer = data.mixersJson;
  const recipes = data.allRecipesJson.nodes;
  const { searchTerm, onChange } = useSearch();

  const filteredRecipes = recipes.filter((recipe) => {
    const searchExpr = new RegExp(searchTerm, 'i');

    return searchTerm === '' || searchExpr.test(recipe.name);
  });

  filteredRecipes.sort((a, b) => b.views - a.views);

  function RecipeRow({ index, style }) {
    const recipe = filteredRecipes[index];

    return (
      <Link to={getRecipeSlug(recipe)}>
        <ListGroup.Item style={style}>
          <Row>
            <Col md={10}>{recipe.name}</Col>
            <Col md={2}>{recipe.views} views</Col>
          </Row>
        </ListGroup.Item>
      </Link>
    );
  }

  RecipeRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object
  };

  const title = mixer.name;
  const description = `${recipes.length} recipes`;

  return (
    <Layout>
      <SEO title={title} description={description} />
      <Card>
        <Card.Header>
          <Card.Title>
            <h1>{mixer.name}</h1>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <FormControl
            type="text"
            onChange={onChange}
            placeholder="search by name"
          />
          <List
            height={800}
            itemData={filteredRecipes}
            itemCount={filteredRecipes.length}
            itemSize={60}
          >
            {RecipeRow}
          </List>
        </Card.Body>
      </Card>
    </Layout>
  );
}

Mixer.propTypes = {
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
