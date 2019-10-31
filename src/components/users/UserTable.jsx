import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

export default function UserTable({ users }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr className="table-primary">
          <th>User ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Join Date</th>
          <th>Last Login Date</th>
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
              <td>{moment(user.joinDate).format("MM/DD/YYYY")}</td>
              <td>
                {user.lastLoginDate === undefined
                  ? "Never"
                  : moment(user.lastLoginDate).format("MM/DD/YYYY")}
              </td>
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
