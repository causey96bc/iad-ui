import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Messages = ({ messageStore }) => {
  const [open, setOpen] = useState(true);

  function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {messageStore.successMessages.map((m, index) => (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {m.text}
          </Alert>
        </Snackbar>
      ))}
      {messageStore.errorMessages.map((m, index) => (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {m.text}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};
export default observer(Messages);
