import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteBBQ } from "../../redux/actions/bbqActions";
import { loadOrders, deleteOrder } from "../../redux/actions/orderActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

let ranOnce = false;
export default function BBQTable({ bbqs }) {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders);
  if (!ranOnce) {
    dispatch(loadOrders());
    ranOnce = true;
  }

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
          {bbqs.map(bbq => {
            return (
              <tr
                key={bbq.id}
                className={rowCounter++ % 2 === 0 ? "table-secondary" : ""}
              >
                <td>{bbq.id}</td>
                <td>{moment(bbq.creationDate).format("MM/DD/YYYY")}</td>
                <td>{moment(bbq.heldDate).format("MM/DD/YYYY")}</td>
                <td>
                  {moment(bbq.heldDate).isAfter(moment()) ? (
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
                            toast.info("Deleting BBQ " + bbq.id + "...");
                            dispatch(deleteBBQ(bbq));

                            orders.forEach(order => {
                              if (order.bbqID === bbq.id)
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
  bbqs: PropTypes.array.isRequired
};
