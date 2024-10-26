import React, { useEffect, useState } from "react";
import styles from "./EditarEmpresa.module.css"
import Header from "../../components/header/Header";
import api from "../../api";
import Titulo from '../../components/titulo/Titulo';
import Button from "../../components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { inputSomenteTexto, logado } from "../../utils/global";
import Input from "../../components/input/Input";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";

const EditarEmpresa = () => {
    const navigate = useNavigate();
    const { idEmpresa } = useParams();
    const [razaoSocial, setRazaoSocial] = useState("")
    const [cnpj, setCNPJ] = useState("")
    const [telefonePrincipal, setTelefonePrincipal] = useState("")
    const [emailPrincipal, setEmailPrincipal] = useState("")
    const [intervaloAtendimento, setIntervaloAtendimento] = useState(0)

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get(`/empresas/${idEmpresa}`).then((response) => {
            const { data } = response
            const { razaoSocial, cnpj, emailPrincipal, telefonePrincipal, intervaloAtendimento } = data;

            setRazaoSocial(razaoSocial);
            setCNPJ(cnpj);
            setEmailPrincipal(emailPrincipal);
            setTelefonePrincipal(telefonePrincipal);
            setIntervaloAtendimento(intervaloAtendimento)

        }).catch((error) => {
            console.log("Houve um erro ao buscar o empresa");
            console.log(error);
        })
    }, [navigate, idEmpresa]);

    const voltar = () => {
        navigate(-1);
    }

    const editar = () => {
        let body = {
            "id": idEmpresa,
            razaoSocial,
            emailPrincipal,
            telefonePrincipal,
            intervaloAtendimento
            // dtCriacao,  
            // empresa
        }
        api.put(`/empresas/${idEmpresa}`, body).then((response) => {
            console.log(response);
            toast.success("Informações da Empresa atualizadas com sucesso!")
            navigate("/perfil");
        }).catch((error) => {
            console.log("Houve um erro ao atualizar o funcionário");
            console.log(error);
        });
    }

    return (
        <>
            <section className={styles["section-empresa"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-empresa"]}>
                    <div className={styles["content-empresa"]}>
                        <div className={styles["header"]}>
                            <Titulo
                                tamanho={"md"}
                                titulo={"Editar Informações da Empresa"}
                            />
                        </div>
                        <div className={styles["informations-empresa"]}>
                            <Input
                                tamanho={"lg"}
                                valor={razaoSocial}
                                alterarValor={setRazaoSocial}
                                titulo={"Razão Social"}
                                validarEntrada={(e) => inputSomenteTexto(e)}
                            />
                            <Input
                                tamanho={"lg"}
                                valor={cnpj}
                                alterarValor={setCNPJ}
                                titulo={"CNPJ"}
                                mascara={"00.000.000/0000-00"}
                                readonly={true}
                            />
                            <Input
                                tamanho={"lg"}
                                valor={emailPrincipal}
                                alterarValor={setEmailPrincipal}
                                titulo={"Email Principal"}
                                type={"email"}
                            />
                            <Input
                                tamanho={"lg"}
                                valor={telefonePrincipal}
                                alterarValor={setTelefonePrincipal}
                                titulo={"Telefone Principal"}
                                mascara={telefonePrincipal.length === 14 ? "(00) 0000-00000" : "(00) 00000-0000"}
                            />
                            <Input
                                tamanho={"lg"}
                                valor={intervaloAtendimento}
                                alterarValor={setIntervaloAtendimento}

                                titulo={"Intervalo entre Atendimentos (em minutos)"}
                            />

                        </div>
                        <div className={styles["group-button"]}>
                            <Button
                                titulo={"Cancelar"}
                                cor={"branco"}
                                funcaoButton={() => voltar()}
                                icone={
                                    <div style={{
                                        fontSize: "18px",
                                        display: "flex",
                                        alignItens: "center",
                                        justifyContent: "center"
                                    }}>
                                        <TiCancel />
                                    </div>
                                } />
                            <Button
                                titulo={"Editar"}
                                icone={<FaCheck />}
                                cor={"roxo"}
                                funcaoButton={() => editar()}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default EditarEmpresa;