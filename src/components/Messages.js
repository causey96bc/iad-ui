import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import {
  observable,
  action,
  makeObservable,
  computed,
  autorun,
} from "mobx";

class MessageStore {
  messages = [];
  constructor() {
    makeObservable(this, {
      messages: observable,
      addMessage: action,
      removeMessage: action,
      messageCount: computed,
    });
    autorun(this.logStoreDetails);
  }

  logStoreDetails = () => {
    //add any store loggers here
  };

  addMessage(message) {
    this.messages.push(message);
  }

  removeMessage(index) {
    if (this.messages.length > 0) {
      this.messages = this.messages.filter((item, idx) => idx !== index);
    }
  }
  get messageCount() {
    return this.messages.length;
  }
}
export const messageStore = new MessageStore();

const Messages = () => {
  const [open, setOpen] = useState(true);

  function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
  }

  const handleClose = (event, reason, idx) => {
    if ((reason === "clickaway" || "timeout") && idx !== null) {
      messageStore.removeMessage(idx);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setOpen(true);
    }
  }, [messageStore.messageCount]);

  return messageStore.messages.map((m, index) => (
    <Snackbar
      key={index}
      message={m.text}
      open={open}
      onClose={(e) => handleClose(e, m.type, index)}
      autoHideDuration={m.timeout || m.type == "error" ? 8000 : 3000}
    >
      <Alert
        onClose={(e) => handleClose(e, m.type, index)}
        severity={m.type}
      >
        {m.text}
      </Alert>
    </Snackbar>
  ));
};
export default observer(Messages);
