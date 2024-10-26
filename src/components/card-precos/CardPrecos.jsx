import React from "react";
import styles from "./CardPrecos.module.css"

const CardPrecos = ({ classe, nome, texto, preco, periodo, vantagem1, vantagem2, vantagem3, vantagem4 }) => {
    return (
        <>
            <div className={styles[`card-precos`]} id={styles[classe]}>
            {/* <div className={styles[`card-precos`]}> */}
                <div className={styles["card-text"]}>
                    <span className={styles["card-name"]}> {nome} </span>
                    {/* <span className={styles["card-description"]}> {texto} </span> */}
                    <span className={styles["card-price"]}>
                        R$ {preco} 
                        <span className={styles["card-price-text"]}> / por {periodo} </span>
                    </span>
                </div>
                <div className={styles["card-assinar"]}>
                    <button className={styles["card-button"]}>
                        Assinar
                    </button>
                </div>
            </div>
        </>
    );
}

export default CardPrecos;