import React from "react";
import { useParams } from "react-router-dom";
import { Image } from 'cloudinary-react'
import { useStores } from "../../../hooks/useStores";
import ParticipantList from "../../../components/ParticipantList/ParticipantList";
import style from "./ProjectDetail.module.css";
import { useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import shareIcon from "./share.svg";
import likeIcon from "./like.svg";
import commentsIcon from "./comments.svg";
import usersIcon from "./users.svg";
import CommentsSwitch from "../../../components/CommentsSwitch/CommentsSwitch";

const ProjectDetail = () => {
  const { id } = useParams();
  const { projectStore, uiStore, fundingStore, rolStore } = useStores();
  const project = projectStore.getProjectById(id);
  const didLike = project.likedUsers.findIndex(user => user === uiStore.currentUser.id);
  
  const like = async e => {
    e.preventDefault();
    project.likedUsers.push(uiStore.currentUser.id);
    project.likes = project.likes + 1;
    await projectStore.addLike(project.id, uiStore.currentUser.id);
  }


  const classSwitch = (status) => {
    switch (status) {
      case 'Bezig':
        return  style.bezig;
      case 'Uitvoering':
        return  style.klaar;
      case 'Afgerond':
        return  style.afgerond;
      default: return style.bezig;
    }
  }

  return useObserver(() => {

    if (!project) {
      return <p>geen groep</p>;
    }

    return(
      <section className={style.details__container}>
        <h2 className="hidden">details project</h2>
        <artcle>
          <h3 className="hidden">details</h3>
          <Link className={style.details__link} to={ROUTES.home}>
            <div className={style.driehoek}></div>
            <p className={style.details__link__tekst}>Terug naar projecten</p>
          </Link>

          <h4 className={style.details__title}>{project.title}</h4>
          <Image className={style.details__img}publicId={project.image.public_id} />
          <div className={style.details__info}>
            <p className={style.details__theme}>{project.theme}</p>
            <span className={style.status}>Status: {project.status}<div className={classSwitch(project.status)}></div></span>
          </div>

          <p className={style.details__samenvatting}>Conor deze class moet weg</p>
          <p className={style.details__tekst}>{project.description}</p>
          
          <CommentsSwitch project={project}/>
          
        </artcle>


        <artcle>
          <h3 className="hidden">help</h3>
          <div className={style.details__funding__fixed}>
            {uiStore.currentUser.id === project.ownerId ? (
              <div className={style.overzicht__container}>
                <h4 className={style.overzicht}>Overzicht</h4>
                <div className={style.overzicht__buttons}>
                  <Link className={style.overzicht__bewerken} to={`${ROUTES.editProject.to}${id}`}><span>Bewerken</span></Link>
                  <Link className={style.overzicht__beheren} to={`${ROUTES.dataProject.to}${id}`}><span>Beheren</span></Link>
                </div>
              </div>
            ):(
              <>
              </>
            )}
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
                    <li className={style.funding__list__item}>Benodigdheden</li>
                    {fundingStore.funding.map(product => (
                      <li key={product.id} className={style.funding__list__items}><span className={style.funding__list__span}>{product.aantal}</span> {product.product}</li>  
                      ))}
                  </ul>
                  <ul>
                    <li className={style.funding__list__item}>Rollen</li>
                    {rolStore.roles.map(rol => (
                      <li key={rol.id} className={style.funding__list__items}><span className={style.funding__list__span}>{rol.aantal}</span> {rol.name}</li>  
                      ))}
                  </ul>
                </div>
              </div>
              <div className={style.details__join__buttons}>
                <Link className={`${style.details__rollen__benodigheden} ${style.details__geef}`} to={`${ROUTES.funding.to}${id}`}><span>Ik geef ...</span></Link>
                <ParticipantList project={project} />
              </div>
            </div>

            <div className={style.details__data}>
              <div>
                <h4 className={style.details__data__title}>Eigenaar</h4>
                <p>{project.ownerName}</p>
              </div>
              <div>
                <h4 className={style.details__data__title}>info</h4>
                <div className={style.details__data__grid}>
                  <span className={style.details__info}><img className={style.details__counticon} src={usersIcon} alt="users icon"/> {project.likes}</span>
                  <span className={style.details__info}><img className={style.details__counticon} src={likeIcon} alt="likes icon"/> {project.likes}</span>
                  <span className={style.details__info}><img className={style.details__counticon} src={commentsIcon} alt="comments icon"/> {project.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </artcle>
      </section>
    );
  });
};

export default ProjectDetail;
