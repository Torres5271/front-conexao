import React from "react";
import styles from "./CardCarousel.module.css";
import imgFundo from "./../../utils/assets/fundo_carrossel.svg";

const CardCarousel = ({ imagem, texto }) => {
    return (
        <>
            <div className={styles["card-carousel"]}>
                <div className={styles["image-carousel"]}>
                    <img src={imagem} alt="Tela de Adicionar Profissional" />
                </div>
                <div className={styles["text-carousel"]}>
                    <img className={styles["image-fundo"]} src={imgFundo} alt="Bolinha de fundo"/>
                    <span className={styles["text"]}>
                        {texto}
                    </span>
                </div>
            </div>
        </>
    );
}

export default CardCarousel;