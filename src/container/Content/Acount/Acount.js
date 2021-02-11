import React, {useEffect, useState} from "react";
import style from "./Acount.module.css";
import Projects from "../../../components/Acount/Projects";
import Info from "../../../components/Acount/Info";
import Rollen from "../../../components/Acount/Rollen";
import map from "./projects.svg";
import bericht from "./comments.svg";
import i from "./info.svg";
import load from "./Loadinggif.gif";
import { useStores } from "../../../hooks/useStores";

const Acount = () => {
  const [info, setInfo] = useState("Projects");
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 3500)
  }, [])

  const { uiStore, projectStore } = useStores();

  const button = (value) => {
    setInfo(value)
  }

  const infoSwitch = (info) => {
    switch (info) {
      case 'Projects':
        return (
        <article>
          <h3 className="hidden">projects</h3>
            <ul className={style.grid}>
              {uiStore.currentUser.projects.map(projectId => {
                const project = projectStore.getProjectById(projectId);
                const owner = uiStore.getOwnerById(project);
                return <Projects key={projectId} owner={owner} project={project}/>
            })}
            </ul>
          </article>
        )
      case 'Info':
        return  <Info/>;
      case 'Rollen':
        return (
          <article>
            <h3 className="hidden">rollen</h3>
            <ul>
              {uiStore.currentUser.projects.map(projectId => (
                <Rollen key={projectId} id={projectId} />
              ))}
            </ul>
          </article>
        )
      default: return <Projects/>;
    }
  }

  // const { projectStore, uiStore } = useStores();

  return (
    loading === false ? (
      <section>
        <h2 className="hidden">account</h2>
        <article className={style.user__container}>
          <h3 className="hidden">user info</h3>
          <img src={uiStore.currentUser.avatar} width="80" alt="user foto"/>
          <p className={style.user__info}>
            <span className={style.user__name}>{uiStore.currentUser.name}</span>
            {uiStore.currentUser.companyName ? (
              <span className={style.user__date}>Lid van {uiStore.currentUser.companyName}</span>
            ):(
              <>
              </>
            )}
            
          </p>
        </article>

        <article className={style.buttons}>
          <h3 className="hidden">nav</h3>
          <button className={`${info === 'Projects' ? style.info__button__active : style.info__button }`} 
            onClick={() => button('Projects')}>
            <img className={style.info__icon} src={map} alt="projects icon"/>
            <span>Mijn projecten</span>
          </button>

          <button className={`${info === 'Rollen' ? style.info__button__active : style.info__button }`} 
            onClick={() => button('Rollen')}>
            <img className={style.info__icon} src={bericht} alt="rollen icon"/>
            <span>Mijn rollen</span>
          </button>

          <button className={`${info === 'Info' ? style.info__button__active : style.info__button }`} 
            onClick={() => button('Info')}>
            <img className={style.info__icon} src={i} alt="info icon"/>
            <span>Info</span>
          </button>
        </article>

        { infoSwitch(info) }
      </section>
    ):(
      <section className={style.loading}>
        <h2 className="hidden">account</h2>
        <img className={style.loading__gif} src={load} alt="rollen icon"/>
      </section>
    )
  );
};

export default Acount;
