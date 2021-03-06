import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormControl, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import useSearch from '~components/useSearch';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import SortButtons from '~components/SortButtons';
import { getRecipeSlug } from '~utils';

const sortKeys = {
  name: 'name',
  views: 'view count'
};

export default function Recipes({ data }) {
  const recipes = data.allRecipesJson.nodes;
  const { searchTerm, onChange } = useSearch();
  const [sortKey, setSortKey] = useState(sortKeys.views);

  const filteredRecipes = recipes.filter((recipe) => {
    const searchExpr = new RegExp(searchTerm, 'i');

    return (
      searchTerm === '' ||
      searchExpr.test(recipe.name) ||
      searchExpr.test(recipe.author)
    );
  });

  switch (sortKey) {
    case sortKeys.name:
      filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case sortKeys.views:
    default:
      filteredRecipes.sort((a, b) => b.views - a.views);
      break;
  }

  function RecipeRow({ index, style }) {
    const recipe = filteredRecipes[index];

    return (
      <Link key={recipe.id} to={getRecipeSlug(recipe)}>
        <ListGroup.Item style={style}>
          <Row>
            <Col md={10}>
              {recipe.name} by {recipe.author}
            </Col>
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

  return (
    <Layout>
      <SEO title="Recipes" description={`Tracking ${recipes.length} recipes`} />
      <Card>
        <Card.Header>
          <Card.Title>
            <h1>Recipes</h1>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <SortButtons
            sortKey={sortKey}
            sortKeys={sortKeys}
            setSortKey={setSortKey}
          />
          <FormControl
            type="text"
            onChange={onChange}
            placeholder="search by name or author"
          />
          <ListGroup variant="flush">
            <List
              height={800}
              itemData={filteredRecipes}
              itemCount={filteredRecipes.length}
              itemSize={60}
            >
              {RecipeRow}
            </List>
          </ListGroup>
        </Card.Body>
      </Card>
    </Layout>
  );
}

Recipes.propTypes = {
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
