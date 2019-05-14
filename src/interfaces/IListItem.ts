export interface IListItem<R> {
  item: R;
  onItemChange?: (item: R) => void;
  onItemDelete?: (item: R) => void;
}