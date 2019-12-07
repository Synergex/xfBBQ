import React, { useState } from "react";
import { Form } from "react-final-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveOrder } from "../../redux/actions/orderActions";
import "./orders.css";
import PropTypes from "prop-types";

export default function EditOrderForm({ ...props }) {
  document.title = "𝘹𝘧BBQ - Edit an Order";

  const history = useHistory();
  const dispatch = useDispatch();
  const [order, setOrder] = useState(props.location.state);

  function renderDoneness() {
    return (
      <>
        How would you like your burger cooked?
        <div className="row pt-3 pb-3">
          <div
            className="btn-group btn-vertical btn-group-toggle col-12"
            data-toggle="buttons"
          >
            <div
              className={
                order.doneness === 1 ? "btn btn-primary" : "btn btn-light"
              }
              onClick={() => {
                setOrder({ ...order, doneness: 1 });
              }}
            >
              Rare
            </div>
            <div
              className={
                order.doneness === 2 ? "btn btn-primary" : "btn btn-light"
              }
              onClick={() => {
                setOrder({ ...order, doneness: 2 });
              }}
            >
              Medium Rare
            </div>
            <div
              className={
                order.doneness === 3 ? "btn btn-primary" : "btn btn-light"
              }
              onClick={() => {
                setOrder({ ...order, doneness: 3 });
              }}
            >
              Medium
            </div>
            <div
              className={
                order.doneness === 4 ? "btn btn-primary" : "btn btn-light"
              }
              onClick={() => {
                setOrder({ ...order, doneness: 4 });
              }}
            >
              Medium Well
            </div>
            <div
              className={
                order.doneness === 5 ? "btn btn-primary" : "btn btn-light"
              }
              onClick={() => {
                setOrder({ ...order, doneness: 5 });
              }}
            >
              Well Done
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderBurger() {
    return (
      <>
        <div className="col-12">
          What would you like added to your burger?
          <div className="row pt-3 pb-3">
            <div className="yellowtoggleButton checkboxButton col-sm-6 col-12">
              <input
                className=""
                id="cheese"
                type="checkbox"
                onClick={() => {
                  setOrder({
                    ...order,
                    cheese: order.cheese === "0" ? "1" : "0"
                  });
                }}
                defaultChecked={order.cheese === "1"}
              />
              <label
                className="form-check-label btn btn-block btn-light btn-lg"
                htmlFor="cheese"
              >
                Cheese
              </label>
            </div>
            <div className="redToggleButton checkboxButton col-sm-6 col-12">
              <input
                className=""
                type="checkbox"
                id="spice"
                onClick={() => {
                  setOrder({
                    ...order,
                    spicy: order.spicy === "0" ? "1" : "0"
                  });
                }}
                defaultChecked={order.spicy === "1"}
              />
              <label
                className="form-check-label btn btn btn-block btn-light btn-lg"
                htmlFor="spice"
              >
                Spice
              </label>
            </div>
          </div>
          {order.meat === 1 ? renderDoneness() : <></>}
        </div>
      </>
    );
  }

  async function onSubmit() {
    dispatch(saveOrder({ ...order }));

    toast.info("Modifying Order...");
    history.push("/OrderHistory");
  }

  return (
    <div className="jumbotron">
      <h2>Edit your Order</h2>
      <div className="card bg-secondary mt-2 mb-2 pt-2 pb-2">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {order.cheese === undefined ? (
                <>
                  <div className="row">
                    <div className="col">
                      <h4 className="pl-2">{"Hotdog"}</h4>
                    </div>
                  </div>
                  <div className="col-12">
                    How would you like your Hotdog?
                    <div
                      className="btn-group btn-vertical btn-group-toggle pt-2 pb-2"
                      data-toggle="buttons"
                    >
                      <div
                        className={
                          !order.burnt ? "btn btn-primary" : "btn btn-light"
                        }
                        onClick={() => {
                          setOrder({ ...order, burnt: false });
                        }}
                      >
                        Normal
                      </div>
                      <div
                        className={
                          order.burnt ? "btn btn-primary" : "btn btn-light"
                        }
                        onClick={() => {
                          setOrder({ ...order, burnt: true });
                        }}
                      >
                        Burnt
                      </div>
                    </div>
                    How many would you like?
                    <div
                      className="btn-group btn-vertical btn-group-toggle pt-2 pb-2"
                      data-toggle="buttons"
                    >
                      <div
                        className={
                          order.count === 1
                            ? "btn btn-primary"
                            : "btn btn-light"
                        }
                        onClick={() => {
                          setOrder({ ...order, count: 1 });
                        }}
                      >
                        1
                      </div>
                      <div
                        className={
                          order.count === 2
                            ? "btn btn-primary"
                            : "btn btn-light"
                        }
                        onClick={() => {
                          setOrder({ ...order, count: 2 });
                        }}
                      >
                        2
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="col">
                      <h4 className="pl-2">
                        {(order.meat === 1
                          ? "Beef"
                          : order.meat === 2
                          ? "Turkey"
                          : "Veggie") + " Burger"}
                      </h4>
                    </div>
                  </div>
                  {renderBurger()}
                </>
              )}
              <br />
              <div className="text-right col">
                <button className="btn btn-lg btn-success" type="submit">
                  Submit Edited Order
                </button>
              </div>
            </form>
          )}
        />
      </div>
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </div>
  );
}

EditOrderForm.propTypes = {
  location: PropTypes.object.isRequired
};
