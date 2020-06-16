import React, { useReducer, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import getQuery from "../../api/generalApi";
import * as userApi from "../../api/userApi";

import Table from "react-bootstrap/Table";
import Jumbotron from "react-bootstrap/Jumbotron";
import BootstrapForm from "react-bootstrap/Form";

export default function BBQCookingInformation({ ...props }) {
  const history = useHistory();

  // If coming to this page raw, return to BBQList
  if (!props.location.state) history.push("/BBQList");

  // Get users
  const [users, setUsers] = useState({ value: [] });

  const getUsers = useCallback(async () => {
    const response = await userApi.getUsers();
    setUsers(response);
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Set reducer state
  const [reducerState, setReducerState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      rareNormal: "?",
      rareCheesy: "?",
      rareSpicy: "?",
      rareCheesySpicy: "?",
      rareTotal: "?",

      medRareNormal: "?",
      medRareCheesy: "?",
      medRareSpicy: "?",
      medRareCheesySpicy: "?",
      medRareTotal: "?",

      medNormal: "?",
      medCheesy: "?",
      medSpicy: "?",
      medCheesySpicy: "?",
      medTotal: "?",

      medWellNormal: "?",
      medWellCheesy: "?",
      medWellSpicy: "?",
      medWellCheesySpicy: "?",
      medWellTotal: "?",

      wellNormal: "?",
      wellCheesy: "?",
      wellSpicy: "?",
      wellCheesySpicy: "?",
      wellTotal: "?",

      totalNormal: "?",
      totalCheesy: "?",
      totalSpicy: "?",
      totalCheesySpicy: "?",
      totalTotal: "?",

      turkeyNormal: "?",
      turkeyCheesy: "?",
      turkeySpicy: "?",
      turkeyCheesySpicy: "?",
      turkeyTotal: "?",

      vegetarianNormal: "?",
      vegetarianCheesy: "?",
      vegetarianSpicy: "?",
      vegetarianCheesySpicy: "?",
      vegetarianTotal: "?",

      hotdogNormal: "?",
      hotdogBurnt: "?",
      hotdogTotal: "?",
    }
  );

  // Query for everything
  const bbqID = props.location.state?.Id ?? 0;
  document.title = "𝘹𝘧BBQ - BBQ Information for BBQ " + bbqID;
  const [queryResult, setQueryResult] = useState(undefined);
  useEffect(() => {
    getQuery(
      `Orders?$filter=Bbqid eq ${bbqID} &$orderby=Userid`
    ).then((value) => setQueryResult(value));

    // Rare Beef
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 1 and Cheese eq 0 and Spicy eq 0`
    ).then((value) => setReducerState({ rareNormal: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 1 and Cheese ge 1 and Spicy eq 0`
    ).then((value) => setReducerState({ rareCheesy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 1 and Cheese eq 0 and Spicy ge 1`
    ).then((value) => setReducerState({ rareSpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 1 and Cheese ge 1 and Spicy ge 1`
    ).then((value) => setReducerState({ rareCheesySpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 1`
    ).then((value) => setReducerState({ rareTotal: value }));

    // Med Rare Beef
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 2 and Cheese eq 0 and Spicy eq 0`
    ).then((value) => setReducerState({ medRareNormal: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 2 and Cheese ge 1 and Spicy eq 0`
    ).then((value) => setReducerState({ medRareCheesy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 2 and Cheese eq 0 and Spicy ge 1`
    ).then((value) => setReducerState({ medRareSpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 2 and Cheese ge 1 and Spicy ge 1`
    ).then((value) => setReducerState({ medRareCheesySpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 2`
    ).then((value) => setReducerState({ medRareTotal: value }));

    // Med Beef
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 3 and Cheese eq 0 and Spicy eq 0`
    ).then((value) => setReducerState({ medNormal: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 3 and Cheese ge 1 and Spicy eq 0`
    ).then((value) => setReducerState({ medCheesy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 3 and Cheese eq 0 and Spicy ge 1`
    ).then((value) => setReducerState({ medSpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 3 and Cheese ge 1 and Spicy ge 1`
    ).then((value) => setReducerState({ medCheesySpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 3`
    ).then((value) => setReducerState({ medTotal: value }));

    // Med Well Beef
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 4 and Cheese eq 0 and Spicy eq 0`
    ).then((value) => setReducerState({ medWellNormal: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 4 and Cheese ge 1 and Spicy eq 0`
    ).then((value) => setReducerState({ medWellCheesy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 4 and Cheese eq 0 and Spicy ge 1`
    ).then((value) => setReducerState({ medWellSpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 4 and Cheese ge 1 and Spicy ge 1`
    ).then((value) => setReducerState({ medWellCheesySpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 4`
    ).then((value) => setReducerState({ medWellTotal: value }));

    // Well Beef
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 5 and Cheese eq 0 and Spicy eq 0`
    ).then((value) => setReducerState({ wellNormal: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 5 and Cheese ge 1 and Spicy eq 0`
    ).then((value) => setReducerState({ wellCheesy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 5 and Cheese eq 0 and Spicy ge 1`
    ).then((value) => setReducerState({ wellSpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 5 and Cheese ge 1 and Spicy ge 1`
    ).then((value) => setReducerState({ wellCheesySpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Doneness eq 5`
    ).then((value) => setReducerState({ wellTotal: value }));

    // Totals
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Cheese eq 0 and Spicy eq 0`
    ).then((value) => setReducerState({ totalNormal: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Cheese ge 1 and Spicy eq 0`
    ).then((value) => setReducerState({ totalCheesy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Cheese eq 0 and Spicy ge 1`
    ).then((value) => setReducerState({ totalSpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1 and Cheese ge 1 and Spicy ge 1`
    ).then((value) => setReducerState({ totalCheesySpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 1`
    ).then((value) => setReducerState({ totalTotal: value }));

    // Turkey
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 2 and Cheese eq 0 and Spicy eq 0`
    ).then((value) => setReducerState({ turkeyNormal: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 2 and Cheese ge 1 and Spicy eq 0`
    ).then((value) => setReducerState({ turkeyCheesy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 2 and Cheese eq 0 and Spicy ge 1`
    ).then((value) => setReducerState({ turkeySpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 2 and Cheese ge 1 and Spicy ge 1`
    ).then((value) => setReducerState({ turkeyCheesySpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 2`
    ).then((value) => setReducerState({ turkeyTotal: value }));

    // Vegetarian
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 3 and Cheese eq 0 and Spicy eq 0`
    ).then((value) => setReducerState({ vegetarianNormal: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 3 and Cheese ge 1 and Spicy eq 0`
    ).then((value) => setReducerState({ vegetarianCheesy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 3 and Cheese eq 0 and Spicy ge 1`
    ).then((value) => setReducerState({ vegetarianSpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 3 and Cheese ge 1 and Spicy ge 1`
    ).then((value) => setReducerState({ vegetarianCheesySpicy: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Meat eq 3`
    ).then((value) => setReducerState({ vegetarianTotal: value }));

    // Hotdogs
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Type ge 1 and Burnt eq 0`
    ).then((value) => setReducerState({ hotdogNormal: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Type ge 1 and Burnt ge 1`
    ).then((value) => setReducerState({ hotdogBurnt: value }));
    getQuery(
      `Orders/$count?$filter=Bbqid eq ${bbqID} and Type ge 1`
    ).then((value) => setReducerState({ hotdogTotal: value }));
  }, [bbqID]);

  // Display results
  return (
    <Jumbotron>
      {queryResult ? (
        <>
          <h2>BBQ Information for BBQ {bbqID}</h2>
          <Table>
            <thead>
              <tr className="table-primary">
                <th style={{ width: "10%" }}>Served</th>
                <th style={{ width: "40%" }}>Name</th>
                <th>Order</th>
              </tr>
            </thead>
            <tbody>
              {queryResult.value.map((result) => {
                // Figure out what to print
                let order = "";
                if (result.Meat > 0) {
                  if (result.Spicy > 0) order += "Spicy ";
                  if (
                    result.Cheese > 0 &&
                    (result.Meat === 2 || result.Meat === 3)
                  )
                    order += "Cheese ";
                  switch (result.Meat) {
                    case 2:
                      order += "Turkey Burger";
                      break;
                    case 3:
                      order += "Veggie Burger";
                      break;
                    default:
                      switch (result.Doneness) {
                        case 1:
                          order += "Rare ";
                          break;
                        case 2:
                          order += "Medium Rare ";
                          break;
                        case 3:
                          order += "Medium ";
                          break;
                        case 4:
                          order += "Medium Well ";
                          break;
                        default:
                          order += "Well Done ";
                          break;
                      }
                      if (result.Cheese > 0) order += "Cheese ";
                      order += "Beef Burger";
                      break;
                  }
                } else {
                  order += result.Count + "x ";
                  if (result.Burnt > 0) order += "Burnt ";
                  order += "Hotdog" + (result.Count > 1 ? "s" : "");
                }

                // Return order row
                return (
                  <tr key={result.Id}>
                    <td>
                      <center>
                        <BootstrapForm.Check type="checkbox" />
                      </center>
                    </td>
                    <td>
                      {
                        users.value.filter(
                          (user) => result.Userid === user.Id
                        )[0]?.Name
                      }
                    </td>
                    <td>{order}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <hr />
          <h3>Beef Burger Orders</h3>
          <Table>
            <thead>
              <tr className="table-primary">
                <th style={{ width: "10%" }} />
                <th style={{ width: "10%" }}>Neither</th>
                <th style={{ width: "10%" }}>Cheesy</th>
                <th style={{ width: "10%" }}>Spicy</th>
                <th style={{ width: "10%" }}>Both</th>
                <th style={{ width: "10%" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Rare</th>
                <td>{reducerState.rareNormal}</td>
                <td>{reducerState.rareCheesy}</td>
                <td>{reducerState.rareSpicy}</td>
                <td>{reducerState.rareCheesySpicy}</td>
                <td>{reducerState.rareTotal}</td>
              </tr>
              <tr>
                <th scope="row">Medium Rare</th>
                <td>{reducerState.medRareNormal}</td>
                <td>{reducerState.medRareCheesy}</td>
                <td>{reducerState.medRareSpicy}</td>
                <td>{reducerState.medRareCheesySpicy}</td>
                <td>{reducerState.medRareTotal}</td>
              </tr>
              <tr>
                <th scope="row">Medium</th>
                <td>{reducerState.medNormal}</td>
                <td>{reducerState.medCheesy}</td>
                <td>{reducerState.medSpicy}</td>
                <td>{reducerState.medCheesySpicy}</td>
                <td>{reducerState.medTotal}</td>
              </tr>
              <tr>
                <th scope="row">Medium Well</th>
                <td>{reducerState.medWellNormal}</td>
                <td>{reducerState.medWellCheesy}</td>
                <td>{reducerState.medWellSpicy}</td>
                <td>{reducerState.medWellCheesySpicy}</td>
                <td>{reducerState.medWellTotal}</td>
              </tr>
              <tr>
                <th scope="row">Well Done</th>
                <td>{reducerState.wellNormal}</td>
                <td>{reducerState.wellCheesy}</td>
                <td>{reducerState.wellSpicy}</td>
                <td>{reducerState.wellCheesySpicy}</td>
                <td>{reducerState.wellTotal}</td>
              </tr>
              <tr>
                <th scope="row">Total</th>
                <td>{reducerState.totalNormal}</td>
                <td>{reducerState.totalCheesy}</td>
                <td>{reducerState.totalSpicy}</td>
                <td>{reducerState.totalCheesySpicy}</td>
                <td>{reducerState.totalTotal}</td>
              </tr>
            </tbody>
          </Table>
          <hr />
          <h3>Turkey Burger Orders</h3>
          <Table>
            <thead>
              <tr className="table-primary">
                <th style={{ width: "10%" }} />
                <th style={{ width: "10%" }}>Neither</th>
                <th style={{ width: "10%" }}>Cheesy</th>
                <th style={{ width: "10%" }}>Spicy</th>
                <th style={{ width: "10%" }}>Both</th>
                <th style={{ width: "10%" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Total</th>
                <td>{reducerState.turkeyNormal}</td>
                <td>{reducerState.turkeyCheesy}</td>
                <td>{reducerState.turkeySpicy}</td>
                <td>{reducerState.turkeyCheesySpicy}</td>
                <td>{reducerState.turkeyTotal}</td>
              </tr>
            </tbody>
          </Table>
          <hr />
          <h3>Vegetarian Burger Orders</h3>
          <Table>
            <thead>
              <tr className="table-primary">
                <th style={{ width: "10%" }} />
                <th style={{ width: "10%" }}>Neither</th>
                <th style={{ width: "10%" }}>Cheesy</th>
                <th style={{ width: "10%" }}>Spicy</th>
                <th style={{ width: "10%" }}>Both</th>
                <th style={{ width: "10%" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Total</th>
                <td>{reducerState.vegetarianNormal}</td>
                <td>{reducerState.vegetarianCheesy}</td>
                <td>{reducerState.vegetarianSpicy}</td>
                <td>{reducerState.vegetarianCheesySpicy}</td>
                <td>{reducerState.vegetarianTotal}</td>
              </tr>
            </tbody>
          </Table>
          <hr />
          <h3>Hotdog Orders</h3>
          <Table>
            <thead>
              <tr className="table-primary">
                <th style={{ width: "10%" }} />
                <th style={{ width: "10%" }}>Normal</th>
                <th style={{ width: "10%" }}>Burnt</th>
                <th style={{ width: "10%" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Total</th>
                <td>{reducerState.hotdogNormal}</td>
                <td>{reducerState.hotdogBurnt}</td>
                <td>{reducerState.hotdogTotal}</td>
              </tr>
            </tbody>
          </Table>
        </>
      ) : (
        <></>
      )}
    </Jumbotron>
  );
}
