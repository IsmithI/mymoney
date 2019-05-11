import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { IField } from "../../interfaces/IField";
import { Dialog, IDialogProps } from "../../components/Dialog";

interface IDialogBuilder<R> {
	make: () => (props: IDialogProps<R>) => ReactElement<IDialogProps<R>>;
}

export class DialogBuilder<R> implements IDialogBuilder<R> {

	private _title: string | ReactNode = '';
	private _fields: IField[] = [];
	private _footer: ReactNode;

	public title = (title: string) => {
		this._title = title;
		return this;
	};

	public withFields = () => {
		return new FieldsBuilder(this);
	};

	public footer = (footer: ReactNode) => {
		this._footer = footer;
		return this;
	};

	public setFields = (fields: IField[]) => {
		this._fields = fields;
	};

	public make = () => {
		return (props: IDialogProps<R>) => {
			return <Dialog title={this._title} footer={this._footer} fields={this._fields} {...props} />
		}
	}
}

class FieldsBuilder<R> {

	private readonly parent: DialogBuilder<R>;
	private _fields: IField[] = [];

	constructor(parent: DialogBuilder<R>) {
		this.parent = parent;
	}

	public add = (f: IField) => {
		this._fields.push(f);
		return this;
	};

	public get = () => {
		this.parent.setFields(this._fields);
		return this.parent;
	};
}