import { inject, observer } from "mobx-react";
import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { IFirebaseStore } from "stores/firebaseStore";
import { Home, ProjectView, Weather } from "views";

interface IProps {
  firebaseStore?: IFirebaseStore;
}

export const AppRouter = inject("firebaseStore")(
  observer(({ firebaseStore: { userIsLoggedIn } }: IProps) => (
    <>
      {userIsLoggedIn && (
        <BrowserRouter>
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route exact={true} path='/weather' component={Weather} />
            <Route exact={true} path='/projects' component={ProjectView} />
          </Switch>
        </BrowserRouter>
      )}
    </>
  ))
);
