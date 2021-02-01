import React, { useState }  from "react";
import { useParams } from "react-router-dom";
import { Image } from 'cloudinary-react'
import { useStores } from "../../../hooks/useStores";
import CommentList from "../../../components/CommentList/CommentList";
import Updates from "../../../components/Updates/Updates";
import ParticipantList from "../../../components/ParticipantList/ParticipantList";
import style from "./ProjectDetail.module.css";
import { useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import shareIcon from "./share.svg";
import likeIcon from "./like.svg";
import commentsIcon from "./comments.svg";
import usersIcon from "./users.svg";

const ProjectDetail = () => {
  const { id } = useParams();
  const { projectStore, uiStore } = useStores();
  const project = projectStore.getProjectById(id);
  const didLike = project.likedUsers.findIndex(user => user === uiStore.currentUser.id);
  
  const like = async e => {
    e.preventDefault();
    project.likedUsers.push(uiStore.currentUser.id);
    project.likes = project.likes + 1;
    await projectStore.addLike(project.id, uiStore.currentUser.id);
  }

  const [info, setInfo] = useState("comments");

  const button = (value) => {
    setInfo(value)
  }

  const infoSwitch = (info) => {
    switch (info) {
      case 'updates':
        return  <Updates/>;
      case 'comments':
        return  <CommentList/>;
      default: return <updates/>;
    }
  }

  return useObserver(() => {

    if (!project) {
      return <p>geen groep</p>;
    }

    return(
      <div className={style.details__container}>
        <div>
          <Link className={style.details__link} to={ROUTES.home}>
            <div className={style.driehoek}></div>
            <p className={style.details__link__tekst}>Terug naar projecten</p>
          </Link>

          <h3 className={style.details__title}>{project.title}</h3>
          <Image className={style.details__img}publicId={project.image.public_id} />
          <div className={style.details__info}>
            <p className={style.details__theme}>{project.theme}</p>
            <div className={style.status}></div>
          </div>

          <p className={style.details__samenvatting}>Toen het internet een algemeen goed werd, dacht men dat het mensen dichter bij elkaar zou brengen. Facebook helpt bij het vinden van oude vrienden, berichtjes sturen doen we aan de snelheid van een hartslag en afstanden worden gereduceerd tot seconden. Het maakt van de wereld een groot dorp en toch wijzen studies uit dat we eenzamer als ooit tevoren zijn. We lopen door ons leven met een gsm vastgelijmd aan ons hand en in dat proces van altijd geconnecteerd zijn, zijn we vergeten om echt contact met elkaar te hebben. </p>
          <p className={style.details__tekst}>Zoeme wil echte ontmoetingen tussen onbekenden stimuleren. Door gebruik te maken van één van de symbolen geef je aan of je op zoek bent naar een leuke babbel, een wandelingetje of op zoek bent naar liefde. We laten andere opties open, zoals samen de hond(en) uitlaten of wanneer je op zoek bent naar iemand om samen de woonkamer te schilderen. Het is niet erg om alleen te zijn, het kan zelfs leuk zijn, maar soms kan het leuker zijn met twee.</p>

          <div className={style.buttons}>
            <button 
              className={`${info === 'updates' ? style.info__button__active : style.info__button }`} 
              onClick={() => button('updates')}>
              Updates
            </button>
            <button 
              className={`${info === 'comments' ? style.info__button__active : style.info__button }`} 
              onClick={() => button('comments')}>
              Comments
            </button>
          </div>

          <div className={style.details__posting}>
            { infoSwitch(info) }
          </div>
        </div>


        <div>
          <div className={style.details__funding__fixed}>
            <div className={style.details__funding}>
              <p className={style.details__spotlight__text}>Zet dit project in de spotlight!</p>
              <div className={style.details__spotlight__buttons}>
                {didLike === -1 ? (
                  <form onSubmit={like}>
                    <button className={style.details__like}>
                      <img className={style.details__icon} src={likeIcon} alt="share icon"/>
                      <span>Like</span>
                    </button>
                  </form>
                ):(
                  <span className={style.detail__geliked}>al geliked</span>
                )}
                <button className={style.details__share}>
                  <img className={style.details__icon} src={shareIcon} alt="share icon"/>
                  <span>Delen</span>
                </button>
              </div>

              <div>
                <h4 className={style.details__help}> Hoe kan jij helpen?</h4>
                <div className={style.details__spotlight__buttons}>
                  <ul className={style.details__rollen__benodigheden}>
                    <li>Benodigheden</li>  
                  </ul>
                  <ul className={style.details__rollen__list}>
                    <li>Rollen</li>  
                  </ul>
                </div>
              </div>
              <div className={style.details__join__buttons}>
                <button className={`${style.details__rollen__benodigheden} ${style.details__geef}`}><span>Ik geef ...</span></button>
                <ParticipantList project={project} />
              </div>
            </div>

            <div className={style.details__data}>
              <div>
                <h4 className={style.details__data__title}>Eigenaar</h4>
                <p>naam eigeaar</p>
              </div>
              <div>
                <h4 className={style.details__data__title}>info</h4>
                <div className={style.details__data__grid}>
                  <span className={style.details__info}><img src={usersIcon} alt="users icon"/> {project.likes}</span>
                  <span className={style.details__info}><img src={likeIcon} alt="likes icon"/> {project.likes}</span>
                  <span className={style.details__info}><img src={commentsIcon} alt="comments icon"/> {project.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default ProjectDetail;
