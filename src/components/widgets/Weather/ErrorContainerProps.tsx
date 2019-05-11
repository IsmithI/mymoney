import { Card, CardContent, Typography } from "@material-ui/core";
import * as React from "react";

interface IErrorContainerProps {
  message: string;
}

export const ErrorContainer = ({ message }: IErrorContainerProps) => (
  <Card>
    <CardContent>
      <Typography variant="title">{message}</Typography>
    </CardContent>
  </Card>
);
