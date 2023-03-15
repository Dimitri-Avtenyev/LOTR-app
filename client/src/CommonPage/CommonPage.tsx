import { Link, useParams } from "react-router-dom";
import { Project } from "./types";
import styles from "./CommonPage.module.css";
import theone from "./assets/theone.png";
import fifa from "./assets/fifa.png";
import fortnite from "./assets/fortnite.png";
import legomasters from "./assets/legomasters.png";
import mtg from "./assets/mtg.png";
import nbb from "./assets/nbb.png";
import pokemon from "./assets/pokemon.png";

const CommonPage = () => {
  let projects: Project[] = [
    {id: 1, name: "theone", projectImage: theone},
    {id: 2, name: "fifa", projectImage: fifa},
    {id: 3, name: "fortnite", projectImage: fortnite},
    {id: 4, name: "legomasters", projectImage: legomasters},
    {id: 5, name: "mtg", projectImage: mtg},
    {id: 6, name: "nbb", projectImage: nbb},
    {id: 7, name: "pokemon", projectImage: pokemon}
  ]
 
  return (
    <div className={styles.main}>
      {projects.map((project:Project) => {
        return (
          <div className={project.name === "theone" ? styles.theone :  styles.others }>
            <Link to={`/startpage/${project.name}`}><img src={project.projectImage}></img></Link>
            <h1>{project.name}</h1>
          </div>
        )
      })}
    </div>
  )
}

export default CommonPage;