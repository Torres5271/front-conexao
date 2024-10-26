import React from "react";
import Navbar from './../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import imgNotFound from './../../utils/assets/not_found.png';
import imgFundoInferiorDireito from "./../../utils/assets/bolinhas_fundo.svg";
import Button from './../../components/button/Button';
import { ArrowLeft, IconlyProvider } from "react-iconly";

const NotFound = () => {
    const navigate = useNavigate();

    const navegar = (url, secao) => {
        navigate(url);
        sessionStorage.removeItem("secao");

        if (secao) {
            sessionStorage.setItem("secao", secao);
        }
    }

    return (
        <>
            <section className={styles["section-not-found"]}>
                <Navbar
                    irParaInicio={() => navegar("/")}
                    irParaProduto={() => navegar("/", "produto")}
                    irParaBeneficios={() => navegar("/", "beneficios")}
                    irParaPrecos={() => navegar("/", "precos")}
                />
                <div className={styles["container-not-found"]}>
                    <div className={styles["content-not-found"]}>
                        <div className={styles["image-not-found"]}>
                            <img
                                className={styles["img-not-found"]}
                                src={imgNotFound}
                                alt="Imagem página não encontrada"
                            />
                        </div>
                        <div className={styles["text-not-found"]}>
                            <div className={styles["title-not-found"]}>
                                Ooops... Página <span className={"title-roxo"}> não </span> encontrada
                            </div>
                            <div className={styles["group-button"]}>
                                <Button
                                    titulo={"Voltar"}
                                    cor={"branco"}
                                    funcaoButton={() => navigate(-1)}
                                    icone={
                                        <IconlyProvider
                                            stroke="bold"
                                        >
                                            <ArrowLeft />
                                        </IconlyProvider>
                                    }
                                />
                                <Button
                                    titulo={"Ir para início"}
                                    cor={"roxo"}
                                    funcaoButton={() => navigate("/")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["fundo"]}>
                    <img
                        src={imgFundoInferiorDireito}
                        alt="" />
                </div>
            </section>
        </>
    );
}

export default NotFound;