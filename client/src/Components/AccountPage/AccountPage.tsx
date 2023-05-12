import styles from "./AccountPage.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { LoggedinContext } from "../../Context/LoggedinContext";
import { UserContext } from "../../Context/UserContext";
import { User } from "../../types";
import { updateUserData } from "../../utils/fetchHandlers";


const AccountPage = () => {
  const { loggedin } = useContext(LoggedinContext);
  const { user, setUser } = useContext(UserContext);
  const [hideAvatars, setHideAvatars] = useState<boolean>(true);
  const [avatarId, setAvatarId] = useState<number>(user.avatarID);

  const atIndex: number = user.username.indexOf("@");
  const avatars: number[] = [1, 2, 3, 4, 5, 6];

  const initialMount = useRef<boolean>(true);
  useEffect(() => {
    if(initialMount.current) {
      initialMount.current = false;
    } else {
      updateUser();
    }
  }, [avatarId]);

  const updateUser = async() => {
    //todo: implement getuser and call, remove lines below until "remove"
    let updatedUser:User = JSON.parse(JSON.stringify(user));
    updatedUser.avatarID = avatarId;
    setUser(updatedUser);
    // "<--- remove --->"
    let body:BodyInit = JSON.stringify({avatarID: avatarId});
    await updateUserData(`${process.env.REACT_APP_API_URL}api/users/update`, body)
  }
  if (!loggedin) {
    return <h1>Please login to view your account.</h1>
  }
  return (
    <div className={styles.container}>
      <img src={require(`./assets/avatar_${user?.avatarID}.png`)} />
      <a><button onClick={() => setHideAvatars((prevState) => !prevState )}>Change avatar</button></a>
      <div className={styles.changeAvatar} hidden={hideAvatars}>
        {avatars.map(i => {
          return <div key={i} onClick={() => setAvatarId(i)}><img src={require(`./assets/avatar_${i}.png`)} /></div>
        })}
      </div>
      <h1>- {user.username.substring(0, atIndex)} -</h1>
      <div className={styles.highscore}>
        <h2>Highscore</h2>
        <p>{user.highscore}</p>
      </div>
    </div>
  );
}

export default AccountPage;