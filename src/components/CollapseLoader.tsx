import * as React from "react";
import { IHasChildren } from "../interfaces";
import { Collapse, CircularProgress } from "@material-ui/core";

interface Props extends IHasChildren {
  loading: boolean;
}

export const CollapseLoader = ({ loading, children }: Props) => (
  <>
    <Collapse in={!loading}>{children}</Collapse>
    {loading && <CircularProgress />}
  </>
);
