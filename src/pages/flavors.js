import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { FormControl, ListGroup, Row, Col, Card } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import useSearch from '~components/useSearch';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import { getFlavorSlug } from '~utils';

export default function Flavors({ data }) {
  const flavors = data.allFlavorsJson.nodes;
  const { searchTerm, onChange } = useSearch();

  const filteredFlavors = flavors.filter((flavor) => {
    const searchExpr = new RegExp(searchTerm, 'i');

    return (
      searchTerm === '' ||
      searchExpr.test(flavor.name) ||
      searchExpr.test(flavor.vendor.name) ||
      searchExpr.test(flavor.vendor.abbreviation)
    );
  });

  filteredFlavors.sort((a, b) => b.recipe_count - a.recipe_count);

  function FlavorRow({ index, style }) {
    const flavor = filteredFlavors[index];

    return (
      <Link key={flavor.id} to={getFlavorSlug(flavor)}>
        <ListGroup.Item style={style}>
          <Row>
            <Col md={10}>
              {flavor.vendor.name} {flavor.name}
            </Col>
            <Col md={2}>{flavor.recipe_count} recipes</Col>
          </Row>
        </ListGroup.Item>
      </Link>
    );
  }

  FlavorRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object
  };

  return (
    <Layout>
      <SEO title="Flavors" description={`Tracking ${flavors.length} flavors`} />
      <Card>
        <Card.Header>
          <Card.Title>
            <h1>Flavors</h1>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <FormControl
            type="text"
            onChange={onChange}
            placeholder="search by name or vendor"
          />
          <ListGroup variant="flush">
            <List
              height={800}
              itemData={filteredFlavors}
              itemCount={filteredFlavors.length}
              itemSize={60}
            >
              {FlavorRow}
            </List>
          </ListGroup>
        </Card.Body>
      </Card>
    </Layout>
  );
}

Flavors.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query {
    allFlavorsJson {
      nodes {
        id
        name
        recipe_count
        vendor {
          name
          abbreviation
        }
      }
    }
  }
`;
