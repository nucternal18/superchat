import React from "react";

const ChatMessage = ({ message, auth }) => {
    const { text, uid, photoURL } = message;
    
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img src={ photoURL } alt="avatar" />
            <p>{ text}</p>
      </div>
  )
};

export default ChatMessage;
