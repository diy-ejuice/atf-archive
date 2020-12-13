import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'react-bootstrap';

import { getFlavorSlug } from '~utils';

export default function Flavors({ flavors }) {
  return (
    flavors?.length > 0 && (
      <Table striped>
        <thead>
          <tr>
            <th className="text-right">%</th>
            <th className="text-right">Vendor</th>
            <th>Flavor</th>
          </tr>
        </thead>
        <tbody>
          {flavors.map((flavor) => (
            <tr key={`${flavor.vendor}-${flavor.name}`}>
              <td className="text-right">{flavor.millipercent / 1e3}</td>
              <td className="text-right">{flavor.vendor.abbreviation}</td>
              <td>
                <Link to={getFlavorSlug(flavor)}>{flavor.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  );
}

Flavors.propTypes = {
  flavors: PropTypes.arrayOf(PropTypes.object).isRequired
};
