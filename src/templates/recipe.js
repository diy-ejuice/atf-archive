import { formatRelative, parseISO } from 'date-fns';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Card, Container, Row, Col, ProgressBar, Image } from 'react-bootstrap';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import Reviews from '~components/Reviews';
import Flavors from '~components/Flavors';
import { getMixerSlug } from '~utils';

export default function RecipePage({ data }) {
  const recipe = data.recipesJson;
  const { recipe_flavors: flavors, reviews } = recipe.recipe_flavors;

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
    case 0:
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
                </Col>
              </Row>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <p>{recipe.description}</p>
            {recipe.updated_at && (
              <p>
                Last edited{' '}
                {formatRelative(parseISO(recipe.updated_at), Date.now())}
              </p>
            )}
            <Flavors flavors={flavors} />
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
            <Reviews reviews={reviews} />
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
