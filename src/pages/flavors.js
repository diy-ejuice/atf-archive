import { graphql, Link } from 'gatsby';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import {
  Container,
  FormControl,
  ListGroup,
  Row,
  Col,
  Card
} from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import { getFlavorSlug } from '~utils';

export default function FlavorsPage({ data }) {
  const flavors = data.allFlavorsJson.nodes;
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSetSearchTerm = debounce(setSearchTerm, 250);
  const handleChangeTerm = useCallback(
    (event) => debouncedSetSearchTerm(event.target.value),
    [debouncedSetSearchTerm]
  );

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
      <Container>
        <Card>
          <Card.Header>
            <Card.Title>Flavors</Card.Title>
          </Card.Header>
          <Card.Body>
            <FormControl
              type="text"
              onChange={handleChangeTerm}
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
      </Container>
    </Layout>
  );
}

FlavorsPage.propTypes = {
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
