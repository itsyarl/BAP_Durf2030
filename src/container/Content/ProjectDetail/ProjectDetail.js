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
  const { projectStore, uiStore } = useStores();
  const project = projectStore.getProjectById(id);
  // const comment = projectStore.getData(id, project);
  // const roles = rolStore.getRolesById(id);
  const didLike = project.likedUsers.findIndex(user => user === uiStore.currentUser.id);
  
  const like = async e => {
    e.preventDefault();
    project.likedUsers.push(uiStore.currentUser.id);
    project.likes = project.likes + 1;
    await projectStore.addLike(project.id, uiStore.currentUser.id);
  }


  const classSwitch = (status) => {
    switch (status) {
      case 'Funding':
        return  style.bezig;
      case 'Uitvoering':
        return  style.klaar;
      case 'Voltooid':
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
        <article>
          <h3 className="hidden">details</h3>
          <Link className={style.details__link} to={ROUTES.home}>
            <div className={style.driehoek}></div>
            <p className={style.details__link__tekst}>Terug naar projecten</p>
          </Link>

          <h4 className={style.details__title}>{project.title}</h4>
          <Image className={style.details__img} publicId={project.image.public_id} />
          <div className={style.details__info}>
            <p className={style.details__theme}>{project.theme}</p>
            <span className={uiStore.currentUser.admin === false ? (style.status):("hidden")}>Status: {project.status}<div className={classSwitch(project.status)}></div></span>
          </div>

          <p className={style.details__tekst}>{project.description}</p>

          <article className={style.willywoonka}>
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
              <div className={uiStore.currentUser.admin === false ? (style.details__spotlight__buttons) : ("hidden")}>
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
                    {project.funding.map(fund => (
                      <li key={fund.id} className={style.funding__list__items}><span className={style.funding__list__span}>{fund.aantal}</span> {fund.product}</li>  
                      ))}
                  </ul>
                  <ul>
                    <li className={style.funding__list__item}>Rollen</li>
                    {project.rollen.map(rol => (
                      <li key={rol.id} className={style.funding__list__items}><span className={style.funding__list__span}>{rol.aantal}</span> {rol.name}</li>  
                      ))}
                  </ul>
                </div>
              </div>
              <div className={uiStore.currentUser.admin === false ? (style.details__join__buttons):("hidden")}>
                <Link className={`${style.details__rollen__benodigheden} ${style.details__geef}`} to={`${ROUTES.funding.to}${id}`}><span>Ik geef ...</span></Link>
                <ParticipantList project={project} />
              </div>
            </div>

            <div className={style.details__data}>
              <div>
                <h4 className={style.details__data__title}>Eigenaar</h4>
                <p>{project.ownerName}</p>
              </div>
              <div className={uiStore.currentUser.admin === true ? ("hidden"):(style.admin__idden)}>
                <h4 className={style.details__data__title}>info</h4>
                <div className={style.details__data__grid}>
                  <span className={style.details__info}><img className={style.details__counticon} src={usersIcon} alt="users icon"/> {project.participants.length}</span>
                  <span className={style.details__info}><img className={style.details__counticon} src={likeIcon} alt="likes icon"/> {project.likes}</span>
                  <span className={style.details__info}><img className={style.details__counticon} src={commentsIcon} alt="comments icon"/> {project.comments.length}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
          <div className={uiStore.currentUser.admin === true ? ("hidden"):(style.admin__idden)}>
            <CommentsSwitch project={project}/>
          </div>
        </article>


        <article className={style.infodetail__container}>
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
              <div className={uiStore.currentUser.admin === false ? (style.details__spotlight__buttons):("hidden")}>
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
                    {project.funding.map(fund => (
                      <li key={fund.id} className={style.funding__list__items}><span className={style.funding__list__span}>{fund.aantal}</span> {fund.product}</li>  
                      ))}
                  </ul>
                  <ul>
                    <li className={style.funding__list__item}>Rollen</li>
                    {project.rollen.map(rol => (
                      <li key={rol.id} className={style.funding__list__items}><span className={style.funding__list__span}>{rol.aantal}</span> {rol.name}</li>  
                      ))}
                  </ul>
                </div>
              </div>
              <div className={uiStore.currentUser.admin === false ? (style.details__join__buttons):("hidden")}>
                <Link className={`${style.details__rollen__benodigheden} ${style.details__geef}`} to={`${ROUTES.funding.to}${id}`}><span>Ik geef ...</span></Link>
                <ParticipantList project={project} />
              </div>
            </div>

            <div className={style.details__data}>
              <div>
                <h4 className={style.details__data__title}>Eigenaar</h4>
                <p>{project.ownerName}</p>
              </div>
              <div className={uiStore.currentUser.admin === false ? (style.admin__idden):("hidden")}>
                <h4 className={style.details__data__title}>info</h4>
                <div className={style.details__data__grid}>
                  <span className={style.details__info}><img className={style.details__counticon} src={usersIcon} alt="users icon"/> {project.participants.length}</span>
                  <span className={style.details__info}><img className={style.details__counticon} src={likeIcon} alt="likes icon"/> {project.likes}</span>
                  <span className={style.details__info}><img className={style.details__counticon} src={commentsIcon} alt="comments icon"/> {project.comments.length}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    );
  });
};

export default ProjectDetail;