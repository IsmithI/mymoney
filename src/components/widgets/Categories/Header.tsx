import { CardHeader, Icon, IconButton } from "@material-ui/core";
import React from "react";

export const Header = () => (
  <CardHeader
    title="Top categories"
    titleTypographyProps={{ variant: "title" }}
    action={
      <IconButton>
        <Icon>settings</Icon>
      </IconButton>
    }
  />
);
