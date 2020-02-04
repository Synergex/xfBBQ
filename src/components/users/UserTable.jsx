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

  let rowCounter = 0;
  return (
    <table className="table">
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
        {users.value.map(user => {
          return (
            <tr
              key={user.Id}
              className={rowCounter++ % 2 === 0 ? "table-secondary" : ""}
            >
              <td>{user.Id}</td>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>
                {user.Type === 1
                  ? "Administrator"
                  : user.Type === 2
                  ? "Host"
                  : "Attendee"}
              </td>
              <td>{moment.unix(user.Joindate).format("MM/DD/YYYY")}</td>
              <td>
                {user.Lastlogindate === 0
                  ? "Never"
                  : moment.unix(user.Lastlogindate).format("MM/DD/YYYY")}
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
                {login.Id === user.Id ? (
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
                          toast.info("Deleting User " + user.Id + "...");
                          dispatch(deleteUser(user));

                          orders.value.forEach(order => {
                            if (order.Userid === user.Id)
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
  users: PropTypes.object.isRequired
};
