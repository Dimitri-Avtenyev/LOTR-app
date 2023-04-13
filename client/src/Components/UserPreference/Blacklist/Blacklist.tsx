import { User } from "../../../types";
import styles from "../Blacklist/Blacklist.module.css";

const Blacklist = ({user}:{user:User}) => {

  if (user.blacklist.length === 0) {
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
        </tr>
      </thead>
      <tbody>
        {user.blacklist.map(blacklist => {
          return (
            <tr key={blacklist.quote?.id}>
              <td>{blacklist.quote?.dialog}</td>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  );
}

export default Blacklist;