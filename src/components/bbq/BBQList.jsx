import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBBQs } from "../../redux/actions/bbqActions";
import Spinner from "../../Spinner";
import BBQTable from "./BBQTable";
import { Link } from "react-router-dom";
import moment from "moment";

export default function BBQList() {
  document.title = "𝘹𝘧BBQ - BBQs";

  // Get BBQs
  const dispatch = useDispatch();
  const bbqs = useSelector(state => state.bbqs);
  useEffect(() => {
    dispatch(loadBBQs());
  }, [dispatch]);

  // Setup the BBQ list
  const [bbqList, setBBQList] = useState({ value: [] });

  // Get closest upcoming BBQ, and shove it to the top of the array
  useEffect(() => {
    const nextBBQ = bbqs.value
      .filter(k => k.Helddate >= parseInt(moment().format("X")))
      .sort((a, b) => a.Helddate - b.Helddate)[0];

    if (nextBBQ) {
      setBBQList({
        ...bbqs,
        value: [nextBBQ, ...bbqs.value.filter(bbq => bbq.Id !== nextBBQ.Id)]
      });
    } else setBBQList({ ...bbqs });
  }, [bbqs]);

  // Display the table
  return (
    <div className="jumbotron">
      <Link to="/BBQRegistrationForm">
        <button type="button" className="btn btn-primary float-right">
          New BBQ
        </button>
      </Link>
      <h2>BBQs</h2>
      {bbqList.value.length > 0 && bbqList.value[0].Creationdate !== 0 ? (
        <BBQTable bbqs={bbqList} />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
