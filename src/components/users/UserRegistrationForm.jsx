import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as bcrypt from "bcryptjs";
import { saveUser } from "../../redux/actions/userActions";
import isEmpty from "./../../scripts/isEmpty";
import PropTypes from "prop-types";
import moment from "moment";
import ReCAPTCHA from "react-google-recaptcha";

export default function UserRegistrationForm({ ...props }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [captchaValue, setCaptchaValue] = useState(null);

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
                  Id: user.Id,
                  Joindate: user.Joindate,
                  Type: values.type,
                  Email: values.email,
                  Lastlogindate: user.Lastlogindate,
                  Hash: hash,
                  Name: values.name
                }
              : {
                  Joindate: parseInt(moment().format("X")),
                  Type: values.type === undefined ? 3 : values.type,
                  Email: values.email,
                  Hash: hash,
                  Name: values.name
                },
            captchaValue
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
            ? { name: user.Name, email: user.Email, type: user.Type }
            : { type: 3 }
        }
        onSubmit={onSubmit}
        validate={values => {
          const errors = {};

          if (!values.name)
            errors.name = <p className="text-danger">Required</p>;
          if (!values.email)
            errors.email = <p className="text-danger">Required</p>;
          if (!values.hash)
            errors.hash = <p className="text-danger">Required</p>;
          if (!values.hash2)
            errors.hash2 = <p className="text-danger">Required</p>;
          else if (values.hash !== values.hash2)
            errors.hash2 = (
              <p className="text-danger">Passwords do not match</p>
            );
          if (!values.type)
            errors.type = <p className="text-danger">Required</p>;

          return Object.keys(errors).length ? errors : undefined;
        }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Field name="name">
                {({ input, meta }) => (
                  <div>
                    <label>Name:</label>
                    <input
                      {...input}
                      type="text"
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
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <label>Email:</label>
                    <input
                      {...input}
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      required
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>
            <div className="form-group">
              <Field name="hash">
                {({ input, meta }) => (
                  <div>
                    <label>
                      {userRecovery ? "New Password:" : "Password:"}
                    </label>
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
            <div className="form-group">
              <Field name="hash2">
                {({ input, meta }) => (
                  <div>
                    <label>Confirm Password:</label>
                    <input
                      {...input}
                      type="password"
                      placeholder="Confirm Password"
                      className="form-control"
                      required
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            {!isEmpty(login) && login.Type === 1 ? (
              <div className="form-group">
                <div>
                  <Field name="type">
                    {({ input, meta }) => (
                      <div>
                        <label>Type:</label>
                        <select
                          {...input}
                          type="select"
                          className="custom-select"
                          required
                        >
                          <option value="" disabled>
                            Pick an Account Type
                          </option>
                          <option value="1">Administrator</option>
                          <option value="2">Host</option>
                          <option value="3">Attendee</option>
                        </select>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </div>
            ) : (
              <></>
            )}
            <ReCAPTCHA
              theme="dark"
              sitekey="6LfJ6dsUAAAAAFwaXDIGHHhwiFe7oNhLBP-S66OQ"
              onChange={value => setCaptchaValue(value)}
            />
            <br />
            <div>
              <button
                type="submit"
                disabled={pristine || submitting || captchaValue === null}
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
