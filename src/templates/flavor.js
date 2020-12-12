import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Container, Card } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import {
  Line,
  LineChart,
  YAxis,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import { getRecipeSlug } from '~utils';

export default function FlavorPage({ data }) {
  const flavor = data.flavorsJson;
  const recipes = data.allRecipesJson.nodes;

  recipes.sort((a, b) => b.views - a.views);

  const chartData = [];

  const percentages = recipes.map((recipe) => {
    const { millipercent } = recipe.recipe_flavors.find(
      (recipeFlavor) => recipeFlavor.flavor_id === flavor.id
    );

    return millipercent / 1e3;
  });

  for (let i = 0; i <= 10; i++) {
    const count = percentages.reduce(
      (prev, curr) => prev + (Math.floor(i) === Math.floor(curr) ? 1 : 0),
      0
    );

    if (count > 0) {
      chartData.push({
        percentage: i,
        count
      });
    }
  }

  function RecipeRow({ index, style }) {
    const recipe = recipes[index];

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

  const averagePercentage = (flavor.average_millipercent / 1e3).toFixed(2);
  const title = `${flavor.name} by ${flavor.vendor.name}`;
  const description = `Used at an average of ${averagePercentage}%`;

  return (
    <Layout>
      <SEO title={title} description={description} />
      <Container>
        <h1>
          {flavor.vendor.name} {flavor.name}
        </h1>
        <h2>Average percentage: {averagePercentage}%</h2>

        {recipes.length > 0 && (
          <Fragment>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} className="mb-2">
                <CartesianGrid strokeDashArray="3 3" />
                <XAxis
                  label={{
                    value: 'Percentage',
                    position: 'insideBottom',
                    dy: 8
                  }}
                  dataKey="percentage"
                  tickFormatter={(tick) => `${tick}%`}
                />
                <YAxis label={{ value: 'Recipes', angle: -90, dx: -10 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#17a2b8"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <h2>Used in {recipes.length} recipes</h2>
            <List
              height={800}
              itemData={recipes}
              itemCount={recipes.length}
              itemSize={60}
            >
              {RecipeRow}
            </List>
          </Fragment>
        )}
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
      average_millipercent
      vendor {
        name
        abbreviation
      }
    }

    allRecipesJson(
      filter: { recipe_flavors: { elemMatch: { flavor_id: { eq: $id } } } }
    ) {
      nodes {
        id
        name
        author
        views
        recipe_flavors {
          flavor_id
          millipercent
        }
      }
    }
  }
`;
