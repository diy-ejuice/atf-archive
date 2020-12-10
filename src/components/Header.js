import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEyeDropper,
  faList,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faRedditAlien,
  faGithub
} from '@fortawesome/free-brands-svg-icons';

const Header = ({ siteTitle }) => (
  <Navbar bg="info" variant="dark" expand="lg">
    <Navbar.Brand>
      <Link to="/">
        <FontAwesomeIcon icon={faEyeDropper} /> {siteTitle}
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
        <Nav.Link as={Link} to="/flavors">
          <FontAwesomeIcon icon={faEyeDropper} /> Flavors
        </Nav.Link>
        <Nav.Link as={Link} to="/recipes">
          <FontAwesomeIcon icon={faList} /> Recipes
        </Nav.Link>
        <Nav.Link as={Link} to="/mixers">
          <FontAwesomeIcon icon={faUser} /> Mixers
        </Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Link
          href="https://reddit.com/r/DIY_eJuice"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faRedditAlien} size="lg" /> /r/DIY_eJuice
        </Nav.Link>
        <Nav.Link
          href="http://link.diyejuice.org/discord"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faDiscord} size="lg" /> Discord
        </Nav.Link>
        <Nav.Link
          href="https://github.com/diy-ejuice/atf-archive"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" /> GitHub
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
