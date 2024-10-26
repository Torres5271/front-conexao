import React from "react";
import styles from "./CardAgendamento.module.css";
import imgPerfilGradiente from "./../../utils/assets/perfil_gradiente.svg";
import imgPerfilRoxo from "./../../utils/assets/perfil_roxo.svg";
import { transformarDataHora, transformarDouble, transformarHora } from "../../utils/global";
import Button from './../button/Button';
import { TiCancel } from "react-icons/ti";
import { Ticket, IconlyProvider } from "react-iconly"

const CardAgendamento = ({
    tamanho,
    cor,
    imgFuncionario,
    nomeFuncionario,
    dataHora,
    horaFinalizacao,
    nomeCliente,
    nomeServico,
    precoServico,
    funcaoCancelar,
    funcaoConfirmar,
    tituloBotaoConfirmar,
    tituloBotaoCancelar
}) => {
    const imgPerfil = cor === "branco" ? imgPerfilGradiente : imgPerfilRoxo;

    return (
        <>
            <div
                className={styles[`card-agendamento`]}
                id={styles[cor || "branco"]}
                style={
                    {
                      width: tamanho ? "100%" : ""
                    }
                }
            >
                <div className={styles["informations-agendamento"]}>
                    <div className={styles["photo-funcionario"]}>
                        <img
                            className={styles["img-funcionario"]}
                            src={
                                imgFuncionario || imgPerfil
                            }
                            alt="Foto de perfil do funcionário"
                            style={{
                                width: tamanho ? "2rem" : "3.3rem",
                                height: tamanho ? "2rem" : "3.3rem",
                                borderRadius: tamanho ? "0.3rem" : ""
                            }}
                        />
                    </div>
                    <div
                        className={styles["text-agendamento"]}
                        style={{
                            rowGap: tamanho ? "4px" : ""
                        }}
                    >
                        <div
                            className={styles["info-agendamento"]}
                        >
                            <span
                                className={styles["text-funcionario"]}
                                style={{
                                    fontSize: tamanho ? "1rem" : ""
                                }}
                            >
                                {nomeFuncionario}
                            </span>
                            <span
                                className={styles["text-horario"]}
                                style={{
                                    padding: tamanho ? "0.5rem 0" : "",
                                    backgroundColor: tamanho ? "transparent" : ""
                                }}
                            >
                                {tamanho ?
                                    transformarHora(dataHora.toString().substring(11, 16)).substring(0, 5) : transformarDataHora(dataHora)}

                                {tamanho ?
                                    " às " + transformarHora(horaFinalizacao.toString()).substring(0, 5) : ""}
                            </span>
                        </div>
                        <div
                            className={styles["info-servico"]}
                        >
                            {nomeCliente ?
                                <span className={styles["text-cliente"]}> {nomeCliente} </span>
                                : ""
                            }
                            <span
                                className={styles["text-servico"]}
                                style={{
                                    fontSize: tamanho ? "0.9rem" : "",
                                    letterSpacing: tamanho ? "-0.02rem" : ""
                                }}>
                                {nomeServico} / R${transformarDouble(precoServico)}
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    className={styles["group-buttons"]}
                    style={{
                        padding: tamanho ? "0.8rem 0 0 0" : ""
                    }}
                >
                    <Button
                        funcaoButton={funcaoCancelar}
                        tamanho={tamanho}
                        titulo={tituloBotaoCancelar || "Cancelar"}
                        cor={cor === "branco" ? cor : "cinza"}
                        icone=
                        {tamanho ? "" :
                            <div style={{
                                fontSize: "1.1rem",
                                display: "flex",
                                alignItens: "center",
                                justifyContent: "center"
                            }}>
                                <TiCancel />
                            </div>
                        } />
                    <Button
                        titulo={tituloBotaoConfirmar || "Ver Agendamento"}
                        cor="roxo"
                        tamanho={tamanho}
                        funcaoButton={funcaoConfirmar}
                        icone={tamanho ? "" :
                            <IconlyProvider
                                stroke="bold"
                                size="small"
                            >
                                <Ticket />
                            </IconlyProvider>
                        } />
                </div>
            </div>
        </>
    );
}

export default CardAgendamento;