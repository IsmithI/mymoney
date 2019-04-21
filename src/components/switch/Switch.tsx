import { ReactNode } from "react";
import React from "react";

interface Props {
  value: any;
  children: any;
}

export const Switch = ({ children, value }: Props) =>
  React.Children.toArray(children).find(
    child => !child.props.on || child.props.on === value
  );
