import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Messages = ({ messageStore }) => {
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

  return (
    <div>
      {messageStore.successMessages.map((m, index) => (
        <Snackbar
          key={index}
          message={m.text}
          open={open}
          onClose={(e) => handleClose(e, m.type, index)}
          autoHideDuration={3000}
        >
          <Alert
            onClose={(e) => handleClose(e, m.type, index)}
            severity="success"
          >
            {m.text}
          </Alert>
        </Snackbar>
      ))}
      {messageStore.errorMessages.map((m, index) => (
        <Snackbar
          key={index}
          open={open}
          autoHideDuration={8000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {m.text}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};
export default observer(Messages);
