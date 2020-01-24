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
          ? { ...bbq, Helddate: parseInt(moment(values.heldDate).format("X")) }
          : {
              Helddate: parseInt(moment(values.heldDate).format("X")),
              Creationdate: parseInt(moment().format("X"))
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
            ? { heldDate: moment.unix(bbq.Helddate).format("YYYY-MM-DD") }
            : {}
        }
        validate={values => {
          const errors = {};

          if (!values.heldDate)
            errors.heldDate = <p className="text-danger">Required</p>;
          else if (moment(values.heldDate).isBefore())
            errors.heldDate = (
              <p className="text-danger">BBQ date must be after today.</p>
            );

          return Object.keys(errors).length ? errors : undefined;
        }}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Field name="heldDate">
                {({ input, meta }) => (
                  <div>
                    <label>Date to be held:</label>
                    <input
                      {...input}
                      type="date"
                      className="form-control"
                      min={moment()
                        .add(1, "days")
                        .format("YYYY-MM-DD")}
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

BBQRegistrationForm.propTypes = {
  location: PropTypes.object.isRequired
};
