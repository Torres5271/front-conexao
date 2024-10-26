import React from "react";
import styles from "./CardBeneficios.module.css"

const CardBeneficios = ({ imagem, titulo, texto }) => {
    return (
        <>
            <div className={styles["card-beneficios"]}>
            <div className={styles["container-beneficios"]}>
                <div className={styles["card-icon"]}>
                    <img src={imagem} alt="Ícone de Agendamento" className={styles["img-card"]} />
                </div>
                <span className={styles["card-title"]}> {titulo} </span>
                <span className={styles["card-text"]}>
                    {texto}
                </span>
            </div>
            </div>
        </>
    );
}

export default CardBeneficios;