import * as firebase from 'firebase';
import { action, observable } from 'mobx';
import { db } from 'utils';

export interface ISettingsStore {
  data: any;
  load: () => Promise<any>;
  toggleToolbar: () => void;
  loaded: boolean;
  saveSettings: () => Promise<any>;
}

class SettingsStore implements ISettingsStore {
  @observable loaded = false;

  @observable data;

  constructor() {
    this.load();
  }

  @action
  toggleToolbar = () => {
    this.data.toolbarEnabled = !this.data.toolbarEnabled;
  }

  @action
  load = () => {
    this.loaded = false;
    return db
      .getById('settings')('common')
      .then(this.saveLoadedData)
      .then(d => {
        this.loaded = true;
        return d;
      });
  }

  @action
  saveLoadedData = (doc: firebase.firestore.QueryDocumentSnapshot) => {
    this.data = {
      ...doc.data()
    };
    return this.data;
  }

  @action
  saveSettings = () => {
    return db.set('settings')({ id: 'common', ...this.data });
  }
}

export const settingsStore = new SettingsStore();
