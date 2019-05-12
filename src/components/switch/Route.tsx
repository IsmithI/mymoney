import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  on?: any;
}

export const Route = ({ children }: IProps) => <>{children}</>;
