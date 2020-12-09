import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="my-md-4 pt-md-4 text-right">
      <Container>
        <Row>
          <Col>Recipes are property of their respective creators.</Col>
        </Row>
      </Container>
    </footer>
  );
}
