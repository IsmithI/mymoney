import { createMuiTheme } from "@material-ui/core";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

const primary: PaletteOptions["primary"] = {
	main: "#37474f",
	light: "#62727b",
	dark: "#102027"
};

const secondary: PaletteOptions["secondary"] = {
	main: "#ffab00",
	light: "#ffdd4b",
	dark: "#c67c00"
};

export const theme = createMuiTheme({
	palette: {
		primary,
		secondary,
		background: {
			default: primary.light
		}
	},
	shape: {
		borderRadius: 24
	},
	typography: {
		fontFamily: "Lato, Roboto, sans-serif",
		title: {
			fontWeight: "bold"
		}
	}
});
