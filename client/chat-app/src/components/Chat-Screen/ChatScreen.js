import styles from "./ChatScreen.module.css";
import ProfilePicture from "../Main/images/pp.svg";
import { useState, useRef, useEffect } from "react";
import Message from "../Message/Message";

function ChatScreen({ data }) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (message.trim().length) {
      console.log(data);
      data.onSend(message);
      setMessage("");
    }
  };

  const checkKeyPress = (event) => {
    const { key, keyCode } = event;
    if (keyCode === 13) {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const date = (timestamp) => {
      const hours = new Date(timestamp).getUTCHours().toString();
      let minutes = new Date(timestamp).getMinutes().toString();
     if (minutes.length === 1) { minutes = "0" + minutes}
      return ( hours + ":" + minutes)
  };

  useEffect(() => {
    scrollToBottom();
    console.log(data)
  }, [data]);

  return (
    <div className={styles.main}>
      <div className={styles.topBar}>
        <div className={styles.userImageDiv}>
          <img alt="" className={styles.userImage} src={ProfilePicture} />
          {data.online && <div className={styles.online}></div>}
        </div>
        <div className={styles.userTextDiv}>
          <p className={styles.userText}>{data.user?.username}</p>
        </div>
      </div>
      <div className={styles.messages}>
        {data.messages.map((message) => (
          <Message
            key={message.id}
            data={{
              message: message.content,
              date: date(message.timestamp) ,
              sent: !(message.sender_id === data.user?.id),
            }}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.bottomBar}>
        <input
          value={message}
          onKeyDown={checkKeyPress}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className={styles.messageInput}
          placeholder="Write a message"
        ></input>
      </div>
    </div>
  );
}

export default ChatScreen;
