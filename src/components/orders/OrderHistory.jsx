import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrders } from "../../redux/actions/orderActions";
import { loadUsers } from "../../redux/actions/userActions";
import Spinner from "../../Spinner";
import OrderTable from "./OrderTable";
import { Link } from "react-router-dom";
import _ from "lodash";

let ranOnce = false;
export default function OrderHistory() {
  document.title = "𝘹𝘧BBQ - Order History";

  const dispatch = useDispatch();
  const login = useSelector(state => state.login);

  const orders = useSelector(state => state.orders);
  const users = useSelector(state => state.users);
  if (!ranOnce) {
    dispatch(loadOrders());
    dispatch(loadUsers());
    ranOnce = true;
  }

  return (
    <div className="jumbotron">
      <Link to="/NewOrderForm">
        <button type="button" className="btn btn-primary float-right">
          New Order
        </button>
      </Link>
      <h2>Orders</h2>
      {orders.length <= 0 || users.length <= 0 ? (
        <Spinner />
      ) : (
        <OrderTable
          orders={_.sortBy(orders.value, ["Bbqid", "Userid", "Id"])}
          users={users}
          login={login}
        />
      )}
    </div>
  );
}
