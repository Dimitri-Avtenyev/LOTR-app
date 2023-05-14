import styles from "./AccountPage.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { LoggedinContext } from "../../Context/LoggedinContext";
import { User } from "../../types";
import { getUserInfo, updateUserData } from "../../utils/fetchHandlers";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";


const AccountPage = () => {
  const { loggedin } = useContext(LoggedinContext);
  const [userInfo, setUserInfo] = useState<User>();
  const [hideAvatars, setHideAvatars] = useState<boolean>(true);
  const [atIndex, setAtIndex] = useState<number>(0);
  const [avatarId, setAvatarId] = useState<number>();

  const avatars: number[] = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    const getUser = async () => {
      let userInfo: User = await getUserInfo();
      setUserInfo(userInfo);
      setAvatarId(userInfo.avatarID);
      setAtIndex(userInfo.username.indexOf("@"));
    }
    getUser();
  }, []);
  useEffect(() => {
    const updateUser = async () => {
      await updateUserData(`${process.env.REACT_APP_API_URL}api/users/update`, JSON.stringify({ avatarID: avatarId }));
    }
    updateUser();
  }, [avatarId]);

  if (!loggedin) {
    return <h1>Please login to view your account.</h1>
  }
  return (
    <div className={styles.container}>
      {userInfo ? <img src={require(`./assets/avatar_${avatarId}.png`)} /> : <LoadingIndicator />}
      <a><button onClick={() => setHideAvatars((prevState) => !prevState)}>Change avatar</button></a>
      <div className={styles.changeAvatar} hidden={hideAvatars}>
        {avatars.map(i => {
          return <div key={i} onClick={() => setAvatarId(i)}><img src={require(`./assets/avatar_${i}.png`)} /></div>
        })}
      </div>
      <h1>- {userInfo?.username?.substring(0, atIndex)} -</h1>
      <div className={styles.highscore}>
        <h2>Highscore</h2>
        <p>{userInfo?.highscore}</p>
      </div>
    </div>
  );
}

export default AccountPage;