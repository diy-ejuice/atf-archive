import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import { getVendorSlug } from '~utils';

export default function Vendors({ data }) {
  const vendors = data.allVendorsJson.nodes;

  vendors.sort((a, b) => a.name.localeCompare(b.name));

  function VendorRow({ index, style }) {
    const vendor = vendors[index];

    return (
      <Link to={getVendorSlug(vendor)}>
        <ListGroup.Item style={style}>
          <Row>
            <Col md={10}>{vendor.name}</Col>
            <Col md={2}>{vendor.flavors.count} flavors</Col>
          </Row>
        </ListGroup.Item>
      </Link>
    );
  }

  VendorRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object
  };

  return (
    <Layout>
      <SEO title="Vendors" />
      <Card>
        <Card.Header>
          <Card.Title>
            <h1>Vendors</h1>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <List
            height={800}
            itemData={vendors}
            itemCount={vendors.length}
            itemSize={60}
          >
            {VendorRow}
          </List>
        </Card.Body>
      </Card>
    </Layout>
  );
}

Vendors.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query {
    allVendorsJson {
      nodes {
        id
        name
        flavors {
          count
        }
      }
    }
  }
`;
