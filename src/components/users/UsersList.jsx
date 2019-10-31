import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../redux/actions/userActions";
import Spinner from "../../Spinner";
import UserTable from "./UserTable";

export default function UserList() {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users);
  if (users.length === 0 || (users.length !== 0 && users[0].id !== 1))
    dispatch(loadUsers());

  return (
    <div className="jumbotron">
      <h2>Users</h2>
      {users.length <= 0 ? <Spinner /> : <UserTable users={users} />}
    </div>
  );
}
