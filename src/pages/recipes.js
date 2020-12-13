import { graphql, Link } from 'gatsby';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import {
  Container,
  FormControl,
  Row,
  Col,
  ListGroup,
  Card
} from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import { getRecipeSlug } from '~utils';

export default function RecipesPage({ data }) {
  const recipes = data.allRecipesJson.nodes;
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSetSearchTerm = debounce(setSearchTerm, 250);
  const handleChangeTerm = useCallback(
    (event) => debouncedSetSearchTerm(event.target.value),
    [debouncedSetSearchTerm]
  );

  const filteredRecipes = recipes.filter((recipe) => {
    const searchExpr = new RegExp(searchTerm, 'i');

    return (
      searchTerm === '' ||
      searchExpr.test(recipe.name) ||
      searchExpr.test(recipe.author)
    );
  });

  filteredRecipes.sort((a, b) => b.views - a.views);

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
      <Container>
        <Card>
          <Card.Header>
            <Card.Title>Recipes</Card.Title>
          </Card.Header>
          <Card.Body>
            <FormControl
              type="text"
              onChange={handleChangeTerm}
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
