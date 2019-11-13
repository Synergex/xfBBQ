import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrders } from "../../redux/actions/orderActions";
import { loadUsers } from "../../redux/actions/userActions";
import Spinner from "../../Spinner";
import OrderTable from "./OrderTable";

export default function OrderHistory() {
  document.title = "𝘹𝘧BBQ - Order History";

  const dispatch = useDispatch();
  const login = useSelector(state => state.login);

  const orders = useSelector(state => state.orders);
  if (orders.length === 0 || (orders.length !== 0 && orders[0].id !== 1))
    dispatch(loadOrders());
  const users = useSelector(state => state.users);
  if (users.length === 0) dispatch(loadUsers());

  return (
    <div className="jumbotron">
      <h2>Orders</h2>
      {orders.length <= 0 || users.length <= 0 ? (
        <Spinner />
      ) : (
        <OrderTable orders={orders} users={users} login={login} />
      )}
    </div>
  );
}
