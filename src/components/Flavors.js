import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'react-bootstrap';

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
              <td className="text-right">{flavor.vendor}</td>
              <td>{flavor.name}</td>
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
