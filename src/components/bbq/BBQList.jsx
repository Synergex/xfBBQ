import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBBQs } from "../../redux/actions/bbqActions";
import Spinner from "../../Spinner";
import BBQTable from "./BBQTable";
import { Link } from "react-router-dom";

export default function BBQList() {
  document.title = "𝘹𝘧BBQ - BBQs";

  const dispatch = useDispatch();

  const bbqs = useSelector(state => state.bbqs);
  if (bbqs.length === 0) dispatch(loadBBQs());

  return (
    <div className="jumbotron">
      <h2>BBQs</h2>
      {bbqs.length <= 0 ? (
        <Spinner />
      ) : (
        <>
          <Link to="/BBQRegistrationForm">
            <div className="text-right">
              <button type="button" className="btn btn-primary">
                New BBQ
              </button>
            </div>
            <p />
          </Link>
          <BBQTable bbqs={bbqs} />
        </>
      )}
    </div>
  );
}
