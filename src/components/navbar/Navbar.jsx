import React from "react";
import styles from "./Navbar.module.css";
import Button from "../button/Button"
import { useLocation, useNavigate } from "react-router-dom"
import Logo from "../../utils/assets/logo_calencare.png";

const Navbar = ({ irParaInicio, irParaProduto, irParaBeneficios, irParaPrecos }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <>
            <header className={styles["header"]} id={styles[!isHome ? "sem-fundo" : ""]}>
                <div className={styles["nav"]}>
                    <div className={styles["logo"]}>
                        <img
                            className={styles["img-logo"]}
                            src={Logo}
                            onClick={irParaInicio}
                            alt="Logo da Calencare"
                        />
                    </div>
                    <ul className={styles["list"]} style={{
                        display: isHome ? "flex" : "flex"
                    }}>
                        <li className={styles["list-item"]}>
                            <span className={styles["link-item"]} onClick={irParaInicio}> Início </span> </li>
                        <li className={styles["list-item"]}>
                            <span className={styles["link-item"]} onClick={irParaProduto}> Produto </span>
                        </li>
                        <li className={styles["list-item"]}>
                            <span className={styles["link-item"]} onClick={irParaBeneficios}> Benefícios </span>
                        </li>
                        <li className={styles["list-item"]}>
                            <span className={styles["link-item"]} onClick={irParaPrecos}>Preços</span>
                        </li>
                    </ul>
                    <div className={styles["group-button"]}>
                        <span className={styles["link-item"]} onClick={() => navigate("/login")}> Entrar </span>
                        <Button funcaoButton={() => navigate("/cadastro")} titulo="Cadastre-se" cor="roxo" />
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;