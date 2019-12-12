import React from "react";
import PropTypes from "prop-types";
import * as orderEnums from "./orderEnums";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadBBQs } from "../../redux/actions/bbqActions";
import { toast } from "react-toastify";
import { deleteOrder } from "../../redux/actions/orderActions";

export default function OrderTable({ orders, users, login }) {
  const dispatch = useDispatch();
  const bbqs = useSelector(state => state.bbqs);
  if (bbqs.length === 0) dispatch(loadBBQs());

  // Turn individual orders into an array of orders
  let modifiedOrders = orders.map(order => {
    return {
      ...order,
      theirOrders: [
        {
          meat: order.meat,
          cheese: order.cheese,
          doneness: order.doneness,
          spicy: order.spicy,
          type: order.type,
          count: order.count,
          burnt: order.burnt
        }
      ]
    };
  });

  // Combine orders together
  for (let index = modifiedOrders.length - 1; index >= 0; index--) {
    const prevIndex = index - 1;
    if (
      prevIndex >= 0 &&
      modifiedOrders[index].bbqID === modifiedOrders[prevIndex].bbqID &&
      modifiedOrders[index].userID === modifiedOrders[prevIndex].userID
    ) {
      modifiedOrders[prevIndex].theirOrders = modifiedOrders[
        prevIndex
      ].theirOrders.concat(modifiedOrders[index].theirOrders);
      modifiedOrders.splice(index, 1);
    }
  }

  let rowCounter = 0;
  return (
    <table className="table table-hover">
      <thead>
        <tr className="table-primary">
          <th style={{ width: "10%" }}>BBQ</th>
          <th>Order Date</th>
          <th>Placed By</th>
          <th>Order</th>
          <th style={{ width: "15%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {modifiedOrders.map(order => {
          if (login.type === "Attendee" && login.id !== order.userID)
            return <></>;
          return (
            <tr
              key={order.id}
              className={rowCounter++ % 2 === 0 ? "table-secondary" : ""}
            >
              <td>{order.bbqID}</td>
              <td>{moment(order.orderDate).format("MM/DD/YYYY")}</td>
              <td>{users.filter(user => order.userID === user.id)[0].name}</td>
              <td>
                {order.theirOrders.map(theirOrder => {
                  return theirOrder.cheese > -1 ? (
                    <>
                      {"Hamburger: "}
                      {orderEnums.meatType[theirOrder.meat]}
                      {theirOrder.meat === 1 ? (
                        <>
                          <br />
                          {orderEnums.beefDoneness[theirOrder.doneness]}
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      {"Cheese: "}
                      {theirOrder.cheese}
                      <br />
                      {"Spicy: "}
                      {theirOrder.spicy}
                      <br />
                      {"=========="}
                      <br />
                    </>
                  ) : (
                    <>
                      {"Hotdog: "}
                      {orderEnums.hotdogType[theirOrder.type]}
                      <br />
                      {"Count: "}
                      {theirOrder.count}
                      <br />
                      {"Burnt: "}
                      {theirOrder.burnt ? "Yes" : "No"}
                      <br />
                      {"=========="}
                      <br />
                    </>
                  );
                })}
              </td>
              <td>
                {bbqs.length > 0 &&
                bbqs.filter(bbq => bbq.id === order.bbqID).length > 0 &&
                moment(
                  bbqs.filter(bbq => bbq.id === order.bbqID)[0].heldDate
                ).isAfter(moment()) ? (
                  <>
                    <Link
                      to={{
                        pathname: "/NewOrderForm",
                        state: orders.filter(
                          orderIter =>
                            order.userID === orderIter.userID &&
                            order.bbqID === orderIter.bbqID
                        )
                      }}
                    >
                      <button type="button" className="btn btn-primary btn-sm">
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
                            "Are you sure you want to delete this order?"
                          )
                        ) {
                          toast.info("Deleting order " + order.id + "...");
                          dispatch(deleteOrder(order));
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
  );
}

OrderTable.propTypes = {
  login: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
};
