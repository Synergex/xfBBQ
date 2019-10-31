import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

export default function BBQTable({ bbqs }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr className="table-primary">
          <th>BBQ ID</th>
          <th>Date Created</th>
          <th>Date Held On</th>
        </tr>
      </thead>
      <tbody>
        {bbqs.map(bbq => {
          return (
            <tr
              key={bbq.id}
              className={bbq.id % 2 === 0 ? "table-secondary" : ""}
            >
              <td>{bbq.id}</td>
              <td>{moment(bbq.creationDate).format("MM/DD/YYYY")}</td>
              <td>{moment(bbq.heldDate).format("MM/DD/YYYY")}</td>
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
