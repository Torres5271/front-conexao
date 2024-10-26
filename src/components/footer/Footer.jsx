import React from "react";
import styles from "./Footer.module.css";
import Button from './../button/Button';
import { FaFacebook, FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import imgFooter from "./../../utils/assets/img_footer.png"
import logoBranca from "./../../utils/assets/logo_calencare_branca.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <>
            <footer>
                <div className={styles["container"]}>
                    <div className={styles["content"]}>
                        <img src={logoBranca} alt="Logo Calencare Branca" className={styles["img-logo"]} />
                        <h1 className={styles["title"]}> Organizando seu negócio, sempre que <span className="title-roxo"> você </span> quiser. </h1>
                        <Button titulo="Cadastre-se" cor="roxo" funcaoButton={() => navigate("/cadastro")}/>
                    </div>
                    <div className={styles["image"]}>
                        <img src={imgFooter} alt="Tela de início da Calencare com visão geral dos agendamentos do dia" className={styles["img-footer"]} />
                    </div>
                </div>
                <div className={styles["copyright"]}>
                    <div className={styles["container-copyright"]}>
                        <span className={styles["text-copyright"]}>
                            © 2024 Libellus. Todos os direitos reservados.
                        </span>
                        <div className={styles["group-midias"]}>
                            <div className={styles["btn-icon"]}>
                                <FaFacebook />
                            </div>
                            <div className={styles["btn-icon"]}>
                                <FaLinkedinIn />
                            </div>
                            <div className={styles["btn-icon"]}>
                                <FaInstagram />
                            </div>
                            <div className={styles["btn-icon"]}>
                                <FaXTwitter size="1em" color="black" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;