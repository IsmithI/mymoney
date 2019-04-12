import * as React from 'react';

export interface IFaIconProps {
  icon: string;
  group?: string;
}

export const FaIcon = ({ icon, group = 'fas'}: IFaIconProps) => (
  <i className={`${group} fa-${icon}`}/>
)