import { graphql, Link } from 'gatsby';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { Container, Card, FormControl } from 'react-bootstrap';
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

  filteredFlavors.sort((a, b) => a.name.localeCompare(b.name));

  function FlavorRow({ index, style }) {
    const flavor = filteredFlavors[index];

    return (
      <Card key={flavor.id} style={style}>
        <Card.Header>
          <Card.Title>
            <Link to={getFlavorSlug(flavor)}>
              {flavor.name} by {flavor.vendor.name}
            </Link>
          </Card.Title>
        </Card.Header>
      </Card>
    );
  }

  FlavorRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object
  };

  return (
    <Layout>
      <SEO title="Flavors" />
      <Container>
        <h1>Flavors</h1>
        <FormControl
          type="text"
          onChange={handleChangeTerm}
          placeholder="search by name or vendor"
        />
        <List
          height={800}
          itemData={filteredFlavors}
          itemCount={filteredFlavors.length}
          itemSize={60}
        >
          {FlavorRow}
        </List>
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
        vendor {
          name
          abbreviation
        }
      }
    }
  }
`;
