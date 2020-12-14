import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Col, ListGroup, Row, FormControl, Card } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import useSearch from '~components/useSearch';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import SortButtons from '~components/SortButtons';
import { getMixerSlug } from '~utils';

const sortKeys = {
  name: 'name',
  recipes: 'recipe count'
};

export default function Mixers({ data }) {
  const mixers = data.allMixersJson.nodes;
  const { searchTerm, onChange } = useSearch();
  const [sortKey, setSortKey] = useState(sortKeys.recipes);

  const filteredMixers = mixers.filter((mixer) => {
    const searchExpr = new RegExp(searchTerm, 'i');

    return searchTerm === '' || searchExpr.test(mixer.name);
  });

  switch (sortKey) {
    case sortKeys.name:
      filteredMixers.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case sortKeys.recipes:
    default:
      filteredMixers.sort((a, b) => b.recipes.length - a.recipes.length);
      break;
  }

  function MixerRow({ index, style }) {
    const mixer = filteredMixers[index];

    return (
      <Link key={index} to={getMixerSlug(mixer)}>
        <ListGroup.Item style={style}>
          <Row>
            <Col md={10}>{mixer.name}</Col>
            <Col md={2}>{mixer.recipes.length} recipes</Col>
          </Row>
        </ListGroup.Item>
      </Link>
    );
  }

  MixerRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object
  };

  return (
    <Layout>
      <SEO title="Mixers" description={`Tracking ${mixers.length} mixers`} />
      <Card>
        <Card.Header>
          <Card.Title>
            <h1>Mixers</h1>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <SortButtons
            sortKey={sortKey}
            sortKeys={sortKeys}
            setSortKey={setSortKey}
          />
          <FormControl
            type="text"
            onChange={onChange}
            placeholder="search by name"
          />
          <ListGroup variant="flush">
            <List
              height={800}
              itemData={filteredMixers}
              itemCount={filteredMixers.length}
              itemSize={60}
            >
              {MixerRow}
            </List>
          </ListGroup>
        </Card.Body>
      </Card>
    </Layout>
  );
}

Mixers.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query {
    allMixersJson {
      nodes {
        name
        recipes
      }
    }
  }
`;
