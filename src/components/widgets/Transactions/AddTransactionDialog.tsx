import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from "@material-ui/core";
import React, { useState } from "react";
import { ITransaction } from "../../../interfaces/ITransaction";
import { CategoriesList } from "./ICategoriesList";

const emptyTransaction: ITransaction = {
  id: "",
  amount: 0,
  category: "",
  date: new Date()
};

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ITransaction) => void;
}

export const AddTransactionDialog = ({ onSubmit, isOpen, onClose }: Props) => {
  const [data, setData] = useState<ITransaction>(emptyTransaction);
  const updateField = (field: string) => (e: React.ChangeEvent<any>) => {
    setData({ ...data, [field]: e.target.value });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add transaction</DialogTitle>
      <DialogContent>
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
            <CategoriesList
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
      </DialogContent>
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
