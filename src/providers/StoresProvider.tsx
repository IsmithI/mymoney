import * as React from 'react';
import { Provider } from "mobx-react";
import { stores } from "../stores";
import { IHasChildren } from "../interfaces/IHasChildren";


export const StoresProvider = ({ children }: IHasChildren) => (
	<Provider {...stores}>
		{children}
	</Provider>
)