import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function Reviews({ reviews }) {
  return (
    reviews &&
    reviews.map((review) => (
      <Card key={review.user}>
        <Card.Header>
          <Card.Title>{review.user}</Card.Title>
          <p>Score: {review.score}/5</p>
        </Card.Header>
        <Card.Body>{review.text}</Card.Body>
      </Card>
    ))
  );
}

Reviews.propTypes = {
  recipe: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
};
