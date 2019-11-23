import React, { useState } from "react";
import "./orders.css";

const maxFoods = 2;
let counter = 0;
function AlphaOrderForm() {
  const [myArray, setArray] = useState([]);

  function drawCard(myArray, item) {
    //See if it is a burger or something else and call accordingly
    let cardData;
    let duplicateButton = "";
    switch (item.foodCategory) {
      case "Burger":
        cardData = addBurger(item);
        duplicateButton = (
          <button
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
        className="card bg-secondary m-2 pt-2 pb-2 collapse"
        id={item.foodFlavor + item.id}
        key={item.key}
      >
        <img
          src={require("./images/spacer.png")}
          alt=""
          onLoad={() =>
            document
              .getElementById("expandCard" + item.foodFlavor + item.id)
              .click()
          }
        />
        <button
          id={"expandCard" + item.foodFlavor + item.id}
          style={{ visibility: "hidden", display: "none" }}
          type="button"
          data-toggle="collapse"
          data-target={"#" + item.foodFlavor + item.id}
          aria-expanded="false"
        />
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
    setArray([...myArray]);
  }

  function addFood(myArray, foodFlavor, foodCategory) {
    //More or less, this should probably be a helper function to call duplicate Card or something like that.
    counter++;
    let foodAttributes;
    if (foodCategory === "Burger") {
      foodAttributes = { cheese: false, spice: false };
      if (foodFlavor === "Beef") foodAttributes.doneness = "Medium";
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

    setArray([
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
    myArray.splice(myArray.findIndex(k => k.key === item.key), 1);
    setArray([...myArray]);
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
                myArray[
                  myArray.findIndex(k => k.key === item.key)
                ].foodAttributes.burnt =
                  item.foodAttributes.burnt;
                setArray([...myArray]);
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
                myArray[
                  myArray.findIndex(k => k.key === item.key)
                ].foodAttributes.burnt =
                  item.foodAttributes.burnt;
                setArray([...myArray]);
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
                myArray[
                  myArray.findIndex(k => k.key === item.key)
                ].foodAttributes.quantity =
                  item.foodAttributes.quantity;
                setArray([...myArray]);
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
                myArray[
                  myArray.findIndex(k => k.key === item.key)
                ].foodAttributes.quantity =
                  item.foodAttributes.quantity;
                setArray([...myArray]);
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
                  myArray[
                    myArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.doneness =
                    item.foodAttributes.doneness;
                  setArray([...myArray]);
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
                  myArray[
                    myArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.doneness =
                    item.foodAttributes.doneness;
                  setArray([...myArray]);
                }}
              >
                Medium Rare
              </div>
              <div
                className={
                  item.foodAttributes.doneness === "Medium"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  item.foodAttributes.doneness = "Medium";
                  myArray[
                    myArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.doneness =
                    item.foodAttributes.doneness;
                  setArray([...myArray]);
                }}
              >
                Medium
              </div>
              <div
                className={
                  item.foodAttributes.doneness === "MediumWell"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => {
                  item.foodAttributes.doneness = "MediumWell";
                  myArray[
                    myArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.doneness =
                    item.foodAttributes.doneness;
                  setArray([...myArray]);
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
                  myArray[
                    myArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.doneness =
                    item.foodAttributes.doneness;
                  setArray([...myArray]);
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
                  myArray[
                    myArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.cheese =
                    item.foodAttributes.cheese;
                  setArray([...myArray]);
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
                  myArray[
                    myArray.findIndex(k => k.key === item.key)
                  ].foodAttributes.spice =
                    item.foodAttributes.spice;
                  setArray([...myArray]);
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

  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="dropdown p-2">
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
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                className="dropdown-item lead"
                id="addBeefButton"
                disabled={SetAddFoodButton(myArray, "Beef", "Burger")}
                onClick={() => addFood(myArray, "Beef", "Burger")}
              >
                Beef Burger
              </button>
              <button
                className="dropdown-item lead"
                disabled={SetAddFoodButton(myArray, "Turkey", "Burger")}
                id="addTurkeyButton"
                onClick={() => addFood(myArray, "Turkey", "Burger")}
              >
                Turkey Burger
              </button>
              <button
                className="dropdown-item lead"
                id="addVeggieButton"
                disabled={SetAddFoodButton(myArray, "Veggie", "Burger")}
                onClick={() => addFood(myArray, "Veggie", "Burger")}
              >
                Veggie Burger
              </button>
              <div className="dropdown-divider" />
              <button
                className="dropdown-item lead"
                id="addHotdogButton"
                disabled={SetAddFoodButton(myArray, "Pork", "Hotdog")}
                onClick={() => addFood(myArray, "Pork", "Hotdog")}
              >
                Hotdog
              </button>
            </div>
          </div>
        </div>
        <div className="col-6 text-right">
          <div className=" p-2">
            <button
              className={
                myArray.length === 0
                  ? "btn btn-lg btn-secondary"
                  : "btn btn-lg btn-success"
              }
              disabled={myArray.length === 0 ? true : false}
              type="button"
              id="submitOrderButton"
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>

      {myArray.map(item => (
        <div key={item.key}>
          {drawCard(myArray, item)}
          <p />
        </div>
      ))}

      <pre style={{ fontSize: 12, textAlign: "left" }}>
        {JSON.stringify(myArray, null, 2)}
      </pre>
    </>
  );
}

export default AlphaOrderForm;
