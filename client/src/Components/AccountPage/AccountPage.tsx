import styles from "./AccountPage.module.css";
import { useContext } from "react";
import { LoggedinContext } from "../../Context/LoggedinContext";
import { UserContext } from "../../Context/UserContext";


const AccountPage = () => {
  const {loggedin} = useContext(LoggedinContext);
  const {user} = useContext(UserContext);
  if(!loggedin) {
    return <h1>Please login to view your account.</h1>
  }
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img src={require(`./assets/avatar_${user?.avatarID}.png`)}/>
        <h1>- {user.userName} -</h1>
        <h2>Highscore</h2>
        <p>{user.highscore}</p>
      </div>
    </div>
  );
}

export default AccountPage;