import { graphql, Link } from 'gatsby';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { Container, Card, FormControl } from 'react-bootstrap';
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
      <Card key={recipe.id} style={style}>
        <Card.Header>
          <Card.Title>
            <Link to={getRecipeSlug(recipe)}>
              {recipe.name} by {recipe.author}
            </Link>
          </Card.Title>
        </Card.Header>
      </Card>
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
        <h1>Recipes</h1>
        <FormControl
          type="text"
          onChange={handleChangeTerm}
          placeholder="search by name or author"
        />
        <List
          height={800}
          itemData={filteredRecipes}
          itemCount={filteredRecipes.length}
          itemSize={60}
        >
          {RecipeRow}
        </List>
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
