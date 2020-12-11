import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import {
  Line,
  LineChart,
  YAxis,
  CartesianGrid,
  XAxis,
  Tooltip
} from 'recharts';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import { getRecipeSlug } from '~utils';

export default function FlavorPage({ data }) {
  const flavor = data.flavorsJson;
  const recipes = data.allRecipesJson.nodes;

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.recipe_flavors.find(
      (recipeFlavor) => recipeFlavor.flavor_id === parseInt(flavor.id, 10)
    )
  );

  const chartData = [];

  const percentages = filteredRecipes.map((recipe) => {
    const { millipercent } = recipe.recipe_flavors.find(
      (recipeFlavor) => recipeFlavor.flavor_id === parseInt(flavor.id, 10)
    );

    return millipercent / 1e3;
  });

  for (let i = 0; i < 10; i++) {
    const count = percentages.reduce(
      (prev, curr) => prev + (Math.floor(i) === Math.floor(curr) ? 1 : 0),
      0
    );

    chartData.push({
      percentage: i,
      count
    });
  }

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
      <SEO title={`${flavor.name} by ${flavor.vendor.name}`} />
      <Container>
        <h1>{flavor.name}</h1>
        <h2>by {flavor.vendor.name}</h2>
        <LineChart width={1100} height={300} data={chartData} className="mb-2">
          <CartesianGrid strokeDashArray="3 3" />
          <XAxis
            label={{ value: 'Percentage', position: 'insideBottom' }}
            dataKey="percentage"
            tickFormatter={(tick) => `${tick}%`}
          />
          <YAxis label={{ value: 'Recipes', angle: -90, dx: -10 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
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

FlavorPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query($id: String) {
    flavorsJson(id: { eq: $id }) {
      id
      name
      vendor {
        name
        abbreviation
      }
    }

    allRecipesJson {
      nodes {
        id
        name
        author
        recipe_flavors {
          flavor_id
          millipercent
        }
      }
    }
  }
`;
