import React from "react";
import styles from "../../styles/Card.module.css";
import { NavLink } from "react-router-dom";

// Modelo de CARD de cada pais, con LINK al respect país
export default function Card(props) {
  return (
    <div className={styles.country}>
      <NavLink className={styles.countryLink} to={`/home/${props.id}`}>
        <div className={styles.countrydetail}>
          <img className={styles.flag} alt="img" src={`${props.flag}`} />
          <span>{props.name}</span>
          <br />
          <p>Continent: {props.continent}</p>
        </div>
      </NavLink>
    </div>
  );
}
