import { Provider } from "mobx-react";
import * as React from "react";
import { IHasChildren } from "../interfaces/IHasChildren";
import { stores } from "../stores";

export const StoresProvider = ({ children }: IHasChildren) => (
	<Provider {...stores}>
		{children}
	</Provider>
);
