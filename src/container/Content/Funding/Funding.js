import { useObserver } from "mobx-react-lite";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../../hooks/useStores";
// import style from "./Funding.module.css"

const Funding = () => {
  const [amount, setAmount] = useState();

  const { id } = useParams();
  const { projectStore, fundingStore, uiStore } = useStores();
  const project = projectStore.getProjectById(id);

  const doneer = async(e, funding) => {
    e.preventDefault();
    funding.aantal = funding.aantal - amount;
    setAmount(0);

    await fundingStore.giveFunding(
      uiStore.currentUser.name,
      funding.product,
      id,
      funding.aantal
    );
  }

  return useObserver(() => (
    <>
      <h3>{project.title}</h3>
      {/* <span>Help dit project door benodigdheden te funden</span> */}

      {fundingStore.funding.map(funding => (
        <>
          <span key={funding.id}>{funding.product}-----{funding.aantal}</span>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)}></input>
          <button onClick={e => doneer(e, funding)}>Doneer</button>
        </>
      ))}
    </>
  ));
};

export default Funding;
