import {
  observable,
  action,
  makeObservable,
  computed,
  autorun,
  toJS,
} from "mobx";

export default class MessageStore {
  messages = [];
  constructor() {
    makeObservable(this, {
      messages: observable,
      addMessages: action,
      removeMessages: action,
      messageCount: computed,
    });
    autorun(this.logStoreDetails);
  }
  logStoreDetails = () => {
    console.log("store logger for messages");
    console.log("current messages", toJS(this.messages));
  };
  addMessages(text) {
    this.messages.push(text);
  }
  removeMessages(index) {
    if (this.messages.length > 0) {
      this.messages = this.messages.filter((item, idx) => (
        idx !== index
      ));
    }
  }
  get messageCount() {
    return this.messages.length;
  }
}
