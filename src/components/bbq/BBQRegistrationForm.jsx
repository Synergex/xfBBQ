import React from "react";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import BBQRegistrationFormToRedux from "./BBQRegistrationFormToRedux";
import { useHistory } from "react-router-dom";
import sleep from "../../scripts/sleep";

export default function BBQRegistrationForm() {
  const history = useHistory();

  async function onSubmit() {
    await sleep(250);
    toast.success("Added BBQ successfully");
    history.push("/BBQList");
  }

  return (
    <div className="jumbotron">
      <h2>Create BBQ</h2>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <BBQRegistrationFormToRedux />
            <div className="form-group">
              <label>Date to be held:</label>
              <div>
                <Field
                  name="heldDate"
                  className="form-control"
                  component="input"
                  type="date"
                  placeholder="Date Held"
                />
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
