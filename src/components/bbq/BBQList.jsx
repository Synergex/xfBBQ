import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBBQs } from "../../redux/actions/bbqActions";
import Spinner from "../../Spinner";
import BBQTable from "./BBQTable";
import { Link } from "react-router-dom";
import moment from "moment";

let nextBBQ;
let bbqList;
export default function BBQList() {
  document.title = "𝘹𝘧BBQ - BBQs";

  const dispatch = useDispatch();

  const bbqs = useSelector(state => state.bbqs);
  if (Array.isArray(bbqs)) dispatch(loadBBQs());
  else {
    // Get closest upcoming BBQ
    const rightNow = parseInt(moment().format("X"));
    if (bbqs.value.length > 0) {
      bbqList = { ...bbqs };
      nextBBQ = bbqList.value
        .filter(k => k.Helddate >= rightNow)
        .sort((a, b) => a.Helddate - b.Helddate)[0];
      bbqList.value = bbqList.value.filter(bbq => bbq.Id !== nextBBQ.Id);
      bbqList.value.unshift(nextBBQ);
    }
  }

  return (
    <div className="jumbotron">
      <Link to="/BBQRegistrationForm">
        <button type="button" className="btn btn-primary float-right">
          New BBQ
        </button>
      </Link>
      <h2>BBQs</h2>
      {Array.isArray(bbqs) ? <Spinner /> : <BBQTable bbqs={bbqList} />}
    </div>
  );
}
