import React from "react";

interface IProps {
	value: any;
	children: any;
}

export const Switch = ({ children, value }: IProps) =>
	React.Children.toArray(children).find(
		(child) => !child.props.on || child.props.on === value,
	);
