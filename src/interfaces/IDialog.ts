export interface IDialog<R> {
  isOpen: boolean;
  onSubmit: (record: R) => void;
  onCancel: () => void;
}
