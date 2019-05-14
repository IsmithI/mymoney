import { Card, CardContent, FormControlLabel, FormGroup, Grow, Switch } from "@material-ui/core";
import { PageHeader } from "components";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ISettingsStore } from "stores/settingsStore";
import { SaveFab } from "./SaveFab";

interface ISettings {
  settingsStore?: ISettingsStore;
}

class Component extends React.Component<ISettings> {

  public componentDidMount() {
    this.props.settingsStore.load();
  }

  public render() {
    if (!this.props.settingsStore.loaded) { return <></>; }

    const { settingsStore: { data: { toolbarEnabled }, toggleToolbar } } = this.props;
    return (
      <>
        <PageHeader title='Settings'/>
        <Grow in={true}>
            <Card>
              <CardContent>
                <FormGroup row={true}>
                  <FormControlLabel
                    label='Enable toolbar'
                    control={
                      <Switch
                        onChange={toggleToolbar}
                        checked={toolbarEnabled}
                      />
                    }
                  />
                </FormGroup>
              </CardContent>
            </Card>
        </Grow>
        <SaveFab/>
      </>
    );
  }
}

export const Settings = inject('settingsStore')(observer(Component));