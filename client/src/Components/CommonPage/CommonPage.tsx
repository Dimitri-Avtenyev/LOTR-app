import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Project } from "./types";
import styles from "./CommonPage.module.css";
import theone from "./assets/theone.png";
import fifa from "./assets/fifa.png";
import fortnite from "./assets/fortnite.png";
import legomasters from "./assets/legomasters.png";
import mtg from "./assets/mtg.png";
import nbb from "./assets/nbb.png";
import pokemon from "./assets/pokemon.png";
import AccessPage from "../AccessPage/AccessPage";
import { LoggedinContext } from "../../Context/LoggedinContext";

const CommonPage = () => {
  const [showAccess, setShowAccess] = useState<boolean>(false);
  const [accessMessage, setAccessMessage] = useState<string>("");
  const {loggedin, setLoggedin} = useContext(LoggedinContext);
  let projects: Project[] = [
    { id: 1, name: "theone", projectImage: theone },
    { id: 2, name: "fifa", projectImage: fifa },
    { id: 3, name: "fortnite", projectImage: fortnite },
    { id: 4, name: "legomasters", projectImage: legomasters },
    { id: 5, name: "mtg", projectImage: mtg },
    { id: 6, name: "nbb", projectImage: nbb },
    { id: 7, name: "pokemon", projectImage: pokemon }
  ]


  const accessHandler = (project:Project) => {
    if(!loggedin ) {
      setAccessMessage("Please login to continue.");
      setShowAccess(true);
    }  if (loggedin && project.id !== 1) {
      setAccessMessage(`You don't have access to ${project.name}.`);
      setShowAccess(true);
    }
  }

  return (
    <div>
      <div className={styles.main}>
      {showAccess && <AccessPage message={accessMessage} show={showAccess} setShow={setShowAccess}/>}
        {projects.map((project: Project, index: number) => {
          let projectPath: string = `/`;
          if (loggedin && project.id === 1) {
            projectPath += `startpage/${project.name}`;
          }
          return (
            <div key={index} className={styles.card}>
              <Link to={projectPath} onClick={() => accessHandler(project)}>
                <div className={project.name === "theone" ? styles.theone : styles.others}>
                  <img src={project.projectImage} />
                  <h1>{project.name}</h1>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>

  );
}

export default CommonPage;