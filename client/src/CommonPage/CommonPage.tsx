import styles from "./CommonPage.module.css";
import theone from "./assets/theone.png";
import fifa from "./assets/fifa.png";
import fortnite from "./assets/fortnite.png";
import legomasters from "./assets/legomasters.png";
import mtg from "./assets/mtg.png";
import nbb from "./assets/nbb.png";
import pokemon from "./assets/pokemon.png";

const CommonPage = () => {

  const handleClick = () => { //placeholder
    alert("NO ACCESS");
  }
  return (
    <div className={styles.main} onClick={() => handleClick()}>
      <div className={styles.theone}>
        <a href=""><img src={theone}></img></a>
        <h1>The One</h1>
      </div>
      <div>
        <a href=""><img src={fifa} ></img></a>
        <h1>Fifa</h1>
        
      </div>
      <div>
        <a href=""><img src={fortnite} ></img></a>
        <h1>Fortnite</h1>
      </div>
      <div>
        <a href=""><img src={legomasters} ></img></a>
        <h1>Legomasters</h1>
      </div>

      <div>
        <a href=""><img src={mtg} ></img></a>
        <h1>MTG</h1>
      </div>
      <div>
        <a href=""><img src={nbb}></img></a>
        <h1>NBB</h1>
      </div>
      <div>
        <a href=""><img src={pokemon} ></img></a>
        <h1>Pokemon</h1>
      </div>
    </div>
  )
}

export default CommonPage;