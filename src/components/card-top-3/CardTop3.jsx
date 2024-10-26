import React from "react";
import styles from "./CardTop3.module.css";

const CardTop3 = ({ icon, legenda, vetor }) => {
    return (
        <>
            <div className={styles["card-top3"]}>
                <span className={styles["label-top3"]}>
                    {legenda}
                </span>
                <div className={styles["group-text"]}>
                    <div className={styles["text-top3"]}>
                        {icon ?
                            <div className={styles["icon-top3"]}>
                                {icon}
                            </div> : ""
                        }
                        <span className={styles["value-top3"]}>
                            1. {vetor[0] || "Nenhum"}
                        </span>
                    </div>
                    <div className={styles["text-top3"]}>
                        {icon ?
                            <div className={styles["icon-top3"]}>
                                {icon}
                            </div> : ""
                        }
                        <span className={styles["value-top3"]}>
                            2. {vetor[1] || "Nenhum"}
                        </span>
                    </div>
                    <div className={styles["text-top3"]}>
                        {icon ?
                            <div className={styles["icon-top3"]}>
                                {icon}
                            </div> : ""
                        }
                        <span className={styles["value-top3"]}>
                            3. {vetor[2] || "Nenhum"}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardTop3;