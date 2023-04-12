import {  User } from "../../types"
import Blacklist from "./Blacklist"
import Favorites from "./Favorites"


const UserPreference = ({ preference, user }: { preference: string, user: User }) => {

  switch(preference) {
    default: 
      case("favorites"):
    return <Favorites user={user} />;
      case(("blacklist")):
    return <Blacklist user={user}/>;
  }
}

export default UserPreference;