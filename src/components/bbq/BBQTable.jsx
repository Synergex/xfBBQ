import React, { useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteBBQ } from "../../redux/actions/bbqActions";
import { loadOrders, deleteOrder } from "../../redux/actions/orderActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function BBQTable({ bbqs }) {
  // Get orders
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders);
  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  let rowCounter = 0;
  return (
    <>
      <table className="table">
        <thead>
          <tr className="table-primary">
            <th>BBQ ID</th>
            <th>Date Created</th>
            <th>Date Held On</th>
            <th style={{ width: "20%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bbqs.value.map(bbq => {
            return (
              <tr
                key={bbq.Id}
                className={rowCounter++ % 2 === 0 ? "table-secondary" : ""}
              >
                <td>{bbq.Id}</td>
                <td>{moment.unix(bbq.Creationdate).format("MM/DD/YYYY")}</td>
                <td>{moment.unix(bbq.Helddate).format("MM/DD/YYYY")}</td>
                <td>
                  {moment.unix(bbq.Helddate).isAfter(moment()) ? (
                    <>
                      <Link
                        to={{
                          pathname: "/BBQRegistrationForm",
                          state: bbq
                        }}
                      >
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                        >
                          <span role="img" aria-label="edit">
                            📝
                          </span>
                        </button>
                      </Link>{" "}
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this BBQ?\r\nDeleting this BBQ will also delete all orders under it."
                            )
                          ) {
                            toast.info("Deleting BBQ " + bbq.Id + "...");
                            dispatch(deleteBBQ(bbq));

                            orders.value.forEach(order => {
                              if (order.Bbqid === bbq.Id)
                                dispatch(deleteOrder(order));
                            });
                          }
                        }}
                      >
                        <span role="img" aria-label="delete">
                          🗑️
                        </span>
                      </button>{" "}
                      <Link
                        to={{
                          pathname: "/BBQCookingInformation",
                          state: bbq
                        }}
                      >
                        <button type="button" className="btn btn-info btn-sm">
                          <span role="img" aria-label="View Orders">
                            🍔
                          </span>
                        </button>
                      </Link>
                    </>
                  ) : (
                    <i>No actions available</i>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

BBQTable.propTypes = {
  bbqs: PropTypes.object.isRequired
};
