import React, { useState } from 'react';
import "./User.css"

const User = (user) => {
  user = {
    userImage: "https://randomuser.me/api/portraits/lego/5.jpg",
    mame: "User 1"
  }
  const btnText = user ? "Logout" : "Login";

  return (
    <div className="d-flex gap-2">
      <img src={user.userImage} alt="user picture"></img>
      <div className="d-flex flex-column">
        <h3>{user.name}</h3>
        <button className="btn btn-danger" >{btnText}</button>
      </div>
    </div>
  )
}
export default User