import React from "react"; 
import styles from "./Row.module.css";
import { FaAngleRight } from "react-icons/fa6";

const Row = ({ titulo, valor, funcao }) => {
    return (
        <>
            <div className={styles["row"]}>
                <div className={styles["text-title"]}>
                    <span className={styles["title"]}>
                        { titulo }
                    </span>
                    <span className={styles["value"]} onClick={funcao}>
                        { valor }
                    </span>
                </div>
                <div className={styles["icon-arrow"]} onClick={funcao}>
                    <FaAngleRight />
                </div>
            </div>
        </>
    );
}

export default Row;