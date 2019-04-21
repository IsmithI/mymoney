import {
  Button,
  Dialog,
  DialogActions,
  DialogContent as MuiDialogContent,
  DialogTitle,
  Grid,
  TextField
} from "@material-ui/core";
import React, { useState } from "react";
import { ITransaction } from "../../../interfaces/ITransaction";
import { CategoriesSelect } from "./CategoriesSelect";
import { inject, observer } from "mobx-react";
import { IEntityStore } from "../../../stores/entityStore";
import { Load } from "@ismithi/react-utils";

const emptyTransaction: ITransaction = {
  id: "",
  amount: 0,
  category: "",
  date: new Date()
};

export interface Props {
  transactionsStore?: IEntityStore<ITransaction>;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ITransaction) => void;
}

/**
 * TODO add method `add` to Entities store
 */
export const AddTransactionDialog = ({ onSubmit, isOpen, onClose }: Props) => {
  const [data, setData] = useState<ITransaction>(emptyTransaction);
  const updateField = (field: string) => (e: React.ChangeEvent<any>) => {
    setData({ ...data, [field]: e.target.value });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add transaction</DialogTitle>
      <DialogContent data={data} updateField={updateField} />
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onSubmit(data)}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface DialogContentProps {
  data: ITransaction;
  updateField: (key: string) => (e: React.ChangeEvent<any>) => void;
}

const DialogContent = ({ data, updateField }: DialogContentProps) => (
  <MuiDialogContent>
    <Grid container direction="column" alignItems="stretch" spacing={16}>
      <Grid item>
        <TextField
          fullWidth
          label="Id"
          value={data.id}
          onChange={updateField("id")}
        />
      </Grid>
      <Grid item>
        <CategoriesSelect
          value={data.category}
          onChange={updateField("category")}
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          label="amount"
          type="number"
          value={data.amount}
          onChange={updateField("amount")}
        />
      </Grid>
    </Grid>
  </MuiDialogContent>
);
