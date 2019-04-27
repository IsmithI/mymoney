import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField
} from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { ITodo } from "../../../interfaces/ITodo";

interface Props {
  isOpen: boolean;
  onSubmit: (item: ITodo) => void;
  onCancel: () => void;
}

export const AddTodoItem = ({ onSubmit, onCancel, isOpen }: Props) => {
  const [entity, setEntity] = useState<ITodo>();
  const set = (key: string) => (value: any) => {
    setEntity({ ...entity, [key]: value });
  };

  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>Add todo</DialogTitle>
      <DialogContent>
        <FormGroup row>
          <FormControlLabel
            label="Done"
            control={
              <Checkbox
                value={"completed"}
                checked={entity ? !!entity.completed : false}
                onChange={e => set("completed")(e.target.checked)}
              />
            }
          />
          <TextField
            fullWidth
            label="Title"
            value={entity ? entity.title : ""}
            onChange={e => set("title")(e.target.value)}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onSubmit({ ...entity, created: new Date() })}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
