import { List as MuiList } from '@material-ui/core';
import { IHasId, IListItem } from 'interfaces';
import { observer } from "mobx-react";
import * as React from 'react';
import { ReactElement } from 'react';

export interface IListProps<R extends IHasId> {
  items: R[];
  Item?: (props: IListItem<R>) => ReactElement<IListItem<R>>;
  onItemChange?: (item: R) => void;
  onItemDelete?: (item: R) => void;
}

@observer
export class List<R extends IHasId> extends React.Component<IListProps<R>> {
  public render(): React.ReactNode {
    const { items, Item } = this.props;

    return (
      <MuiList disablePadding={true}>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onItemChange={this.props.onItemChange}
            onItemDelete={this.props.onItemDelete}
          />
        ))}
      </MuiList>
    );
  }
}
