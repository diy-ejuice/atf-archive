import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Col, Row, ListGroup, FormControl } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import useSearch from '~components/useSearch';
import { getFlavorSlug } from '~utils';

export default function Vendor({ data }) {
  const vendor = data.vendorsJson;
  const flavors = data.allFlavorsJson.nodes;
  const { searchTerm, onChange } = useSearch();

  const filteredFlavors = flavors.filter((flavor) => {
    const searchExpr = new RegExp(searchTerm, 'i');

    return searchTerm === '' || searchExpr.test(flavor.name);
  });

  filteredFlavors.sort((a, b) => a.name.localeCompare(b.name));

  function FlavorRow({ index, style }) {
    const flavor = filteredFlavors[index];

    return (
      <Link to={getFlavorSlug(flavor)}>
        <ListGroup.Item style={style}>
          <Row>
            <Col md={10}>{flavor.name}</Col>
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

  const title = vendor.name;
  const description = `${vendor.flavors.count} flavors`;

  return (
    <Layout>
      <SEO title={title} description={description} />
      <Card>
        <Card.Header>
          <Card.Title>
            <h1>{vendor.name}</h1>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <FormControl
            type="text"
            onChange={onChange}
            placeholder="search by name"
          />
          <List
            height={800}
            itemData={filteredFlavors}
            itemCount={filteredFlavors.length}
            itemSize={60}
          >
            {FlavorRow}
          </List>
        </Card.Body>
      </Card>
    </Layout>
  );
}

Vendor.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query($id: String, $name: String) {
    vendorsJson(id: { eq: $id }) {
      name
      flavors {
        count
      }
    }

    allFlavorsJson(filter: { vendor: { name: { eq: $name } } }) {
      nodes {
        id
        name
        recipe_count
        vendor {
          abbreviation
        }
      }
    }
  }
`;
