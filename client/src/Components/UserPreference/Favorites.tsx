import { useEffect, useState } from "react";
import { Favorite, User } from "../../types";
import styles from "./Favorites.module.css";

const Favorites = ({ user }: { user: User }) => {
  const [favorites, setFavorites] = useState<Favorite[]>(user.favorites);
  const [downloadLink, setDownloadLink] = useState<string>("");

  const removeQuote = (id: string) => {
    let favoriteCpy: Favorite[] = favorites.filter(favorite => favorite.quote?.id !== id);
    setFavorites(favoriteCpy);
  }
  useEffect(() => {

    let fileContent: string = "";
    for (let i: number = 0; i < favorites.length; i++) {
      if (favorites[i].quote !== undefined) {
        fileContent += `"${favorites[i].quote.dialog}" - ${favorites[i].quote.character.name}\n`
      }
    }
    
    let favoritesBlob = new Blob([fileContent], { type: "text/plain" });
    setDownloadLink(URL.createObjectURL(favoritesBlob));
    console.log(fileContent);
  }, []);

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
      <table>
        <thead>
          <tr>
            <th>Quote</th>
            <th></th>
            <th>Character</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map(favorite => {
            if (favorite.quote !== undefined) {
              return (
                <tr key={favorite.quote?.id}>
                  <td><q>{favorite.quote?.dialog}</q></td>
                  <td>-</td>
                  <td>
                    <a href={favorite.quote?.character.wikiUrl} target="_blank">{favorite.quote?.character.name}</a>
                  </td>
                  <td><button onClick={() => removeQuote(favorite.quote.id)}>X</button></td>
                </tr>
              );
            }
          })
          }
        </tbody>
      </table>
      <button className={styles.printBtn}>
        <a href={downloadLink} download={"favorites.txt"}>Download quotes</a>
      </button>
    </div>
  )
}

export default Favorites;