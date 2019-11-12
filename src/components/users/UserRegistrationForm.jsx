import React from "react";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as bcrypt from "bcryptjs";
import { saveUser } from "../../redux/actions/userActions";

export default function UserRegistrationForm() {
  document.title = "𝘹𝘧BBQ - New User Registration";

  const history = useHistory();
  const dispatch = useDispatch();

  async function onSubmit(values) {
    bcrypt.genSalt(15, function(err, salt) {
      bcrypt.hash(values.hash, salt, function(err, hash) {
        dispatch(
          saveUser({
            ...values,
            hash,
            joinDate: new Date().toJSON()
          })
        );
      });
    });

    toast.success("Added user successfully");
    history.push("/UsersList");
  }

  return (
    <div className="jumbotron">
      <h2>User Registration</h2>
      <Form
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
              <label>Password:</label>
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
            <div className="form-group">
              <label>Type:</label>
              <div>
                <Field name="type" component="select" className="form-control">
                  <option />
                  <option value="Administrator">Administrator</option>
                  <option value="Host">Host</option>
                  <option value="Attendee">Attendee</option>
                </Field>
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
