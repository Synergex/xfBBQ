import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, saveUser } from "../../redux/actions/userActions";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
import * as bcrypt from "bcryptjs";
import PropTypes from "prop-types";

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
    const userArr = values.userArray.split(",");
    const recoveryCode = Math.random() * 1000000000000000000;

    setBody(
      <>
        {"An email has been sent to " +
          userArr[1] +
          " at " +
          userArr[2] +
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

    const user = users[parseInt(userArr[0]) - 1];
    bcrypt.genSalt(13, function(err, salt) {
      bcrypt.hash(recoveryCode.toString(), salt, function(err, hash) {
        dispatch(saveUser({ ...user, recoveryCode: hash }));
      });
    });
  }

  return (
    <div className="jumbotron">
      <h2>Account Recovery</h2>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h5>Select a name:</h5>
              <div>
                <Field
                  name="userArray"
                  component="select"
                  required
                  className="custom-select"
                >
                  <option />
                  {users.map(user => (
                    <option
                      key={user.id}
                      value={[user.id, user.name, user.email]}
                    >
                      {user.name}
                    </option>
                  ))}
                </Field>
              </div>
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
