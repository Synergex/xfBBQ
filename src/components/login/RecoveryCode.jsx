import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, saveUser } from "../../redux/actions/userActions";
import { Field, Form } from "react-final-form";
import * as bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function RecoveryCode() {
  document.title = "𝘹𝘧BBQ - Account Recovery";

  const dispatch = useDispatch();
  const history = useHistory();

  const users = useSelector(state => state.users);
  if (users.length === 0) dispatch(loadUsers());

  async function onSubmit(values) {
    if (users.value.some(user => values.user === user.Name)) {
      const userInRecovery = users.value.filter(
        user => user.Name === values.user
      )[0];

      bcrypt.compare(values.recoveryCode, userInRecovery.Recoverycode, function(
        err,
        result
      ) {
        if (result) {
          bcrypt.genSalt(13, function(err, salt) {
            bcrypt.hash(values.hash, salt, function(err, hash) {
              dispatch(
                saveUser({
                  Id: userInRecovery.Id,
                  Joindate: userInRecovery.Joindate,
                  Type: userInRecovery.Type,
                  Email: userInRecovery.Email,
                  Lastlogindate: userInRecovery.Lastlogindate,
                  Hash: hash,
                  Name: userInRecovery.Name
                })
              );
            });
          });
          toast.info("Password successfully changed.");
          history.push("/Login");
        } else toast.error("Bad recovery code. Try again.");
      });
    } else toast.error("This user does not exist.");
  }

  return (
    <div className="jumbotron">
      <h2>Account Recovery</h2>
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors = {};

          if (!values.user)
            errors.user = <p className="text-danger">Required</p>;
          if (!values.recoveryCode)
            errors.recoveryCode = <p className="text-danger">Required</p>;
          if (!values.hash)
            errors.hash = <p className="text-danger">Required</p>;
          if (!values.hash2)
            errors.hash2 = <p className="text-danger">Required</p>;
          else if (values.hash !== values.hash2)
            errors.hash2 = (
              <p className="text-danger">Passwords do not match</p>
            );

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
              <Field name="recoveryCode">
                {({ input, meta }) => (
                  <div>
                    <label>Recovery Code:</label>
                    <input
                      {...input}
                      type="password"
                      placeholder="Recovery Code"
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
                    <label>New Password:</label>
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
