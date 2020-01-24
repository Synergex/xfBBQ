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
          meat: order.Meat,
          cheese: order.Cheese,
          doneness: order.Doneness,
          spicy: order.Spicy,
          type: order.Type,
          count: order.Count,
          burnt: order.Burnt,
          key: order.Id
        }
      ]
    };
  });

  // Combine orders together
  for (let index = modifiedOrders.length - 1; index >= 0; index--) {
    const prevIndex = index - 1;
    if (
      prevIndex >= 0 &&
      modifiedOrders[index].Bbqid === modifiedOrders[prevIndex].Bbqid &&
      modifiedOrders[index].Userid === modifiedOrders[prevIndex].Userid
    ) {
      modifiedOrders[prevIndex].theirOrders = modifiedOrders[
        prevIndex
      ].theirOrders.concat(modifiedOrders[index].theirOrders);
      modifiedOrders.splice(index, 1);
    }
  }

  let rowCounter = 0;
  return (
    <table className="table">
      <thead>
        <tr className="table-primary">
          <th style={{ width: "10%" }}>BBQ</th>
          <th>Placed By</th>
          <th>Order Date</th>
          <th>Order</th>
          <th style={{ width: "15%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {modifiedOrders.map(order => {
          if (login.Type === 3 && login.Id !== order.Userid) return <></>;
          return (
            <tr
              key={order.Id}
              className={rowCounter++ % 2 === 0 ? "table-secondary" : ""}
            >
              <td>{order.Bbqid}</td>
              <td>
                {users.value.filter(user => order.Userid === user.Id)[0].Name}
              </td>
              <td>{moment.unix(order.Orderdate).format("MM/DD/YYYY")}</td>
              <td>
                {order.theirOrders.map(theirOrder => {
                  return theirOrder.meat > 0 ? (
                    <div key={theirOrder.key}>
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
                    </div>
                  ) : (
                    <div key={theirOrder.key}>
                      {"Hotdog: "}
                      {orderEnums.hotdogType[theirOrder.type]}
                      <br />
                      {"Count: "}
                      {theirOrder.count}
                      <br />
                      {"Burnt: "}
                      {theirOrder.burnt === 1 ? "Yes" : "No"}
                      <br />
                      {"=========="}
                      <br />
                    </div>
                  );
                })}
              </td>
              <td>
                {bbqs.value &&
                bbqs.value.filter(bbq => bbq.Id === order.Bbqid).length > 0 &&
                moment
                  .unix(
                    bbqs.value.filter(bbq => bbq.Id === order.Bbqid)[0].Helddate
                  )
                  .isAfter(moment()) ? (
                  <>
                    <Link
                      to={{
                        pathname: "/NewOrderForm",
                        state: orders.filter(
                          orderIter =>
                            order.Userid === orderIter.Userid &&
                            order.Bbqid === orderIter.Bbqid
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
                          toast.info("Deleting order " + order.Id + "...");
                          orders
                            .filter(
                              orderIter =>
                                order.Userid === orderIter.Userid &&
                                order.Bbqid === orderIter.Bbqid
                            )
                            .forEach(order => dispatch(deleteOrder(order)));
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
  users: PropTypes.object.isRequired
};
