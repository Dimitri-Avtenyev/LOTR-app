import Blacklisted from "./Blacklist/Blacklist";
import Favorites from "./Favorites/Favorites";

const UserPreference = ({ preference }: { preference: string }) => {

  switch(preference) {
    default: 
      case("favorites"):
    return <Favorites />;
      case(("blacklist")):
    return <Blacklisted />;
  }
}

export default UserPreference;