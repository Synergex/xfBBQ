import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBBQs } from "../../redux/actions/bbqActions";
import Spinner from "../../Spinner";
import BBQTable from "./BBQTable";

export default function BBQList() {
  const dispatch = useDispatch();

  const bbqs = useSelector(state => state.bbqs);
  if (bbqs.length === 0) dispatch(loadBBQs());

  return (
    <div className="jumbotron">
      <h2>BBQs</h2>
      {bbqs.length <= 0 ? <Spinner /> : <BBQTable bbqs={bbqs} />}
    </div>
  );
}
