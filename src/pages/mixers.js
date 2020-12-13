import { graphql, Link } from 'gatsby';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import {
  Col,
  Container,
  ListGroup,
  Row,
  FormControl,
  Card
} from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';

import Layout from '~components/Layout';
import SEO from '~components/SEO';
import { getMixerSlug } from '~utils';

export default function MixersPage({ data }) {
  const mixers = data.allMixersJson.nodes;
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSetSearchTerm = debounce(setSearchTerm, 250);
  const handleChangeTerm = useCallback(
    (event) => debouncedSetSearchTerm(event.target.value),
    [debouncedSetSearchTerm]
  );

  const filteredMixers = mixers.filter((mixer) => {
    const searchExpr = new RegExp(searchTerm, 'i');

    return searchTerm === '' || searchExpr.test(mixer.name);
  });

  filteredMixers.sort((a, b) => b.recipes.length - a.recipes.length);

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
      <Container>
        <Card>
          <Card.Header>
            <Card.Title>Mixers</Card.Title>
          </Card.Header>
          <Card.Body>
            <FormControl
              type="text"
              onChange={handleChangeTerm}
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
      </Container>
    </Layout>
  );
}

MixersPage.propTypes = {
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
