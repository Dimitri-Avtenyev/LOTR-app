import { useContext, useEffect, useState } from "react";
import { Blacklist, User } from "../../../types";
import styles from "../Blacklist/Blacklisted.module.css";
import deleteBin from "../assets/deleteBin.svg";
import { UserContext } from "../../../Context/UserContext";


const Blacklisted = ({ user }: { user: User }) => {
  const [blacklist, setBlacklist] = useState<Blacklist[]>(user.blacklist);
  const [updatedUser, setUpdatedUser] = useState<User>(user);
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    updateUser();
  }, [blacklist]);
  
  const removeQuote = async (id: string) => {
    let blacklistCpy: Blacklist[] = blacklist.filter(blacklistItem => blacklistItem.quote?.id !== id);
    setBlacklist(blacklistCpy);
  }
  const updateUser = async () => {
    let userUpdated: User = JSON.parse(JSON.stringify(user));
    userUpdated.blacklist = [...blacklist];
    setUser(userUpdated);
    
    try {
      let respose = await fetch("http://localhost:3000/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          blacklist: userUpdated.blacklist
        })
      });
      if(respose.status === 200) {
       
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (blacklist.length === 0) {
    return (
      <div>
        <h1>Nothing to show, list is empty.</h1>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1>Blacklist</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Quote</th>
            <th>Reason for blacklisting</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {blacklist.map(blacklistItem => {
            return (
              <tr key={blacklistItem.quote?.id}>
                <td>{blacklistItem.quote?.dialog}</td>
                <td>{blacklistItem.reasonForBlacklisting}</td>
                <td><button className={styles.binBtn} onClick={() => removeQuote(blacklistItem.quote.id)}><img src={deleteBin}></img></button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Blacklisted;