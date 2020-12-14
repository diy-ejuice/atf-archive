import PropTypes from 'prop-types';
import React from 'react';
import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';

export default function SortButtons({ sortKey, sortKeys, setSortKey }) {
  return (
    <Row className="mb-3">
      <Col>
        Sort by{' '}
        <ButtonGroup>
          {Object.entries(sortKeys).map(([key, value]) => (
            <Button
              key={key}
              active={sortKey === value}
              onClick={() => setSortKey(value)}
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </Col>
    </Row>
  );
}

SortButtons.propTypes = {
  sortKey: PropTypes.string,
  sortKeys: PropTypes.object.isRequired,
  setSortKey: PropTypes.func.isRequired
};
