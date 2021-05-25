import React from "react";
import { observer } from "mobx-react-lite";

const Messages = ({ messageStore }) => {
  const closeStyles = {
    float: "right",
    cursor: "pointer",
  };
  return (
    <div>
      {messageStore.messages.map((m, index) => (
        <div className="alert alert-primary">
          {m}
          <span
            style={closeStyles}
            onClick={() => messageStore.removeMessages(index)}
          >
            &times;
          </span>
        </div>
      ))}
    </div>
  );
};
export default observer(Messages);
