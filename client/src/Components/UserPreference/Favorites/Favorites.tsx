import { useContext, useEffect, useState } from "react";
import styles from "./Favorites.module.css";
import deleteBin from "../assets/deleteBin.svg";
import { User, Favorite } from "../../../types";
import { UserContext } from "../../../Context/UserContext";

const Favorites = ({ user }: { user: User }) => {
  const [favorites, setFavorites] = useState<Favorite[]>(user.favorites);
  const [downloadLink, setDownloadLink] = useState<string>("");
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    let fileContent: string = "";
    for (let i: number = 0; i < favorites.length; i++) {
      if (favorites[i].quote !== undefined) {
        fileContent += `"${favorites[i].quote.dialog}" - ${favorites[i].quote.character.name}\n`
      }
    }
    let favoritesBlob = new Blob([fileContent], { type: "text/plain" });
    setDownloadLink(URL.createObjectURL(favoritesBlob));
  }, []);

useEffect(() => {
  updateUser();
}, [favorites]);

const removeQuote = async (id: string) => {
  let favoriteCpy: Favorite[] = favorites.filter(favorite => favorite.quote?.id !== id);
  setFavorites(favoriteCpy);
}
const updateUser = async () => {
  let userUpdated: User = JSON.parse(JSON.stringify(user));
  userUpdated.favorites = [...favorites];
  setUser(userUpdated);
  
  try {
    let respose = await fetch("http://localhost:3000/api/users/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        favorites: userUpdated.favorites
      })
    });
    if (respose.status === 200) {
      
    }
  } catch (err) {
    console.log(err);
  }
}
  if (favorites.length === 0) {
    return (
      <div>
        <h1>Nothing to show, list is empty.</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Favorites</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Quote</th>
            <th></th>
            <th>Character</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {favorites.map(favorite => {
            if (favorite.quote !== undefined) {
              return (
                <tr key={favorite.quote?.id}>
                  <td>{favorite.quote?.movie.name}</td>
                  <td><q>{favorite.quote?.dialog}</q></td>
                  <td>-</td>
                  <td>
                    <a href={favorite.quote?.character.wikiUrl} target="_blank">{favorite.quote?.character.name}</a>
                  </td>
                  <td><button className={styles.binBtn} onClick={() => removeQuote(favorite.quote.id)}><img src={deleteBin}></img></button></td>
                </tr>
              );
            }
          })
          }
        </tbody>
      </table>
      <button className={styles.downloadBtn}>
        <a href={downloadLink} download={"favorites.txt"}>Download quotes</a>
      </button>
    </div>
  )
}

export default Favorites;