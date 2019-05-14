import { Toggler } from "@ismithi/react-utils";
import { Dialog, DialogTitle, Icon } from "@material-ui/core";
import { Fab } from "components/Fab";
import { inject } from "mobx-react";
import * as React from "react";
import { ISettingsStore } from "stores/settingsStore";

interface IProps {
  settingsStore?: ISettingsStore;
}

export const SaveFab = inject('settingsStore')(({ settingsStore }: IProps) => {
  const handleSave = (onDone: () => void) => () => settingsStore.saveSettings().then(onDone);
  return (
    <Toggler>
      {({ isOpen, close, open }) => (
        <>
          <Fab onClick={handleSave(open)}>
            <Icon>save</Icon>
          </Fab>
          <Dialog
            open={isOpen}
            onClose={close}
          >
            <DialogTitle>
              Saved!
            </DialogTitle>
          </Dialog>
        </>
      )}
    </Toggler>
  );
});