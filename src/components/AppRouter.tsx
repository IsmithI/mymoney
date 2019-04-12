import { IFirebaseStore } from "../stores/firebaseStore";
import { inject, observer } from "mobx-react";
import React from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Home } from "../views/Home";
import { Categories } from "../views/Categories";
import { dialogs } from "./dialogs";

export interface IAppRouterProps {
	firebaseStore?: IFirebaseStore;
}

@inject("firebaseStore")
@observer
export class AppRouter extends React.Component<IAppRouterProps> {
	render() {
		if (!this.props.firebaseStore) return null;

		const { userIsLoggedIn } = this.props.firebaseStore;

		return (
			<>
				{userIsLoggedIn && (
					<>
						<BrowserRouter>
							<Switch>
								<Route exact path="/" component={Home} />
								<Route path="/categories" component={Categories} />
							</Switch>
						</BrowserRouter>
						{dialogs}
					</>
				)}
			</>
		);
	}
}
