import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadOrders } from "../../redux/actions/orderActions";
import { loadUsers } from "../../redux/actions/userActions";
import PropTypes from "prop-types";
import Spinner from "../../Spinner";
import OrderTable from "./OrderTable";

const OrderHistory = (/*{ orders, loadOrders, ...props }*/) => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (orders.length === 0) {
      // loadOrders().catch(error => {
      //   alert("Loading courses failed: " + error);
      // });
      fetch("http://10.1.10.181:3001/Order/")
        .then(k => k.json())
        .then(k => setOrders(k));
    }
    if (users.length === 0) {
      fetch("http://10.1.10.181:3001/User/")
        .then(k => k.json())
        .then(k => setUsers(k));
    }
  });

  return (
    <div className="jumbotron">
      <h2>Orders</h2>
      {orders.length <= 0 || users.length <= 0 ? (
        <Spinner />
      ) : (
        <OrderTable orders={orders} users={users} />
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    orders: state.orders,
    users: state.users
  };
}

const mapDispatchToProps = {
  loadOrders,
  loadUsers
};

OrderHistory.propTypes = {
  loadOrders: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistory);
