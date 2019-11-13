import React from "react";
import PropTypes from "prop-types";
import * as orderEnums from "./orderEnums";
import moment from "moment";

export default function OrderTable({ orders, users, login }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr className="table-primary">
          <th style={{ width: "10%" }}>Order ID</th>
          <th style={{ width: "10%" }}>BBQ ID</th>
          <th style={{ width: "20%" }}>Order Date</th>
          <th>Placed By</th>
          <th>Order</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => {
          if (login.type === "Attendee" && login.id !== order.userID)
            return <></>;
          return (
            <tr
              key={order.id}
              className={order.id % 2 === 0 ? "table-secondary" : ""}
            >
              <td>{order.id}</td>
              <td>{order.bbqID}</td>
              <td>{moment(order.orderDate).format("MM/DD/YYYY")}</td>
              <td>{users.filter(user => order.userID === user.id)[0].name}</td>
              <td>
                <pre>
                  {order.cheese > -1
                    ? "Hamburger:\r\n" +
                      orderEnums.meatType[order.meat] +
                      (order.meat === 1
                        ? "\r\n" + orderEnums.beefDoneness[order.doneness]
                        : "") +
                      "\r\nCheese: " +
                      order.cheese +
                      "\r\nSpicy: " +
                      order.spicy
                    : "Hotdog:\r\n" +
                      orderEnums.hotdogType[order.type] +
                      "\r\nCount: " +
                      order.count +
                      "\r\nBurnt: " +
                      (order.burnt ? "Yes" : "No")}
                </pre>
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
