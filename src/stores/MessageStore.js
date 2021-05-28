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
      successMessages: computed,
      errorMessages: computed,
      addMessages: action,
      removeMessages: action,
      handleMessage: action,
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
  handleMessage(text) {
    this.messages.push(text);
  }
  get successMessages() {
    return this.messages.filter((message) => message.type === "success");
  }

  get errorMessages() {
    return this.messages.filter((message) => message.type === "false");
  }

  removeMessages(index) {
    if (this.messages.length > 0) {
      this.messages = this.messages.filter((item, idx) => idx !== index);
    }
  }
  get messageCount() {
    return this.messages.length;
  }
}
