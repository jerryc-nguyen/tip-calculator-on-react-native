
import  EventEmitter from 'EventEmitter';

let eventHandler = new EventEmitter();

export default {
  CalculatorPage: {
    id: "CalculatorPage",
    title: "Tip Calculator Page",
    labelLeft: "",
    labelRight: "Settings",
    actionRight: null,
    eventHandler: eventHandler
  },
  SettingsPage: {
    id: "SettingsPage",
    title: "Settings Page",
    labelLeft: "Cancel",
    labelRight: "Save",
    actionRight: "save_setting",
    eventHandler: eventHandler
  }
}
