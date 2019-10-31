import React from "react";
import { FormSpy } from "react-final-form";
import { saveUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import * as bcrypt from "bcryptjs";

export default function UserRegistrationFormToRedux() {
  const dispatch = useDispatch();
  const saltRounds = 13;

  return (
    <FormSpy
      onChange={state => {
        if (state.submitting) {
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(state.values.hash, salt, function(err, hash) {
              dispatch(
                saveUser({
                  ...state.values,
                  hash,
                  joinDate: new Date().toJSON()
                })
              );
            });
          });
        }
      }}
    />
  );
}
