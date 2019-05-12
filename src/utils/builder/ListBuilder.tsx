import { IListProps, List } from 'components';
import { IHasId } from 'interfaces';
import * as React from 'react';
import { ReactNode } from 'react';

export class ListBuilder<R extends IHasId> {
  private listItem: (item: R) => ReactNode;

  public itemRenderer = (renderer: (item: R) => ReactNode) => {
    this.listItem = renderer;
    return this;
  }

  public make = () => {
    return (props: IListProps<R>) => <List renderItem={this.listItem} {...props} />;
  }
}
