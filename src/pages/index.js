import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Layout from '~components/Layout';
import SEO from '~components/SEO';

export default function Index() {
  return (
    <Layout>
      <SEO title="Home" />
      <Row>
        <Col>
          <h1>Welcome to the ATF Archive.</h1>
        </Col>
      </Row>
      <Row>
        <Col>This site provides a mirror of All The Flavors recipes.</Col>
      </Row>
    </Layout>
  );
}
