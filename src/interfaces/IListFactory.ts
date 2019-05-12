import { IListProps } from 'components';
import { IHasId } from 'interfaces';
import { ReactElement } from 'react';

export interface IListFactory<R extends IHasId> {
  createEntityList: () => (props: IListProps<R>) => ReactElement<typeof props>;
}
