import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../redux/actions/userActions";
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
    const userArr = values.userArray.split(",");

    bcrypt.compare(values.recoveryCode, userArr[7], function(err, result) {
      if (result) {
        history.push("/UserRegistrationForm", {
          id: userArr[0],
          name: userArr[1],
          hash: userArr[2],
          type: userArr[3],
          email: userArr[4],
          joinDate: userArr[5],
          lastLoginDate: userArr[6],
          recovery: true
        });
      } else toast.error("Bad recovery code. Try again.");
    });
  }

  return (
    <div className="jumbotron">
      <h2>Account Recovery</h2>
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors = {};

          if (!values.userArray)
            errors.userArray = <p className="text-danger">Required</p>;
          if (!values.recoveryCode)
            errors.recoveryCode = <p className="text-danger">Required</p>;

          return Object.keys(errors).length ? errors : undefined;
        }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Field name="userArray">
                {({ input, meta }) => (
                  <div>
                    <label>Name:</label>
                    <select
                      {...input}
                      type="select"
                      className="custom-select"
                      required
                    >
                      <option value="" disabled>
                        Select a name
                      </option>
                      {users.map(user => (
                        <option
                          key={user.id}
                          value={[
                            [
                              user.id,
                              user.name,
                              user.hash,
                              user.type,
                              user.email,
                              user.joinDate,
                              user.lastLoginDate,
                              user.recoveryCode
                            ]
                          ]}
                        >
                          {user.name}
                        </option>
                      ))}
                    </select>
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
