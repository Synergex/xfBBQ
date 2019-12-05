﻿import React, { useState } from "react";
import "./orders.css";
import { Form } from "react-final-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadBBQs } from "../../redux/actions/bbqActions";
import { saveOrder } from "../../redux/actions/orderActions";

const maxFoods = 2;
let counter = 0;
function NewOrderForm() {
  document.title = "𝘹𝘧BBQ - Place an Order";

  const [orderCardArray, setOrderCardArray] = useState([]);
  const login = useSelector(state => state.login);
  const bbqs = useSelector(state => state.bbqs);
  const history = useHistory();
  const dispatch = useDispatch();
  if (bbqs.length === 0) dispatch(loadBBQs());

  function beefDoneness(doneness) {
    switch (doneness) {
      case "Rare":
        return 1;
      case "MedRare":
        return 2;
      case "Med":
        return 3;
      case "MedWell":
        return 4;
      case "Well":
        return 5;
      default:
        return 6;
    }
  }

  function drawCard(myArray, item) {
    //See if it is a burger or something else and call accordingly
    let cardData;
    let duplicateButton = "";
    switch (item.foodCategory) {
      case "Burger":
        cardData = addBurger(item);
        duplicateButton = (
          <button
            type="button"
            className={
              SetDuplicateButton(myArray, item) === true
                ? "d-none"
                : "close pr-2 pl-2"
            }
            title="Add a copy of this order"
            id={item.foodItem + item.foodValue + "DuplicateOrderButton"}
            disabled={SetDuplicateButton(myArray, item)}
            onClick={() => {
              duplicateCard(myArray, item);
            }}
          >
            <img src={require("./images/icon-duplicateBurger.png")} alt="D" />
          </button>
        );
        break;
      case "Hotdog":
        cardData = addHotDog(item);
        break;
      default:
        alert("making and undefined food item in drawCard()");
        break;
    }

    return (
      <div
        className="card bg-secondary mt-2 mb-2 pt-2 pb-2"
        id={item.foodFlavor + item.id}
        key={item.key}
      >
        <div className="row">
          <div className="col">
            <h4 className="pl-2">
              {item.foodFlavor + " " + item.foodCategory}
            </h4>
          </div>
          <div className="col-2">
            <button
              type="button"
              className="close pr-2 pl-2"
              aria-label="Close"
              title="Remove from your order"
              onClick={() => {
                removeFood(myArray, item);
              }}
            >
              <img src={require("./images/icon-removeBurger.png")} alt="R" />
            </button>
            {duplicateButton}
          </div>
        </div>
        {cardData}
      </div>
    );
  }

  function duplicateCard(myArray, item) {
    counter++;
    var idCounter = 1;
    for (var i = 0; i < myArray.length; ++i) {
      if (
        myArray[i].foodFlavor + myArray[i].foodCategory ===
        item.foodFlavor + item.foodCategory
      )
        idCounter++;
    }
    myArray.splice(
      myArray
        .map(function(e) {
          return e.key;
        })
        .indexOf(item.key),
      0,
      {
        key: counter,
        id: idCounter,
        foodFlavor: item.foodFlavor,
        foodCategory: item.foodCategory,
        foodAttributes: { ...item.foodAttributes }
      }
    );
    setOrderCardArray([...myArray]);
  }

  function addFood(myArray, foodFlavor, foodCategory) {
    //More or less, this should probably be a helper function to call duplicate Card or something like that.
    counter++;
    let foodAttributes;
    if (foodCategory === "Burger") {
      foodAttributes = { cheese: false, spice: false };
      if (foodFlavor === "Beef") foodAttributes.doneness = "Med";
    }
    if (foodCategory === "Hotdog") {
      foodAttributes = { burnt: false, quantity: 1 };
    }

    var idCounter = 1;
    for (var i = 0; i < myArray.length; ++i) {
      if (
        myArray[i].foodFlavor + myArray[i].foodCategory ===
        foodFlavor + foodCategory
      )
        idCounter++;
    }

    setOrderCardArray([
      {
        key: counter,
        id: idCounter,
        foodFlavor: foodFlavor,
        foodCategory: foodCategory,
        foodAttributes: foodAttributes
      },
      ...myArray
    ]);
  }

  function removeFood(myArray, item) {
    for (let index = 0; index < myArray.length; index++) {
      if (
        myArray[index].foodFlavor + myArray[index].foodCategory ===
        item.foodFlavor + item.foodCategory
      ) {
        if (myArray[index].id > item.id) {
          myArray[index].id--;
        }
      }
    }
    myArray.splice(
      myArray.findIndex(k => k.key === item.key),
      1
    );
    setOrderCardArray([...myArray]);
  }

  function addHotDog(item) {
    return (
      <>
        <div className="col-12">
          How would you like your Hotdog?
          <div
            className="btn-group btn-vertical btn-group-toggle pt-2 pb-2"
            data-toggle="buttons"
          >
            <div
              className={
                item.foodAttributes.burnt === false
                  ? "btn btn-primary"
                  : "btn btn-light"
              }
              onClick={() => {
                item.foodAttributes.burnt = false;
                orderCardArray[
                  orderCardArray.findIndex(k => k.key === item.key)
                ].foodAttributes.burnt = item.foodAttributes.burnt;
                setOrderCardArray([...orderCardArray]);
              }}
            >
              Standard
            </div>
            <div
              className={
                item.foodAttributes.burnt === true
                  ? "btn btn-primary"
                  : "btn btn-light"
              }
              onClick={() => {
                item.foodAttributes.burnt = true;
                orderCardArray[
                  orderCardArray.findIndex(k => k.key === item.key)
                ].foodAttributes.burnt = item.foodAttributes.burnt;
                setOrderCardArray([...orderCardArray]);
              }}
            >
              Charred
            </div>
          </div>
          How many would you like?
          <div
            className="btn-group btn-vertical btn-group-toggle pt-2 pb-2"
            data-toggle="buttons"
          >
            <div
              className={
                item.foodAttributes.quantity === 1
                  ? "btn btn-primary"
                  : "btn btn-light"
              }
              onClick={() => {
                item.foodAttributes.quantity = 1;
                orderCardArray[
                  orderCardArray.findIndex(k => k.key === item.key)
                ].foodAttributes.quantity = item.foodAttributes.quantity;
                setOrderCardArray([...orderCardArray]);
              }}
            >
              1
            </div>
            <div
              className={
                item.foodAttributes.quantity === 2
                  ? "btn btn-primary"
                  : "btn btn-light"
              }
              onClick={() => {
                item.foodAttributes.quantity = 2;
                orderCardArray[
                  orderCardArray.findIndex(k => k.key === item.key)
                ].foodAttributes.quantity = item.foodAttributes.quantity;
                setOrderCardArray([...orderCardArray]);
              }}
            >
              2
            </div>
          </div>
        </div>
      </>
    );
  }

  function addBurger(item) {
    let donenessQuestion = "";
    if (item.foodFlavor === "Beef") {
      donenessQuestion = (
        <>
          How would you like your burger cooked?
          <div className="row pt-3 pb-3">
            <div
              className="btn-group btn-vertical btn-group-toggle col-12"
              data-toggle="buttons"
            >
              <div
                className={
                  item.foodAttributes.doneness === "Rare"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  item.foodAttributes.doneness = "Rare";
                  orderCardArray[
                    orderCardArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.doneness = item.foodAttributes.doneness;
                  setOrderCardArray([...orderCardArray]);
                }}
              >
                Rare
              </div>
              <div
                className={
                  item.foodAttributes.doneness === "MedRare"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  item.foodAttributes.doneness = "MedRare";
                  orderCardArray[
                    orderCardArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.doneness = item.foodAttributes.doneness;
                  setOrderCardArray([...orderCardArray]);
                }}
              >
                Medium Rare
              </div>
              <div
                className={
                  item.foodAttributes.doneness === "Med"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  item.foodAttributes.doneness = "Med";
                  orderCardArray[
                    orderCardArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.doneness = item.foodAttributes.doneness;
                  setOrderCardArray([...orderCardArray]);
                }}
              >
                Medium
              </div>
              <div
                className={
                  item.foodAttributes.doneness === "MedWell"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  item.foodAttributes.doneness = "MedWell";
                  orderCardArray[
                    orderCardArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.doneness = item.foodAttributes.doneness;
                  setOrderCardArray([...orderCardArray]);
                }}
              >
                Medium Well
              </div>
              <div
                className={
                  item.foodAttributes.doneness === "Well"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  item.foodAttributes.doneness = "Well";
                  orderCardArray[
                    orderCardArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.doneness = item.foodAttributes.doneness;
                  setOrderCardArray([...orderCardArray]);
                }}
              >
                Well Done
              </div>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="col-12">
          What would you like added to your burger?
          <div className="row pt-3 pb-3">
            <div className="yellowtoggleButton checkboxButton col-sm-6 col-12">
              <input
                className=""
                type="checkbox"
                onClick={() => {
                  item.foodAttributes.cheese = !item.foodAttributes.cheese;
                  orderCardArray[
                    orderCardArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.cheese = item.foodAttributes.cheese;
                  setOrderCardArray([...orderCardArray]);
                }}
                id={item.foodFlavor + item.id + "Cheese"}
                value="Cheese"
                defaultChecked={item.foodAttributes.cheese}
              />
              <label
                className="form-check-label btn btn-block btn-light btn-lg"
                htmlFor={item.foodFlavor + item.id + "Cheese"}
              >
                Cheese
              </label>
            </div>
            <div className="redToggleButton checkboxButton col-sm-6 col-12">
              <input
                className=""
                type="checkbox"
                onClick={() => {
                  item.foodAttributes.spice = !item.foodAttributes.spice;
                  orderCardArray[
                    orderCardArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.spice = item.foodAttributes.spice;
                  setOrderCardArray([...orderCardArray]);
                }}
                id={item.foodFlavor + item.id + "Spice"}
                value="Spice"
                defaultChecked={item.foodAttributes.spice}
              />
              <label
                className="form-check-label btn btn btn-block btn-light btn-lg"
                htmlFor={item.foodFlavor + item.id + "Spice"}
              >
                Spicy
              </label>
            </div>
          </div>
          {donenessQuestion}
        </div>
      </>
    );
  }

  //These two functions are really similar. They could probably be turned into the same thing.
  function SetDuplicateButton(myArray, item) {
    var counter = 1;
    for (var i = 0; i < myArray.length; ++i) {
      if (
        myArray[i].foodFlavor + myArray[i].foodCategory ===
          item.foodFlavor + item.foodCategory &&
        myArray[i].key !== item.key
      )
        counter++;
      if (counter === maxFoods) return true;
    }
    return false;
  }
  function SetAddFoodButton(myArray, foodFlavor, foodCategory) {
    var counter = 0;
    for (var i = 0; i < myArray.length; ++i) {
      if (
        myArray[i].foodFlavor + myArray[i].foodCategory ===
        foodFlavor + foodCategory
      )
        counter++;
      if (counter === maxFoods) return true;
      if (foodCategory === "Hotdog" && counter === 1) return true;
    }
    return false;
  }

  async function onSubmit() {
    let orders = [];
    const orderDate = new Date().toJSON();
    const userID = login.id;
    const bbqID = bbqs.length === 0 ? 0 : bbqs[bbqs.length - 1].id;

    if (
      window.confirm(
        "Make sure your order is correct before submitting.\r\nIs this what you want to order?\r\n" +
          orderCardArray
            .map(item => {
              if (item.foodCategory === "Burger") {
                switch (item.foodFlavor) {
                  case "Beef":
                    orders.push({
                      orderDate,
                      userID,
                      bbqID,
                      meat: 1,
                      doneness: beefDoneness(item.foodAttributes.doneness),
                      cheese: item.foodAttributes.cheese ? "1" : "0",
                      spicy: item.foodAttributes.spice ? "1" : "0"
                    });

                    return (
                      "\r\n• Beef Burger:\r\n  - Cheese: " +
                      (item.foodAttributes.cheese ? "Yes" : "No") +
                      "\r\n  - Spice: " +
                      (item.foodAttributes.spice ? "Yes" : "No") +
                      "\r\n  - Doneness: " +
                      item.foodAttributes.doneness
                    );
                  case "Turkey":
                    orders.push({
                      orderDate,
                      userID,
                      bbqID,
                      meat: 2,
                      cheese: item.foodAttributes.cheese ? "1" : "0",
                      spicy: item.foodAttributes.spice ? "1" : "0"
                    });

                    return (
                      "\r\n• Turkey Burger:\r\n  - Cheese: " +
                      (item.foodAttributes.cheese ? "Yes" : "No") +
                      "\r\n  - Spice: " +
                      (item.foodAttributes.spice ? "Yes" : "No")
                    );
                  case "Veggie":
                    orders.push({
                      orderDate,
                      userID,
                      bbqID,
                      meat: 3,
                      doneness: beefDoneness(item.foodAttributes.doneness),
                      cheese: item.foodAttributes.cheese ? "1" : "0",
                      spicy: item.foodAttributes.spice ? "1" : "0"
                    });

                    return (
                      "\r\n• Veggie Burger:\r\n  - Cheese: " +
                      (item.foodAttributes.cheese ? "Yes" : "No") +
                      "\r\n  - Spice: " +
                      (item.foodAttributes.spice ? "Yes" : "No")
                    );
                  default:
                    return "";
                }
              } else {
                orders.push({
                  orderDate,
                  userID,
                  bbqID,
                  type: 1,
                  doneness: beefDoneness(item.foodAttributes.doneness),
                  count: item.foodAttributes.quantity,
                  burnt: item.foodAttributes.burnt ? "Yes" : "No"
                });

                return (
                  "\r\n• Hotdogs:\r\n  - Burnt: " +
                  (item.foodAttributes.burnt ? "Yes" : "No") +
                  "\r\n  - Amount: " +
                  item.foodAttributes.quantity
                );
              }
            })
            .join("")
      )
    ) {
      toast.info("Creating orders...");
      orders.forEach(order => dispatch(saveOrder(order)));
      history.push("/OrderHistory");
    }
  }

  return (
    <div className="jumbotron">
      <h2>Place an Order</h2>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="dropdown">
                  <button
                    className="btn btn-lg btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Add food
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <button
                      className="dropdown-item lead"
                      id="addBeefButton"
                      disabled={SetAddFoodButton(
                        orderCardArray,
                        "Beef",
                        "Burger"
                      )}
                      onClick={() => addFood(orderCardArray, "Beef", "Burger")}
                      type="button"
                    >
                      Beef Burger
                    </button>
                    <button
                      className="dropdown-item lead"
                      disabled={SetAddFoodButton(
                        orderCardArray,
                        "Turkey",
                        "Burger"
                      )}
                      id="addTurkeyButton"
                      onClick={() =>
                        addFood(orderCardArray, "Turkey", "Burger")
                      }
                      type="button"
                    >
                      Turkey Burger
                    </button>
                    <button
                      className="dropdown-item lead"
                      id="addVeggieButton"
                      disabled={SetAddFoodButton(
                        orderCardArray,
                        "Veggie",
                        "Burger"
                      )}
                      onClick={() =>
                        addFood(orderCardArray, "Veggie", "Burger")
                      }
                      type="button"
                    >
                      Veggie Burger
                    </button>
                    <div className="dropdown-divider" />
                    <button
                      className="dropdown-item lead"
                      id="addHotdogButton"
                      disabled={SetAddFoodButton(
                        orderCardArray,
                        "Pork",
                        "Hotdog"
                      )}
                      onClick={() => addFood(orderCardArray, "Pork", "Hotdog")}
                      type="button"
                    >
                      Hotdog
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-6 text-right">
                <button
                  className={
                    orderCardArray.length === 0
                      ? "btn btn-lg btn-secondary"
                      : "btn btn-lg btn-success"
                  }
                  disabled={orderCardArray.length === 0 ? true : false}
                  type="submit"
                  id="submitOrderButton"
                >
                  Submit Order
                </button>
              </div>
            </div>
          </form>
        )}
      />
      {orderCardArray.map(item => (
        <div key={item.key}>
          {drawCard(orderCardArray, item)}
          <p />
        </div>
      ))}
    </div>
  );
}

export default NewOrderForm;
