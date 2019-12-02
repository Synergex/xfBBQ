import React from "react";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as bcrypt from "bcryptjs";
import { saveUser } from "../../redux/actions/userActions";
import isEmpty from "./../../scripts/isEmpty";
import PropTypes from "prop-types";

export default function UserRegistrationForm({ ...props }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = props.location.state;
  const userRecovery =
    user !== null && user !== undefined ? user.recovery : null;
  const userPresent = user !== null && user !== undefined;
  document.title = userPresent
    ? userRecovery
      ? "𝘹𝘧BBQ - Recover User"
      : "𝘹𝘧BBQ - Modify Existing User"
    : "𝘹𝘧BBQ - New User Registration";

  const login = useSelector(state => state.login);

  async function onSubmit(values) {
    bcrypt.genSalt(13, function(err, salt) {
      bcrypt.hash(values.hash, salt, function(err, hash) {
        dispatch(
          saveUser(
            userPresent
              ? {
                  ...values,
                  type: values.type,
                  hash,
                  id: user.id,
                  joinDate: user.joinDate,
                  lastLoginDate: user.lastLoginDate
                }
              : {
                  ...values,
                  hash,
                  joinDate: new Date().toJSON(),
                  type: values.type === undefined ? "Attendee" : values.type
                }
          )
        );
      });
    });

    toast.info(
      userPresent
        ? userRecovery
          ? "Recovering user..."
          : "Modifying user..."
        : "Adding user..."
    );
    history.push(isEmpty(login) || userRecovery ? "/Login" : "/UsersList");
  }

  return (
    <div className="jumbotron">
      <h2>
        {userPresent
          ? userRecovery
            ? "User Recovery"
            : "User Modification"
          : "User Registration"}
      </h2>
      <Form
        initialValues={
          userPresent
            ? { name: user.name, email: user.email, type: user.type }
            : {}
        }
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <div>
                <Field
                  name="name"
                  className="form-control"
                  component="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <div>
                <Field
                  name="email"
                  className="form-control"
                  component="input"
                  type="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="form-group">
              <label>{userRecovery ? "New Password:" : "Password:"}</label>
              <div>
                <Field
                  name="hash"
                  className="form-control"
                  component="input"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>

            {!isEmpty(login) && login.type === "Administrator" ? (
              <div className="form-group">
                <label>Type:</label>
                <div>
                  <Field
                    name="type"
                    component="select"
                    className="form-control"
                  >
                    <option />
                    <option value="Administrator">Administrator</option>
                    <option value="Host">Host</option>
                    <option value="Attendee">Attendee</option>
                  </Field>
                </div>
              </div>
            ) : (
              <></>
            )}

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

UserRegistrationForm.propTypes = {
  location: PropTypes.object.isRequired
};
