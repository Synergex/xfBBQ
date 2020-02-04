import React, { useReducer, useEffect, useState } from "react";
import moment from "moment";
import fetchQuery from "../../scripts/fetchQuery";
import { useDispatch, useSelector } from "react-redux";
import { loadBBQs } from "../../redux/actions/bbqActions";
import Spinner from "../../Spinner";

export default function ShoppingList() {
  document.title = "𝘹𝘧BBQ - Shopping List";

  // Get BBQS
  const dispatch = useDispatch();
  const bbqs = useSelector(state => state.bbqs);
  useEffect(() => {
    dispatch(loadBBQs());
  }, [dispatch]);

  // Set reducers for state of shopping list
  const [reducerState, setReducerState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      nextBBQ: {},
      beefCount: 0,
      turkeyCount: 0,
      vegetarianCount: 0,
      cheeseCount: 0,
      bunCount: 0,
      hotdogCount: 0
    }
  );
  const [upcomingBBQs, setUpcomingBBQs] = useState(0);

  // Fetch queries when bbqs are finally loaded
  useEffect(() => {
    (async function countFunction() {
      setUpcomingBBQs(
        bbqs.value
          .filter(bbq => bbq.Helddate >= parseInt(moment().format("X")))
          .sort((a, b) => a.Helddate - b.Helddate)
      );
      const nextBBQ = bbqs.value
        .filter(bbq => bbq.Helddate >= parseInt(moment().format("X")))
        .sort((a, b) => a.Helddate - b.Helddate)[0];

      if (nextBBQ) {
        const nextBBQID = nextBBQ.Id;

        const beefCount = await fetchQuery(
          "Orders/$count?$filter=Bbqid eq " + nextBBQID + " and Meat eq 1"
        );
        const turkeyCount = await fetchQuery(
          "Orders/$count?$filter=Bbqid eq " + nextBBQID + " and Meat eq 2"
        );
        const vegetarianCount = await fetchQuery(
          "Orders/$count?$filter=Bbqid eq " + nextBBQID + " and Meat eq 3"
        );
        const cheeseOrders = await fetchQuery(
          "Orders?$filter=Bbqid eq " + nextBBQID + "&$select=Cheese"
        );
        const cheeseCount = cheeseOrders.value.reduce(
          (a, b) => a + b.Cheese,
          0
        );
        const bunCount = beefCount + turkeyCount + vegetarianCount;

        const hotdogOrdersCount = await fetchQuery(
          "Orders?$filter=Bbqid eq " + nextBBQID + "&$select=Count"
        );
        const hotdogCount = hotdogOrdersCount.value.reduce(
          (a, b) => a + b.Count,
          0
        );

        setReducerState({
          nextBBQ,
          beefCount,
          turkeyCount,
          vegetarianCount,
          cheeseCount,
          bunCount,
          hotdogCount
        });
      }
    })();
  }, [bbqs]);

  // Present results
  return (
    <div className="jumbotron">
      <h2>Shopping List</h2>
      {bbqs.value.length > 0 && reducerState.nextBBQ.Helddate ? (
        <>
          <h5>
            Shopping list for upcoming BBQ on{" "}
            {moment
              .unix(reducerState.nextBBQ.Creationdate)
              .format("MM/DD/YYYY")}
          </h5>
          Beef Patties: {reducerState.beefCount}
          <br />
          Turkey Patties: {reducerState.turkeyCount}
          <br />
          Vegetarian Patties: {reducerState.vegetarianCount}
          <br />
          Cheese Slices: {reducerState.cheeseCount}
          <br />
          Hamburger Buns: {reducerState.bunCount}
          <br />
          Hotdogs and Hotdog Buns: {reducerState.hotdogCount}
          <br />
        </>
      ) : bbqs.value.length > 0 && upcomingBBQs.length <= 0 ? (
        <>There are no upcoming BBQs.</>
      ) : (
        <>
          <Spinner />
          <center>
            <i>Crunching the numbers...</i>
          </center>
        </>
      )}
    </div>
  );
}
