import styles from "./Message.module.css";

function Message({ data }) {
  return (
    <div className={styles.main}>
      <div className={data.sent ? styles.secondSent : styles.secondRecieved}>
        <div className={data.sent ? styles.messageSent : styles.messageRecieved}>
            {data.message}
            <span className={styles.dateMain}>
                <span className={styles.date}>
                    {data.date}
                </span>
            </span>
        </div>
      </div>
    </div>
  );
}

export default Message;
