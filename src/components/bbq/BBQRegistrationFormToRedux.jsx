import React from "react";
import { FormSpy } from "react-final-form";
import { saveBBQ } from "../../redux/actions/bbqActions";
import { useDispatch } from "react-redux";
import moment from "moment";

export default function BBQRegistrationFormToRedux() {
  const dispatch = useDispatch();

  return (
    <FormSpy
      onChange={state => {
        if (state.submitting) {
          dispatch(
            saveBBQ({
              ...state.values,
              heldDate: moment(state.values.heldDate).toJSON(),
              creationDate: new Date().toJSON()
            })
          );
        }
      }}
    />
  );
}
