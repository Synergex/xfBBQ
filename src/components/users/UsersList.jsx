import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../redux/actions/userActions";
import Spinner from "../../Spinner";
import UserTable from "./UserTable";
import { Link } from "react-router-dom";

export default function UserList() {
  document.title = "𝘹𝘧BBQ - Users";

  const dispatch = useDispatch();

  const users = useSelector(state => state.users);
  if (users.length === 0 || (users.length !== 0 && users[0].id !== 1))
    dispatch(loadUsers());

  return (
    <div className="jumbotron">
      <Link to="/UserRegistrationForm">
        <button type="button" className="btn btn-primary float-right">
          New User
        </button>
      </Link>
      <h2>Users</h2>
      {users.length <= 0 ? <Spinner /> : <UserTable users={users} />}
    </div>
  );
}
