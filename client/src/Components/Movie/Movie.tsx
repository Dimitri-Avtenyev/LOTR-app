import { Movie } from "../../types";
import { MovieComp } from "./types";
import styles from "./Movie.module.css";
import lotrSeries from "./assets/Lotr/lotr_series.png";
import lotrFellowship from "./assets/Lotr/lotr-the_fellowship_of_the_ring.png";
import lotrTowers from "./assets/Lotr/lotr-the_two_towers.png";
import lotrKing from "./assets/Lotr/lotr-the_return_of_the_king.png";
import hobbitSeries from "./assets/Hobbit/hobbit_series.png";
import hobbitUnexpectedJourney from "./assets/Hobbit/hobbit-an_unexpected_journey.png";
import hobbitDesolation from "./assets/Hobbit/Hobbit_the_desolation_of_smaug.png";
import hobbitBattle from "./assets/Hobbit/hobbit-the_battle_of_the_five_armies.png";


const MovieComponent = ({movie}:{movie:Movie}) => {
  
  const movies:MovieComp[] = [
    {
      id:   "5cd95395de30eff6ebccde56",
      name: "The Lord of the Rings Series",
      img:  lotrSeries
    },
    {
      id:   "5cd95395de30eff6ebccde57",
      name: "The Hobbit Series",
      img:  hobbitSeries
    },
    {
      id:   "5cd95395de30eff6ebccde58",
      name: "The Unexpected Journey",
      img:  hobbitUnexpectedJourney
    },
    {
      id:   "5cd95395de30eff6ebccde59",
      name: "The Desolation of Smaug",
      img:  hobbitDesolation
    },
    {
      id:   "5cd95395de30eff6ebccde5a",
      name: "The Battle of the Five Armies",
      img:  hobbitBattle
    },
    {
      id:   "5cd95395de30eff6ebccde5b",
      name: "The Two Towers",
      img:  lotrTowers
    },
    {
      id:   "5cd95395de30eff6ebccde5c",
      name: "The Fellowship of the Ring",
      img:  lotrFellowship
    },
    {
      id:   "5cd95395de30eff6ebccde5d",
      name: "The Return of the King",
      img:  lotrKing
    }
  ];
  let movieIndex:number = movies.findIndex(x => x.id === movie._id);
  return (
    <div className={styles.container}>
      <h3>{movie.name}</h3>
      <img src={movies[movieIndex].img} alt={movies[movieIndex].name}/>
    </div>
  );
}

export default MovieComponent;