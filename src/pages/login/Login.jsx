import React, { useState } from "react";
import styles from "./Login.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Logo from "../../components/logo/Logo";
import Imagem from "../../utils/assets/login.svg"
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import imgFundo from './../../utils/assets/bolinha_login.svg';
import imgFundoImagem from './../../utils/assets/bolinha_imagem_login.svg';
import api from "../../api";

const validar = (valor, nome ) => {
    if (valor === "") {
        toast.error(`O campo ${nome} deve ser preenchido!`)
        return false;
    }

    return true;
}

const Login = () => {
    sessionStorage.clear();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const logar = () => {
        let emailPreenchido = validar(email, "Email");
        console.log(emailPreenchido)
        if (emailPreenchido && validar(senha, "Senha")) {
            let body = {
                email,
                senha
            }

            api.post("/funcionarios/login", body).then((response) => {
                console.log(response)
                const { data } = response
                sessionStorage.setItem("nomeUser", data.nome)
                sessionStorage.setItem("idUser", data.userId)
                sessionStorage.setItem("token", data.token)

                api.get(`/funcionarios/${data.userId}`).then((response) => {
                    const { data } = response;
                    const { empresa } = data;
                    const { id } = empresa;
                    sessionStorage.setItem("idEmpresa", Number(id));
                    navigate("/inicio");
                }).catch((error) => {
                    console.error(error)
                })


            }).catch(function (error) {
                console.error(error);
                const { code } = error;

                if (code === "ERR_NETWORK") {
                    toast.error("Houve um erro ao tentar logar. Tente novamente mais tarde.");
                } else if (code === "ERR_BAD_REQUEST") {
                    toast.error("Email e/ou senha incorretos")
                }
            });
        }
    }

    return (
        <>
            <div className={styles["tela-login"]}>
                <div className={styles["formulario-login"]}>
                    <div className={styles["background"]}>
                        <img className={styles["img-background"]} src={imgFundo} alt="bolinhas de fundo" />
                    </div>
                    <div className={styles["text"]}>
                        <h1> Entrar </h1>
                        <p>Entre com os dados da sua <b>conta</b> para começar a realizar os agendamentos.</p>
                    </div>
                    <div className={styles["form"]}>
                        <div className={styles["container-login"]}>
                            <Input
                                id={"email"}
                                titulo={"Email"}
                                type="email"
                                valor={email}
                                alterarValor={setEmail}
                                className={styles["email"]}
                                sobrepor={true}
                            />
                            <Input
                                id={"senha"}
                                titulo={"Senha"}
                                type={"password"}
                                valor={senha}
                                alterarValor={setSenha}
                                sobrepor={true}
                            />
                        </div>
                        <div className={styles["container-buttons"]}>
                            <Button funcaoButton={() => navigate(-1)} titulo="Voltar" cor={"branco"} icone={<HiOutlineArrowLeft />}></Button>
                            <Button
                                funcaoButton={() => logar()}
                                titulo="Entrar" cor={"roxo"}  ></Button>
                        </div>
                    </div>
                    <div className={styles["text-cadastre-se"]}>
                        <span>
                            Não possui uma conta? <b className={styles["link-cadastre-se"]} onClick={() => navigate("/cadastro")}> Cadastre-se
                            </b>
                        </span>
                    </div>
                </div>
                <div className={styles["container-imagem-login"]}>
                    <div className={styles["background-imagem"]}>
                        <img src={imgFundoImagem} alt="bolinhas de fundo" />
                    </div>
                    <div className={styles["logo-login"]} onClick={() => navigate("/")}>
                        <Logo /></div>
                    <img className={styles["imagem-login"]} src={Imagem} alt="imagem login" />
                </div>
            </div >
        </>
    )
}

export default Login;