import React from "react";
import ChatMessage from './ChatMessage'

const ChatRoom = ({ messages, formValue, setFormValue, sendMessage, dummy, auth }) => {
    
    return (
      <>
        <main>
          {messages &&
                    messages.map((msg) => <ChatMessage key={ msg.id } message={ msg } auth={auth} />) }
                
                <div ref={dummy}></div>
        </main>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={e => setFormValue(e.target.value)} />
                <button type="submit">submit</button>
        </form>
      </>
    );
}

export default ChatRoom
