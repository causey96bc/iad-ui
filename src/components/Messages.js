import React from "react";
import { observer } from "mobx-react-lite";

const Messages = ({ messageStore }) => {
  const closeStyles = {
    float: "right",
    cursor: "pointer",
  };

  return (
    <div>
      {messageStore.successMessages.map((m, index) => (
        <div>{m.text}</div>
      ))}
    </div>
  );
};
export default observer(Messages);
