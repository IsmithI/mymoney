import { ReactNode } from "react";
import React from "react";

interface Props {
  children: ReactNode;
  on?: any;
}

export const Route = ({ children }: Props) => <>{children}</>;
