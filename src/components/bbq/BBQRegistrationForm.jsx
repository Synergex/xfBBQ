import React from "react";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { saveBBQ } from "../../redux/actions/bbqActions";
import { useDispatch } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";

export default function BBQRegistrationForm({ ...props }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const bbq = props.location.state;
  const bbqPresent = bbq !== null && bbq !== undefined;
  document.title = bbqPresent
    ? "𝘹𝘧BBQ - Modify Existing BBQ"
    : "𝘹𝘧BBQ - Create New BBQ";

  async function onSubmit(values) {
    dispatch(
      saveBBQ(
        bbqPresent
          ? { ...bbq, heldDate: moment(values.heldDate).toJSON() }
          : {
              ...values,
              heldDate: moment(values.heldDate).toJSON(),
              creationDate: new Date().toJSON()
            }
      )
    );

    toast.info(bbqPresent ? "Modifying BBQ..." : "Adding BBQ...");
    history.push("/BBQList");
  }

  return (
    <div className="jumbotron">
      {bbqPresent ? <h2>Modify Existing BBQ</h2> : <h2>Create BBQ</h2>}
      <Form
        initialValues={
          bbqPresent
            ? { heldDate: moment(bbq.heldDate).format("YYYY-MM-DD") }
            : {}
        }
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

BBQRegistrationForm.propTypes = {
  location: PropTypes.object.isRequired
};
