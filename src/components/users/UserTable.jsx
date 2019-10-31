import React from "react";
import PropTypes from "prop-types";

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
              <td>
                <pre>
                  {new Date(user.joinDate)
                    .toString()
                    .substring(
                      4,
                      new Date(user.joinDate).toString().indexOf("(") - 1
                    )}
                </pre>
              </td>
              <td>
                <pre>
                  {user.lastLoginDate === undefined
                    ? "Never"
                    : new Date(user.joinDate)
                        .toString()
                        .substring(
                          4,
                          new Date(user.lastLoginDate).toString().indexOf("(") -
                            1
                        )}
                </pre>
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
