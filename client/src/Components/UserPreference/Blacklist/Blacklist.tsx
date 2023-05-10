import { useEffect, useState } from "react";
import { Blacklist } from "../../../types";
import styles from "../Blacklist/Blacklisted.module.css";
import deleteBin from "../assets/deleteBin.svg";
import editIcon from "../assets/editIcon.svg";
import { deleteUserData, getUserDataBlackList } from "../../../utils/fetchHandlers";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";

const Blacklisted = () => {
  const [blacklist, setBlacklist] = useState<Blacklist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");
  const [indexSelector, setIndexSelector] = useState<number>(-1);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const getBlacklist = async () => {
      setLoading(true);
      let blacklist: Blacklist[] = await getUserDataBlackList(`${process.env.REACT_APP_API_URL}api/users/user/blacklist`);
      setBlacklist(blacklist);
      setLoading(false);
    }
    getBlacklist();
  }, []);

  const removeQuote = async (id: string) => {
    let blacklistCpy: Blacklist[] = blacklist.filter(blacklistItem => blacklistItem.quote?.id !== id);
    setBlacklist(blacklistCpy);
    await deleteUserData(`${process.env.REACT_APP_API_URL}api/users/user/blacklist/${id}`);
  }

  const modifyReason = (index: number) => {
    setReason("");
    setIndexSelector(index);
    setShow((prevState) => !prevState);
  }

  const handleEdit = () => {
    setShow(false);
    let blacklistCpy: Blacklist[] = [...blacklist];
    blacklistCpy[indexSelector].reasonForBlacklisting = reason;
    setBlacklist(blacklistCpy);
  }
  const handleEnterKey:React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  }

  if (loading) {
    return <LoadingIndicator />
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
          {blacklist.map((blacklistItem, index) => {
            return (
              <tr key={blacklistItem.quote?.id}>
                <td>{blacklistItem.quote?.dialog}</td>
                <td >
                  {blacklistItem.reasonForBlacklisting}
                  { show &&
                    <div><input hidden={index !== indexSelector} type="text"
                      value={reason}
                      onKeyDown={handleEnterKey}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Reason for blacklisting"
                    /></div>}
                </td>
                <td>
                  <button className={styles.editBtn} onClick={() => modifyReason(index)}><img src={editIcon} /></button>
                </td>
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