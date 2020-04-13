import React from 'react';

import './Message.css';

export default function Message({ message: { user, text }, name }) {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText">
            {trimmedName}
          </p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">
              {text}
            </p>
          </div>
        </div>
      ) : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">
              {text}
            </p>
          </div>
          <p className="sentText">{user}</p>
        </div>
      )
  )
}
