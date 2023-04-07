import styles from "./AccountPage.module.css";
import { User } from "../../types";
import { useContext } from "react";
import { LoggedinContext } from "../../Context/LoggedinContext";


const AccountPage = ({account}:{account:User}) => {
  const {loggedin} = useContext(LoggedinContext);
  if(!loggedin) {
    return <h1>Please login to view your account.</h1>
  }
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img src={require(`./assets/avatar_${account?.avatarID}.png`)}/>
        <h1>- {account.userName} -</h1>
        <h2>Highscore</h2>
        <p>{account.highscore}</p>
      </div>
    </div>
  );
}

export default AccountPage;