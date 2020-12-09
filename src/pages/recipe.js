import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Button,
  Accordion,
  ProgressBar
} from 'react-bootstrap';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import Reviews from '~components/Reviews';

export default function RecipePage({ data }) {
  const recipe = data.recipesJson;
  const flavors = recipe.recipe_flavors;

  return (
    <Layout>
      <SEO title={`${recipe.name} by ${recipe.author}`} />
      <Container>
        <Card>
          <Card.Header>
            <Card.Title>
              <Row>
                <Col xs={3}>
                  <img src={recipe.image_url} alt="recipe" />
                </Col>
                <Col xs={9}>
                  <h1>{recipe.name}</h1>
                  <h2>by {recipe.author}</h2>
                  <h3>{recipe.total_reviews} reviews</h3>
                  <ProgressBar
                    now={(recipe.recipe_score / 5.0) * 1e2}
                    label={recipe.recipe_score}
                  />
                </Col>
              </Row>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <p>{recipe.description}</p>
            <Table striped>
              <thead>
                <tr>
                  <th>%</th>
                  <th>Vendor</th>
                  <th>Flavor</th>
                </tr>
              </thead>
              <tbody>
                {flavors.map((flavor) => (
                  <tr key={`${flavor.vendor}-${flavor.name}`}>
                    <td>{flavor.millipercent / 1e3}</td>
                    <td>{flavor.vendor}</td>
                    <td>{flavor.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <dl>
              <dt>Steep Days</dt>
              <dd>{recipe.steep_days}</dd>
              {recipe.temperature !== '0' && (
                <Fragment>
                  <dt>Temperature</dt>
                  <dd>{recipe.temperature}</dd>
                </Fragment>
              )}
            </dl>
            <Accordion defaultActiveKey={null}>
              <Accordion.Toggle as={Button} variant="link">
                Toggle Reviews
              </Accordion.Toggle>
              <Accordion.Collapse>
                <Reviews recipe={recipe} />
              </Accordion.Collapse>
            </Accordion>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}

RecipePage.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query($id: String) {
    recipesJson(id: { eq: $id }) {
      name
      author
      image_url
      description
      steep_days
      temperature
      recipe_score
      total_reviews
      recipe_flavors {
        name
        vendor
        millipercent
      }
      reviews {
        user
        score
        text
      }
    }
  }
`;
