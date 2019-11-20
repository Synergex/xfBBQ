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
      <h2>Users</h2>
      {users.length <= 0 ? (
        <Spinner />
      ) : (
        <>
          <Link to="/UserRegistrationForm">
            <div className="text-right">
              <button type="button" className="btn btn-primary">
                New User
              </button>
            </div>
            <p />
          </Link>
          <UserTable users={users} />
        </>
      )}
    </div>
  );
}
