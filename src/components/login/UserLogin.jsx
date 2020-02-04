import React, { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, saveUser } from "../../redux/actions/userActions";
import { loginUser } from "../../redux/actions/loginActions";
import * as bcrypt from "bcryptjs";
import moment from "moment";

export default function LoginPage() {
  document.title = "𝘹𝘧BBQ - Login";

  const history = useHistory();

  // Load users
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  async function onSubmit(values) {
    let user;
    if (users) {
      user = users.value.filter(thisUser => values.user === thisUser.Name)[0];
    }

    if (user !== undefined) {
      bcrypt.compare(values.password, user.Hash, function(err, result) {
        if (result) {
          toast("Welcome to 𝘹𝘧BBQ, " + user.Name);
          dispatch(
            loginUser({
              ...user,
              Lastlogindate: parseInt(moment().format("X"))
            })
          );
          dispatch(
            saveUser({
              ...user,
              Recoverycode: "",
              Lastlogindate: parseInt(moment().format("X"))
            })
          );
          history.push("/");
        } else toast.error("Unable to login to 𝘹𝘧BBQ. Try again.");
      });
    } else toast.error("Unable to login to 𝘹𝘧BBQ. Try again.");
  }

  return (
    <div className="jumbotron">
      <div>
        <Link to="/AccountRecovery">
          <button type="button" className="btn btn-info float-right">
            Account Recovery
          </button>
        </Link>
        <Link to="/UserRegistrationForm">
          <button
            type="button"
            className="btn btn-info float-right"
            style={{ marginRight: "5px" }}
          >
            User Registration
          </button>
        </Link>
      </div>
      <h2>Login</h2>
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors = {};

          if (!values.user)
            errors.user = <p className="text-danger">Required</p>;
          if (!values.password)
            errors.password = <p className="text-danger">Required</p>;

          return Object.keys(errors).length ? errors : undefined;
        }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Field name="user">
                {({ input, meta }) => (
                  <div>
                    <label>Name:</label>
                    <input
                      {...input}
                      type="input"
                      placeholder="Name"
                      className="form-control"
                      required
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div className="form-group">
              <Field name="password">
                {({ input, meta }) => (
                  <div>
                    <label>Password:</label>
                    <input
                      {...input}
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      required
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
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
