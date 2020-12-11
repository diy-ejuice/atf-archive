import { formatRelative, parseISO } from 'date-fns';
import { graphql, Link } from 'gatsby';
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
  ProgressBar,
  Image
} from 'react-bootstrap';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import Reviews from '~components/Reviews';
import { getMixerSlug } from '~utils';

export default function RecipePage({ data }) {
  const recipe = data.recipesJson;
  const flavors = recipe.recipe_flavors;

  let progressClass;

  switch (Math.floor(recipe.recipe_score)) {
    case 5:
    case 4:
      progressClass = 'success';
      break;
    case 3:
    case 2:
      progressClass = 'warning';
      break;
    case 1:
      progressClass = 'danger';
      break;
    default:
      progressClass = 'primary';
      break;
  }

  return (
    <Layout>
      <SEO title={`${recipe.name} by ${recipe.author}`} />
      <Container>
        <Card>
          <Card.Header>
            <Card.Title>
              <Row>
                <Col xs={12} md={3}>
                  {recipe.image_url && (
                    <Image src={recipe.image_url} alt="recipe" fluid />
                  )}
                </Col>
                <Col xs={12} md={9}>
                  <h2>{recipe.name}</h2>
                  <h3>
                    by{' '}
                    <Link to={getMixerSlug({ name: recipe.author })}>
                      {recipe.author}
                    </Link>
                  </h3>
                  <h4>{recipe.views} views</h4>
                  <Row className="atf-recipe-review-info">
                    <Col xs={4}>
                      <h4>{recipe.reviews?.length} reviews</h4>
                    </Col>
                    <Col>
                      <ProgressBar
                        variant={progressClass}
                        now={(recipe.recipe_score / 5.0) * 1e2}
                        label={`${recipe.recipe_score} / 5`}
                      />
                    </Col>
                  </Row>
                  {recipe.updated_at && (
                    <h4>
                      Last edited{' '}
                      {formatRelative(parseISO(recipe.updated_at), Date.now())}
                    </h4>
                  )}
                </Col>
              </Row>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <p>{recipe.description}</p>
            <Table striped>
              <thead>
                <tr>
                  <th className="text-right">%</th>
                  <th className="text-right">Vendor</th>
                  <th>Flavor</th>
                </tr>
              </thead>
              <tbody>
                {flavors.map((flavor) => (
                  <tr key={`${flavor.vendor}-${flavor.name}`}>
                    <td className="text-right">{flavor.millipercent / 1e3}</td>
                    <td className="text-right">{flavor.vendor}</td>
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
              {recipe.best_vg !== '0%' && (
                <Fragment>
                  <dt>Ideal VG %</dt>
                  <dd>{recipe.best_vg}</dd>
                </Fragment>
              )}
            </dl>
            <Accordion defaultActiveKey={null}>
              <Accordion.Toggle as={Button} variant="link">
                Toggle Reviews
              </Accordion.Toggle>
              <Accordion.Collapse>
                <Reviews reviews={recipe.reviews} />
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
      updated_at
      best_vg
      views
      recipe_flavors {
        name
        vendor
        millipercent
      }
      reviews {
        user
        text
      }
    }
  }
`;
