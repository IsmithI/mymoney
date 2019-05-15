import { Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IHasChildren } from "../interfaces";
import { IFirebaseStore } from "../stores/firebaseStore";

interface IProps extends IHasChildren {
  firebaseStore?: IFirebaseStore;
}

const Component = ({ firebaseStore, children }: IProps) => {

  return (
    <>
      {firebaseStore.userIsLoggedIn && children}
      {firebaseStore.error && (
        <Typography variant='title' color='error'>
          {firebaseStore.error.message}
        </Typography>
      )}
    </>
  );
};

export const AuthenticationManager = inject('firebaseStore')(observer(Component));