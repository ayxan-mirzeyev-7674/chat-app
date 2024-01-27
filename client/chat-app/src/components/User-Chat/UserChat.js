import styles from "./UserChat.module.css";
import ProfilePicture from "./images/pp.svg"

function UserChat({ data }) {
    return (
        <button onClick={data.onClick} className={data.selectedChat === data.chatId ? styles.selectedChat : styles.main}>
            <div className={styles.imageDiv}>
                <img alt="" src={ProfilePicture} className={styles.image}/>
            </div>
            <div className={styles.textDiv}>
                <p className={styles.username}>{data.username}</p>
                <p className={styles.lastMessage}>{data.lastMessage}</p>
            </div>
        </button>
     );
}

export default UserChat;