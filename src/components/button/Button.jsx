import React from "react";
import styles from "./Button.module.css";

const Button = ({ funcaoButton, tamanho, titulo, cor, icone, disabled }) => {
    return (
        <>
            <div className={styles["btn"]}>
                <button
                    onClick={funcaoButton}
                    id={disabled ? styles["desabilitado"] : ""}
                    className={styles[cor]}
                    style={{
                        fontSize: tamanho ? "13px" : "15px",
                        padding: tamanho ? "8px 20px" : ""
                    }}
                    disabled={disabled || false}
                >
                    {icone ? icone : ""} {titulo} {disabled}
                </button>
            </div>
        </>
    );
}
export default Button;