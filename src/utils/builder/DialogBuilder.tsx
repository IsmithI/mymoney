import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { Dialog, IDialogProps } from "../../components/Dialog";
import { IField } from "../../interfaces/IField";
import { FieldsBuilder } from "./FieldsBuilder";

interface IDialogBuilder<R> {
	make: () => (props: IDialogProps<R>) => ReactElement<IDialogProps<R>>;
}

export class DialogBuilder<R> implements IDialogBuilder<R> {

	private dialogTitle: string | ReactNode = "";
	private dialogFields: IField[] = [];
	private dialogFooter: ReactNode;

	public title = (title: string) => {
		this.dialogTitle = title;
		return this;
	}

	public withFields = () => {
		return new FieldsBuilder(this);
	}

	public footer = (footer: ReactNode) => {
		this.dialogFooter = footer;
		return this;
	}

	public setFields = (fields: IField[]) => {
		this.dialogFields = fields;
	}

	public make = () => {
		return (props: IDialogProps<R>) => {
			return <Dialog title={this.dialogTitle} footer={this.dialogFooter} fields={this.dialogFields} {...props} />;
		};
	}
}