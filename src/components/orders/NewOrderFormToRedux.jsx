import React from "react";
import { FormSpy } from "react-final-form";
import { saveOrder } from "../../redux/actions/orderActions";
import { useDispatch } from "react-redux";

export default function NewOrderFormToRedux() {
  const dispatch = useDispatch();

  return (
    <FormSpy
      onChange={state => {
        if (state.submitting) {
          // Beef
          if (state.values.beefBurger !== "beef0") {
            dispatch(
              saveOrder({
                orderDate: new Date().toJSON(),
                userID: parseInt(state.values.userID),
                bbqID: state.values.bbqID,
                meat: 1,
                doneness: beefDoneness(state.values.beef1Done),
                cheese:
                  state.values.beef1Cheese ||
                  state.values.beef1Cheese !== undefined
                    ? 1
                    : 0,
                spicy:
                  state.values.beef1Spicy ||
                  state.values.beef1Spicy !== undefined
                    ? 1
                    : 0
              })
            );

            if (state.values.beefBurger === "beef2") {
              dispatch(
                saveOrder({
                  orderDate: new Date().toJSON(),
                  userID: parseInt(state.values.userID),
                  bbqID: state.values.bbqID,
                  meat: 1,
                  doneness: beefDoneness(state.values.beef2Done),
                  cheese:
                    state.values.beef2Cheese ||
                    state.values.beef2Cheese !== undefined
                      ? 1
                      : 0,
                  spicy:
                    state.values.beef2Spicy ||
                    state.values.beef2Spicy !== undefined
                      ? 1
                      : 0
                })
              );
            }
          }

          // Turkey
          if (state.values.turkeyBurger !== "turkey0") {
            dispatch(
              saveOrder({
                orderDate: new Date().toJSON(),
                userID: parseInt(state.values.userID),
                bbqID: state.values.bbqID,
                meat: 2,
                cheese:
                  state.values.turkey1Cheese ||
                  state.values.turkey1Cheese !== undefined
                    ? 1
                    : 0,
                spicy:
                  state.values.turkey1Spicy ||
                  state.values.turkey1Spicy !== undefined
                    ? 1
                    : 0
              })
            );

            if (state.values.turkeyBurger === "turkey2") {
              dispatch(
                saveOrder({
                  orderDate: new Date().toJSON(),
                  userID: parseInt(state.values.userID),
                  bbqID: state.values.bbqID,
                  meat: 2,
                  cheese:
                    state.values.turkey2Cheese ||
                    state.values.turkey2Cheese !== undefined
                      ? 1
                      : 0,
                  spicy:
                    state.values.turkey2Spicy ||
                    state.values.turkey2Spicy !== undefined
                      ? 1
                      : 0
                })
              );
            }
          }

          // Veg
          if (state.values.vegBurger !== "veg0") {
            dispatch(
              saveOrder({
                orderDate: new Date().toJSON(),
                userID: parseInt(state.values.userID),
                bbqID: state.values.bbqID,
                meat: 3,
                cheese:
                  state.values.veg1Cheese ||
                  state.values.veg1Cheese !== undefined
                    ? 1
                    : 0,
                spicy:
                  state.values.veg1Spicy || state.values.veg1Spicy !== undefined
                    ? 1
                    : 0
              })
            );

            if (state.values.vegBurger === "veg2") {
              dispatch(
                saveOrder({
                  orderDate: new Date().toJSON(),
                  userID: parseInt(state.values.userID),
                  bbqID: state.values.bbqID,
                  meat: 3,
                  cheese:
                    state.values.veg2Cheese ||
                    state.values.veg2Cheese !== undefined
                      ? 1
                      : 0,
                  spicy:
                    state.values.veg2Spicy ||
                    state.values.veg2Spicy !== undefined
                      ? 1
                      : 0
                })
              );
            }
          }

          // Hotdog
          if (state.values.hotdogAmount !== "hotdog0") {
            dispatch(
              saveOrder({
                orderDate: new Date().toJSON(),
                userID: parseInt(state.values.userID),
                bbqID: state.values.bbqID,
                type: 1,
                count: state.values.hotdogAmount === "hotdog2" ? 2 : 1,
                burnt: state.values.hotdogBurnt
              })
            );
          }
        }
      }}
    />
  );

  function beefDoneness(doneness) {
    switch (doneness) {
      case "beef1Rare":
        return 1;
      case "beef2Rare":
        return 1;
      case "beef1MedRare":
        return 2;
      case "beef2MedRare":
        return 2;
      case "beef1Medium":
        return 3;
      case "beef2Medium":
        return 3;
      case "beef1MediumWell":
        return 4;
      case "beef2MediumWell":
        return 4;
      case "beef1WellDone":
        return 5;
      case "beef2WellDone":
        return 5;
      default:
        return 6;
    }
  }
}
