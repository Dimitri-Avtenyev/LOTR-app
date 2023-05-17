import { useEffect, useState } from "react";
import styles from "./Favorites.module.css";
import deleteBin from "../assets/deleteBin.svg";
import filterOn from "../assets/filterOn.svg";
import filterOff from "../assets/filterOff.svg";
import {  Favorite, Character } from "../../../types";
import { deleteUserData, getUserDataFavorites } from "../../../utils/fetchHandlers";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [characterFilterId, setCharacterFilterId] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const getFavorites = async () => {
      setLoading(true);
      let favorites: Favorite[] = await getUserDataFavorites(`${process.env.REACT_APP_API_URL}api/users/user/favorites`);
      setFavorites(favorites);
      setCharacters(favorites.map(fav => fav.quote.character));
      setLoading(false);
    }
    getFavorites();
  }, []);

  useEffect(() => {
    let fileContent: string = "";
    for (let i: number = 0; i < favorites.length; i++) {
      if (favorites[i].quote !== undefined) {
        fileContent += `"${favorites[i].quote.dialog}" - ${favorites[i].quote.character.name}\n`
      }
    }
    let favoritesBlob = new Blob([fileContent], { type: "text/plain" });
    setDownloadLink(URL.createObjectURL(favoritesBlob));
  }, [favorites]);

  const removeQuote = async (id: string) => {
    let favoritesFiltered: Favorite[] = favorites.filter(favorite => favorite.quote?.id !== id);
    setFavorites(favoritesFiltered);
    await deleteUserData(`${process.env.REACT_APP_API_URL}api/users/user/favorites/${id}`);
  }

  const handleFilterOff = () => {
    setFilterActive(false);
    setCharacterFilterId("");
  }

  const handleFilterOn = (id: string) => {
    setCharacterFilterId(id);
    setFilterActive(true);
  }


  if (loading) {
    return <LoadingIndicator />
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
            <th>Character</th>
            <th hidden={filterActive}>#</th>
            <th colSpan={2} ></th>
          </tr>
        </thead>
        <tbody>
          {favorites.filter(fav => !filterActive || fav.quote.character._id === characterFilterId).map(favorite => {
            if (favorite.quote !== undefined) {
              return (
                <tr key={favorite.quote?.id}>
                  <td>{favorite.quote?.movie.name}</td>
                  <td><q>{favorite.quote?.dialog}</q></td>
                  
                  <td>
                    <a href={favorite.quote?.character.wikiUrl} target="_blank">{favorite.quote?.character.name}</a>
                  </td>
                  <td hidden={filterActive}>
                    {characters.filter(character => character._id === favorite.quote.character._id).length}
                  </td>
                  <td>{filterActive ?
                    <button onClick={handleFilterOff}> <img src={filterOff} /></button> :
                    <button onClick={() => handleFilterOn(favorite.quote.character._id)}><img src={filterOn} /></button>}
                  </td>
                  <td><button onClick={() => removeQuote(favorite.quote.id)}><img src={deleteBin}></img></button></td>
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