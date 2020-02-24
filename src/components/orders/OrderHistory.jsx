import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrders } from "../../redux/actions/orderActions";
import { loadUsers } from "../../redux/actions/userActions";
import Spinner from "../../Spinner";
import OrderTable from "./OrderTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import initialState from "../../redux/reducers/initialState";

export default function OrderHistory() {
  document.title = "𝘹𝘧BBQ - Order History";

  // Gather information for order table
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const orders = useSelector(state => state.orders);
  const users = useSelector(state => state.users);
  useEffect(() => {
    dispatch(loadOrders());
    dispatch(loadUsers());
  }, [dispatch]);

  // Display results
  return (
    <div className="jumbotron">
      <Link to="/NewOrderForm">
        <button type="button" className="btn btn-primary float-right">
          New Order
        </button>
      </Link>
      <h2>Orders</h2>
      {orders.length <= 0 ||
      JSON.stringify(users) === JSON.stringify(initialState.users) ? (
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
