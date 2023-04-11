import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import { Quote, User } from "../../types"


const UserPreference = ({ preference, user }: { preference: string, user: User }) => {

  if (preference === "favorites" && user.favorites.length > 0) {
    return (
      <div>
        <h1>Favorites</h1>

        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {user.favorites.map(favorite => {
              if (favorite.quote !== undefined) {
                return (
                  <tr key={favorite.quote?.id}>
                    <td>{favorite.quote?.dialog} - {favorite.quote?.character.name}</td>
                  </tr>
                )
              }
            })}

          </tbody>
        </table>
      </div>
    )
  } else if (preference === "blacklisted" && user.favorites.length > 0) {
    return (
      <div>
        <h1>Blacklisted</h1>

        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {user.blacklist.map(blacklist => {
              return (
                <tr key={blacklist.quote.id}>
                  <td>{blacklist.quote.dialog}</td>
                  <td>{blacklist.reasonForBlacklisting}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h1>Nothing to show, list is empty.</h1>
    </div>
  )
}

export default UserPreference;