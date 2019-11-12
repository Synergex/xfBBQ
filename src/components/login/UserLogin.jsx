import React from "react";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, saveUser } from "../../redux/actions/userActions";
import { loginUser } from "../../redux/actions/loginActions";
import * as bcrypt from "bcryptjs";

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const users = useSelector(state => state.users);
  if (users.length === 0) dispatch(loadUsers());

  async function onSubmit(values) {
    const userArr = values.userArray.split(",");
    const user = users[parseInt(userArr[0]) - 1];

    bcrypt.compare(values.password, userArr[1], function(err, result) {
      if (result) {
        toast.success("Welcome to 𝘹𝘧BBQ, " + user.name);
        dispatch(
          loginUser({
            ...user,
            lastLoginDate: new Date().toJSON()
          })
        );
        dispatch(
          saveUser({
            ...user,
            lastLoginDate: new Date().toJSON()
          })
        );
        history.push("/");
      } else toast.error("Unable to login to 𝘹𝘧BBQ. Try again.");
    });
  }

  return (
    <div className="jumbotron">
      <h2>Login</h2>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h4>Who&apos;s logging in?</h4>
              <div>
                <Field
                  name="userArray"
                  component="select"
                  required
                  className="custom-select"
                >
                  <option />
                  {users.map(user => (
                    <option key={user.id} value={[user.id, user.hash]}>
                      {user.name}
                    </option>
                  ))}
                </Field>
              </div>
              <br />
              <div className="form-group">
                <label>Password:</label>
                <div>
                  <Field
                    name="password"
                    className="form-control"
                    component="input"
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={pristine || submitting}
                className="btn btn-primary"
              >
                Submit
              </button>{" "}
              <button
                type="button"
                disabled={pristine || submitting}
                className="btn btn-secondary"
                onClick={form.reset}
              >
                Reset Form
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
}
