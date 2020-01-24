import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, saveUser } from "../../redux/actions/userActions";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
import * as bcrypt from "bcryptjs";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function EmailBody({ body }) {
  return <div>{body}</div>;
}

export default function AccountRecoveryPage() {
  document.title = "𝘹𝘧BBQ - Account Recovery";

  const dispatch = useDispatch();

  const users = useSelector(state => state.users);
  if (users.length === 0) dispatch(loadUsers());

  const [body, setBody] = useState("");
  async function onSubmit(values) {
    if (users.value.some(user => values.user === user.Name)) {
      const userInRecovery = users.value.filter(
        user => user.Name === values.user
      )[0];
      const recoveryCode = Math.random() * 1000000000000000000;

      setBody(
        <>
          {"An email has been sent to " +
            userInRecovery.Name +
            " at " +
            userInRecovery.Email +
            ". Check this email for next steps."}
          <hr />
          {"Email body:"}
          <br />
          {"Hello."}
          <br />
          <br />
          <div>
            {"To move forward with password recovery, click "}
            <Link to="./RecoveryCode">here</Link>
            {"."}
          </div>
          <br />
          {"Your recovery code is: " + recoveryCode}
        </>
      );

      bcrypt.genSalt(13, function(err, salt) {
        bcrypt.hash(recoveryCode.toString(), salt, function(err, hash) {
          dispatch(
            saveUser({
              Id: userInRecovery.Id,
              Joindate: userInRecovery.Joindate,
              Type: userInRecovery.Type,
              Email: userInRecovery.Email,
              Lastlogindate: userInRecovery.Lastlogindate,
              Hash: userInRecovery.Hash,
              Name: userInRecovery.Name,
              Recoverycode: hash
            })
          );
        });
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
          </form>
        )}
      />
      <br />
      <EmailBody body={body} />
    </div>
  );
}

EmailBody.propTypes = {
  body: PropTypes.object.isRequired
};
