import React from "react";
import PropTypes from "prop-types";

export default function BBQTable({ bbqs }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr className="table-secondary">
          <th style={{ width: "10%" }}>BBQ ID</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {bbqs.map(bbq => {
          return (
            <tr key={bbq.id}>
              <td>{bbq.id}</td>
              <td>
                <pre>{new Date(bbq.date).toString()}</pre>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

BBQTable.propTypes = {
  bbqs: PropTypes.array.isRequired
};
