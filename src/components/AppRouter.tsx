import { IFirebaseStore } from "../stores/firebaseStore";
import { inject, observer } from "mobx-react";
import React from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Home, Categories } from "../views";

interface Props {
  firebaseStore?: IFirebaseStore;
}

export const AppRouter = inject("firebaseStore")(
  observer(({ firebaseStore: { userIsLoggedIn } }: Props) => (
    <>
      {userIsLoggedIn && (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/categories" component={Categories} />
          </Switch>
        </BrowserRouter>
      )}
    </>
  ))
);
