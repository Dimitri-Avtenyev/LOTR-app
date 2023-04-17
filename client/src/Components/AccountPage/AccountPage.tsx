import styles from "./AccountPage.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { LoggedinContext } from "../../Context/LoggedinContext";
import { UserContext } from "../../Context/UserContext";
import { User } from "../../types";


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
    let updatedUser:User = JSON.parse(JSON.stringify(user));
    updatedUser.avatarID = avatarId;
    setUser(updatedUser);

    try {
      let response = await fetch("http://localhost:3000/api/users/update", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify ({
          username: user.username,
          avatarID: updatedUser.avatarID
        })
      });
      if (response.status === 200) {
        setHideAvatars(true);
      }
    } catch(err) {
      console.log(err);
    }
  }
  if (!loggedin) {
    return <h1>Please login to view your account.</h1>
  }
  return (
    <div className={styles.container}>
      <img src={require(`./assets/avatar_${user?.avatarID}.png`)} />
      <button onClick={() => setHideAvatars((prevState) => !prevState )}>Change avatar</button>
      <div className={styles.changeAvatar} hidden={hideAvatars}>
        {avatars.map(i => {
          return <div key={i} onClick={() => setAvatarId(i)}><img src={require(`./assets/avatar_${i}.png`)} /></div>
        })}
      </div>
      <h1>- {user.username.substring(0, atIndex)} -</h1>
      <h2>Highscore</h2>
      <p>{user.highscore}</p>
    </div>
  );
}

export default AccountPage;