import { Fab as MuiFab, withStyles } from "@material-ui/core";
import { FabProps } from "@material-ui/core/Fab";
import * as React from "react";
import styles from "./styles";

export const Fab = withStyles(styles)((props: FabProps) => <MuiFab {...props} color='secondary' />);