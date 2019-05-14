import { IListProps, List } from 'components';
import { IHasId, IListItem } from 'interfaces';
import * as React from 'react';
import { ReactElement } from 'react';

export class ListBuilder<R extends IHasId> {
  private listItem: (props: IListItem<R>) => ReactElement<IListItem<R>>;

  public itemRenderer = (renderer: (props: IListItem<R>) => ReactElement<IListItem<R>>) => {
    this.listItem = renderer;
    return this;
  }

  public onItemChange = (changeHandler: (item: R) => void) => {
    this.changeHandler = changeHandler;
    return this;
  }

  public make = () => {
    return (props: IListProps<R>) => (
      <List Item={this.listItem} onItemChange={this.changeHandler} {...props} />
    );
  }
  private changeHandler: (item: R) => void = () => item => item;
}
