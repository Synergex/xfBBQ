import React from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/loginActions";
import Spinner from "./../../Spinner";

export default function LogoutPage() {
  document.title = "𝘹𝘧BBQ - Logout";

  const history = useHistory();
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(logoutUser());
    history.push("/");
    toast.success("Successfully logged out");
  }, 2500);

  return (
    <div className="jumbotron">
      <center>
        <h2>kthxbye</h2>
      </center>
      <br />
      <Spinner />
    </div>
  );
}
