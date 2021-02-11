  import { useObserver } from "mobx-react-lite";
  import React, { useState } from "react";
  import { useHistory, useParams } from "react-router-dom";
  import { useStores } from "../../../hooks/useStores";
  import style from "./Funding.module.css";
  import { Link } from "react-router-dom";
  import { ROUTES } from "../../../consts";
  // import FundingForm from "../../../components/FundingForm/FundingForm";
  
  const Funding = () => {
    const history = useHistory();
    const { id } = useParams();
    const { projectStore, fundingStore, uiStore } = useStores();
  
    const project = projectStore.getProjectById(id);
  
    const [allFundings, setAllFundings] = useState([]);

    const change = item => {
      const alreadyFund = allFundings.filter(fund => {
        return (fund.product === item.product)
      });

      if(alreadyFund.length > 0) {
        setAllFundings(allFundings.splice(alreadyFund));
        setAllFundings(allFundings.concat(item));
      }else{
        setAllFundings(allFundings.concat(item));
      }


    }

    const doneer = (e) => {
      e.preventDefault();
      console.log(allFundings);
      allFundings.forEach( async newFunding => {
        if (newFunding.amount <= newFunding.product.aantal) {
          newFunding.product.aantal = newFunding.product.aantal - newFunding.amount;
  
          await fundingStore.giveFunding(
            uiStore.currentUser.name,
            newFunding.product.product,
            id,
            newFunding.product.aantal
          );
        }
      })
      history.push(`${ROUTES.projectDetail.to}${id}`);
    }
  
    return useObserver(() => (
      <>
        <Link className={style.details__link} to={`${ROUTES.projectDetail.to}${id}`}>
          <div className={style.driehoek}></div>
          <p className={style.details__link__tekst}>Terug naar project</p>
        </Link>
        <h3 className={style.title}>{project.title}</h3>
        <p className={style.paragraaf}>Help dit project hun boodschappenlijstje af te vinken!</p>
  
        <div className={style.funding__items}>
          {project.funding.map((funding, index) => (
              <div className={style.funding__item} key={funding.id}>
                <p className={style.funding__item__text}><span className={style.funding__item__num}>#{index +1}</span>{funding.product}</p>
                <p className={style.funding__item__text}>{funding.aantal}</p>
                <input type="number" max={9} min={0} onChange={e => change({amount: e.target.value, product: funding})}></input>
              </div>
          ))}
        </div>

        <h4 className={style.tussenTitle}>Afleveren</h4>
        <p className={style.text}>Hoe ga je jouw donatie afleveren?</p>
        <div>
          <button className={style.button_fundig}>Ophalen</button>
          <button className={style.button_fundig}>Versturen</button>
        </div>
        <p className={style.text}>*geld donaties gebeuren via de bank</p>
  
        <form className={style.form}>
          <label className={style.label}>
            <span className={style.tussenTitle}>Adres</span>
            <span className={style.text}>Straat, nr</span>
            <input className={style.input}></input>
            <span className={style.text}>*Dit is nodig om te weten waar de eigenaar de materialen kan ophalen.</span>
          </label>
          <div className={style.buttons}>
            <button className={style.button_fundig} onClick={e => doneer(e)}>Doneren</button>
            <Link to={`${ROUTES.projectDetail.to}${project.id}`} className={style.button_annuleren}>Annuleren</Link>
          </div>
        </form>
      </>
    ));
  };
  
  export default Funding;
  
