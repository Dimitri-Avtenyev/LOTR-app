import { User } from "../../types";


const Blacklist = ({user}:{user:User}) => {

  if (user.blacklist.length === 0) {
    return (
      <div>
        <h1>Nothing to show, list is empty.</h1>
      </div>
    );
  }
  return (
    <div>
    <h1>Blacklist</h1>
    <table>
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        {user.blacklist.map(blacklist => {
          return (
            <tr key={blacklist.quote?.id}>
              <td>{blacklist.quote?.dialog}</td>
              <td>{blacklist.reasonForBlacklisting}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  );
}

export default Blacklist;