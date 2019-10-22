import React from "react";
import PropTypes from "prop-types";

export default function UserTable({ users }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr className="table-primary">
          <th style={{ width: "10%" }}>User ID</th>
          <th style={{ width: "30%" }}>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return (
            <tr
              key={user.id}
              className={user.id % 2 === 0 ? "table-secondary" : ""}
            >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.type}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired
};
