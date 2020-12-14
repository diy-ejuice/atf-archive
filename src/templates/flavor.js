import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Card, ListGroup, Row, Col, FormControl } from 'react-bootstrap';
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
import useSearch from '~components/useSearch';
import SortButtons from '~components/SortButtons';
import { getRecipeSlug } from '~utils';

const sortKeys = {
  name: 'name',
  views: 'view count'
};

export default function Flavor({ data }) {
  const flavor = data.flavorsJson;
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

    chartData.push({
      percentage: i,
      count
    });
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

  const averagePercentage = (flavor.average_millipercent / 1e3).toFixed(2);
  const title = `${flavor.name} by ${flavor.vendor.name}`;
  const description = `Used at an average of ${averagePercentage}% in ${recipes.length} recipes`;

  return (
    <Layout>
      <SEO title={title} description={description} />
      <Card>
        <Card.Header>
          <Card.Title>
            <h1>
              {flavor.vendor.name} {flavor.name}
            </h1>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <h2 className="mb-3">Average percentage: {averagePercentage}%</h2>
          {recipes.length > 0 && (
            <Fragment>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} className="mb-3">
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
              <h2 className="mb-3">Used in {recipes.length} recipes</h2>
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
            </Fragment>
          )}
        </Card.Body>
      </Card>
    </Layout>
  );
}

Flavor.propTypes = {
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
