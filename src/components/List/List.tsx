import { List as MuiList } from '@material-ui/core';
import { IHasId } from 'interfaces';
import * as React from 'react';
import { ReactNode } from 'react';

export interface IListProps<R extends IHasId> {
  items: R[];
  renderItem?: (item: R) => ReactNode;
}

export class List<R extends IHasId> extends React.Component<IListProps<R>> {
  public render(): React.ReactNode {
    const { items, renderItem } = this.props;

    return <MuiList disablePadding={true}>{items.map(renderItem)}</MuiList>;
  }
}
