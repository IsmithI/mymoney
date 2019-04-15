import React, { Component } from "react";
import { StoresProvider } from "./providers";
import { AppRouter } from "./components/AppRouter";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import { AppContainer } from "./components/AppContainer";
import './App.css';

class App extends Component {
	render() {
		return (
			<StoresProvider>
				<MuiThemeProvider theme={theme}>
					<AppContainer>
						<AppRouter />
					</AppContainer>
				</MuiThemeProvider>
			</StoresProvider>
		);
	}
}

export default App;
