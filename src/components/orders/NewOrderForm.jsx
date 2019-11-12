import React from "react";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import NewOrderFormToRedux from "./NewOrderFormToRedux";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import sleep from "../../scripts/sleep";
import { loadUsers } from "../../redux/actions/userActions";
import { loadBBQs } from "../../redux/actions/bbqActions";

export default function NewOrderForm() {
  document.title = "𝘹𝘧BBQ - Place an Order";

  const history = useHistory();
  const dispatch = useDispatch();

  async function onSubmit() {
    await sleep(250);
    toast.success("Added order successfully");
    history.push("/OrderHistory");
  }

  const bbqs = useSelector(state => state.bbqs);
  if (bbqs.length === 0) dispatch(loadBBQs());
  const users = useSelector(state => state.users);
  if (users.length === 0) dispatch(loadUsers());

  return (
    <div className="jumbotron">
      <h2>Place an Order</h2>
      <Form
        initialValues={{
          beefBurger: "beef0",
          turkeyBurger: "turkey0",
          vegBurger: "veg0",
          hotdogAmount: "hotdog0",
          bbqID: bbqs.length !== 0 ? bbqs[bbqs.length - 1].id : 0
        }}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <NewOrderFormToRedux />
            <div className="form-group">
              <h4>Who&apos;s Ordering?</h4>
              <div>
                <Field
                  name="userID"
                  component="select"
                  required
                  className="custom-select"
                >
                  <option />
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
            <h4>Hamburgers</h4>
            <div className="form-group">
              <label>
                How many <b>beef</b> burgers?
              </label>
              <table className="table">
                <thead>
                  <tr className="table-info">
                    <th style={{ width: "10%" }}>
                      <div className="custom-control custom-radio">
                        <Field
                          type="radio"
                          className="custom-control-input"
                          name="beefBurger"
                          component="input"
                          id="beef0"
                          value="beef0"
                        />
                        <label className="custom-control-label" htmlFor="beef0">
                          0
                        </label>
                      </div>
                    </th>
                    <th style={{ width: "45%" }}>
                      <div className="custom-control custom-radio">
                        <Field
                          type="radio"
                          className="custom-control-input"
                          name="beefBurger"
                          component="input"
                          value="beef1"
                          id="beef1"
                        />
                        <label className="custom-control-label" htmlFor="beef1">
                          1
                        </label>
                      </div>
                    </th>
                    <th>
                      <div className="custom-control custom-radio">
                        <Field
                          type="radio"
                          className="custom-control-input"
                          id="beef2"
                          name="beefBurger"
                          component="input"
                          value="beef2"
                        />
                        <label className="custom-control-label" htmlFor="beef2">
                          2
                        </label>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>
                      <div className="custom-control custom-radio">
                        <Field
                          className="custom-control-input"
                          id="beef1Rare"
                          type="radio"
                          name="beef1Done"
                          component="input"
                          value="beef1Rare"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef1Rare"
                        >
                          Rare
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <Field
                          className="custom-control-input"
                          id="beef1MedRare"
                          type="radio"
                          name="beef1Done"
                          component="input"
                          value="beef1MedRare"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef1MedRare"
                        >
                          Medium Rare
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <Field
                          className="custom-control-input"
                          id="beef1Medium"
                          type="radio"
                          name="beef1Done"
                          component="input"
                          value="beef1Medium"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef1Medium"
                        >
                          Medium
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <Field
                          className="custom-control-input"
                          id="beef1MediumWell"
                          type="radio"
                          name="beef1Done"
                          component="input"
                          value="beef1MediumWell"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef1MediumWell"
                        >
                          Medium Well
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <Field
                          className="custom-control-input"
                          id="beef1WellDone"
                          type="radio"
                          name="beef1Done"
                          component="input"
                          value="beef1WellDone"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef1WellDone"
                        >
                          Well Done
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="custom-control custom-radio">
                        <Field
                          className="custom-control-input"
                          id="beef2Rare"
                          type="radio"
                          name="beef2Done"
                          component="input"
                          value="beef2Rare"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef2Rare"
                        >
                          Rare
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <Field
                          className="custom-control-input"
                          id="beef2MedRare"
                          type="radio"
                          name="beef2Done"
                          component="input"
                          value="beef2MedRare"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef2MedRare"
                        >
                          Medium Rare
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <Field
                          className="custom-control-input"
                          id="beef2Medium"
                          type="radio"
                          name="beef2Done"
                          component="input"
                          value="beef2Medium"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef2Medium"
                        >
                          Medium
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <Field
                          className="custom-control-input"
                          id="beef2MediumWell"
                          type="radio"
                          name="beef2Done"
                          component="input"
                          value="beef2MediumWell"
                        />{" "}
                        <label
                          className="custom-control-label"
                          htmlFor="beef2MediumWell"
                        >
                          Medium Well
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <Field
                          className="custom-control-input"
                          id="beef2WellDone"
                          type="radio"
                          name="beef2Done"
                          component="input"
                          value="beef2WellDone"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef2WellDone"
                        >
                          Well Done
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <div className="custom-control custom-checkbox">
                        <Field
                          className="custom-control-input"
                          name="beef1Cheese"
                          id="beef1Cheese"
                          component="input"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef1Cheese"
                        >
                          Cheese
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <Field
                          className="custom-control-input"
                          name="beef1Spicy"
                          id="beef1Spicy"
                          component="input"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef1Spicy"
                        >
                          Spice
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="custom-control custom-checkbox">
                        <Field
                          className="custom-control-input"
                          id="beef2Cheese"
                          name="beef2Cheese"
                          component="input"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef2Cheese"
                        >
                          Cheese
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <Field
                          className="custom-control-input"
                          id="beef2Spicy"
                          name="beef2Spicy"
                          component="input"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="beef2Spicy"
                        >
                          Spice
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="form-group">
              <label>
                How many <b>turkey</b> burgers?
              </label>
              <table className="table">
                <thead>
                  <tr className="table-info">
                    <th style={{ width: "10%" }}>
                      <div className="custom-control custom-radio">
                        <Field
                          type="radio"
                          className="custom-control-input"
                          name="turkeyBurger"
                          component="input"
                          id="turkey0"
                          value="turkey0"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="turkey0"
                        >
                          0
                        </label>
                      </div>
                    </th>
                    <th style={{ width: "45%" }}>
                      <div className="custom-control custom-radio">
                        <Field
                          type="radio"
                          className="custom-control-input"
                          name="turkeyBurger"
                          component="input"
                          value="turkey1"
                          id="turkey1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="turkey1"
                        >
                          1
                        </label>
                      </div>
                    </th>
                    <th>
                      <div className="custom-control custom-radio">
                        <Field
                          type="radio"
                          className="custom-control-input"
                          id="turkey2"
                          name="turkeyBurger"
                          component="input"
                          value="turkey2"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="turkey2"
                        >
                          2
                        </label>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>
                      <div className="custom-control custom-checkbox">
                        <Field
                          className="custom-control-input"
                          name="turkey1Cheese"
                          id="turkey1Cheese"
                          component="input"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="turkey1Cheese"
                        >
                          Cheese
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <Field
                          className="custom-control-input"
                          name="turkey1Spicy"
                          id="turkey1Spicy"
                          component="input"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="turkey1Spicy"
                        >
                          Spice
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="custom-control custom-checkbox">
                        <Field
                          className="custom-control-input"
                          id="turkey2Cheese"
                          name="turkey2Cheese"
                          component="input"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="turkey2Cheese"
                        >
                          Cheese
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <Field
                          className="custom-control-input"
                          id="turkey2Spicy"
                          name="turkey2Spicy"
                          component="input"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="turkey2Spicy"
                        >
                          Spice
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="form-group">
              <label>
                How many <b>vegetarian</b> burgers?
              </label>
              <table className="table">
                <thead>
                  <tr className="table-info">
                    <th style={{ width: "10%" }}>
                      <div className="custom-control custom-radio">
                        <Field
                          type="radio"
                          className="custom-control-input"
                          name="vegBurger"
                          component="input"
                          id="veg0"
                          value="veg0"
                        />
                        <label className="custom-control-label" htmlFor="veg0">
                          0
                        </label>
                      </div>
                    </th>
                    <th style={{ width: "45%" }}>
                      <div className="custom-control custom-radio">
                        <Field
                          type="radio"
                          className="custom-control-input"
                          name="vegBurger"
                          component="input"
                          value="veg1"
                          id="veg1"
                        />
                        <label className="custom-control-label" htmlFor="veg1">
                          1
                        </label>
                      </div>
                    </th>
                    <th>
                      <div className="custom-control custom-radio">
                        <Field
                          type="radio"
                          className="custom-control-input"
                          id="veg2"
                          name="vegBurger"
                          component="input"
                          value="veg2"
                        />
                        <label className="custom-control-label" htmlFor="veg2">
                          2
                        </label>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>
                      <div className="custom-control custom-checkbox">
                        <Field
                          className="custom-control-input"
                          name="veg1Cheese"
                          id="veg1Cheese"
                          component="input"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="veg1Cheese"
                        >
                          Cheese
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <Field
                          className="custom-control-input"
                          name="veg1Spicy"
                          id="veg1Spicy"
                          component="input"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="veg1Spicy"
                        >
                          Spice
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="custom-control custom-checkbox">
                        <Field
                          className="custom-control-input"
                          id="veg2Cheese"
                          name="veg2Cheese"
                          component="input"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="veg2Cheese"
                        >
                          Cheese
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <Field
                          className="custom-control-input"
                          id="veg2Spicy"
                          name="veg2Spicy"
                          component="input"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="veg2Spicy"
                        >
                          Spice
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4>Hotdogs</h4>
            <label>How many hotdogs?</label>
            <div className="custom-control custom-radio">
              <Field
                type="radio"
                id="hotdog0"
                name="hotdogAmount"
                className="custom-control-input"
                value="hotdog0"
                component="input"
              />
              <label className="custom-control-label" htmlFor="hotdog0">
                0
              </label>
            </div>
            <div className="custom-control custom-radio">
              <Field
                type="radio"
                id="hotdog1"
                name="hotdogAmount"
                className="custom-control-input"
                value="hotdog1"
                component="input"
              />
              <label className="custom-control-label" htmlFor="hotdog1">
                1
              </label>
            </div>
            <div className="custom-control custom-radio">
              <Field
                type="radio"
                id="hotdog2"
                name="hotdogAmount"
                className="custom-control-input"
                value="hotdog2"
                component="input"
              />
              <label className="custom-control-label" htmlFor="hotdog2">
                2
              </label>
            </div>
            <br />
            <div className="custom-control custom-checkbox">
              <Field
                className="custom-control-input"
                id="hotdogBurnt"
                name="hotdogBurnt"
                component="input"
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="hotdogBurnt">
                I want them <i>really</i> well done
              </label>
            </div>
            <br />
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
