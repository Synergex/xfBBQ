import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../redux/actions/userActions";
import { loadOrders, deleteOrder } from "../../redux/actions/orderActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

let ranOnce = false;
export default function UserTable({ users }) {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const orders = useSelector(state => state.orders);
  if (!ranOnce) {
    dispatch(loadOrders());
    ranOnce = true;
  }

  return (
    <table className="table table-hover">
      <thead>
        <tr className="table-primary">
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Type</th>
          <th>Join Date</th>
          <th>Last Login Date</th>
          <th style={{ width: "15%" }}>Actions</th>
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
              <td>{user.email}</td>
              <td>{user.type}</td>
              <td>{moment(user.joinDate).format("MM/DD/YYYY")}</td>
              <td>
                {user.lastLoginDate === undefined
                  ? "Never"
                  : moment(user.lastLoginDate).format("MM/DD/YYYY")}
              </td>
              <td>
                <Link
                  to={{
                    pathname: "/UserRegistrationForm",
                    state: user
                  }}
                >
                  <button type="button" className="btn btn-primary btn-sm">
                    <span role="img" aria-label="edit">
                      📝
                    </span>
                  </button>
                </Link>
                {login.id === user.id ? (
                  <></>
                ) : (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this user?\r\nDeleting this user will also delete all orders this user has ever made."
                          )
                        ) {
                          toast.info("Deleting User " + user.id + "...");
                          dispatch(deleteUser(user));

                          orders.forEach(order => {
                            if (order.userID === user.id)
                              dispatch(deleteOrder(order));
                          });
                        }
                      }}
                    >
                      <span role="img" aria-label="delete">
                        🗑️
                      </span>
                    </button>
                  </>
                )}
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
