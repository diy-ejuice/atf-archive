import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import SortButtons from '~components/SortButtons';
import { getVendorSlug } from '~utils';

const sortKeys = {
  name: 'name',
  flavors: 'flavor count'
};

export default function Vendors({ data }) {
  const vendors = data.allVendorsJson.nodes;
  const [sortKey, setSortKey] = useState(sortKeys.name);

  switch (sortKey) {
    case sortKeys.name:
    default:
      vendors.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case sortKeys.flavors:
      vendors.sort((a, b) => b.flavors.count - a.flavors.count);
      break;
  }

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
          <SortButtons
            sortKey={sortKey}
            sortKeys={sortKeys}
            setSortKey={setSortKey}
          />
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
