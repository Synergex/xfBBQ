import React from "react";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { saveBBQ } from "../../redux/actions/bbqActions";
import { useDispatch } from "react-redux";
import moment from "moment";

export default function BBQRegistrationForm() {
  document.title = "𝘹𝘧BBQ - Create New BBQ";

  const history = useHistory();
  const dispatch = useDispatch();

  async function onSubmit(values) {
    dispatch(
      saveBBQ({
        ...values,
        heldDate: moment(values.heldDate).toJSON(),
        creationDate: new Date().toJSON()
      })
    );

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
