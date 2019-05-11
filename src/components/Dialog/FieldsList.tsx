import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Input, InputLabel } from "@material-ui/core";
import * as React from "react";
import { IField } from "../../interfaces/IField";
import { Route, Switch } from "../switch";

export interface IFieldsList<R> {
  record: R;
  fields: IField[];
  onChange: (key: string) => (value: any) => void;
}

export function FieldsList<R>({ fields, record, onChange }: IFieldsList<R>) {
  const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(key)(e.target.value);
  };

  const handleCheckboxChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(key)(e.target.checked);
  };

  return (
    <Grid container={true} spacing={8}>
      {fields.map((field) => (
        <Grid item={true} xs={6} key={field.key}>
          {field.render ? field.render({ fields, record, onChange }) : (
            <FormControl>
              <Switch value={field.type}>
                <Route on="text">
                  <InputLabel htmlFor={field.key}>{field.title}</InputLabel>
                  <Input
                    id={field.key}
                    type="text"
                    value={record && record.hasOwnProperty(field.key) ? record[field.key] : ""}
                    onChange={handleInputChange(field.key)}
                    aria-describedby={field.key}
                  />
                </Route>
                <Route on={"number"}>
                  <InputLabel htmlFor={field.key}>{field.title}</InputLabel>
                  <Input
                    id={field.key}
                    type="number"
                    value={record && record.hasOwnProperty(field.key) ? record[field.key] : ""}
                    onChange={handleInputChange(field.key)}
                    aria-describedby={field.key}
                  />
                </Route>
                <Route on="boolean">
                  <FormGroup>
                    {field.title ?
                      <FormControlLabel
                        label={field.title}
                        control={
                          <Checkbox
                            value={field.key}
                            checked={record ? !!record[field.key] : false}
                            onChange={handleCheckboxChange(field.key)}
                          />
                        }
                      />
                      :
                      <Checkbox
                        value={field.key}
                        checked={record ? !!record[field.key] : false}
                        onChange={handleCheckboxChange(field.key)}
                      />}
                  </FormGroup>
                </Route>
              </Switch>
            </FormControl>
          )}
        </Grid>
      ))}
    </Grid>
  );
}
