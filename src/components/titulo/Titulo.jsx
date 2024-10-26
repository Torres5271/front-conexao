import React from "react";
import styles from "./Titulo.module.css";

function Titulo ({ titulo, tamanho, cor}) {
    return (
        <>
            <h1 className={styles[`${tamanho}`]} id={styles[cor]}> { titulo } </h1>
        </>
    );
}

export default Titulo;