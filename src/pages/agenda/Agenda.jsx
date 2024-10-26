import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import AgendaDoDia from "../../components/agenda-do-dia/AgendaDoDia";
import api from "../../api";
import styles from "./Agenda.module.css";
import { logado, transformarData, transformarDataBd, transformarHora } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import CardAgendamento from "../../components/card-agendamento/CardAgendamento";
import { Tooltip } from 'react-tooltip'
import Input from "../../components/input/Input";
import fechado from "../../utils/assets/fechado.svg";
import { FaPlus } from "react-icons/fa6";
import ModalCancelarAgendamento from "../../components/modal-cancelar-agendamento/ModalCancelarAgendamento";
import { toast } from "react-toastify";
import { TbCalendarTime } from "react-icons/tb";

const Agenda = () => {
    const navigate = useNavigate();
    const idEmpresa = sessionStorage.getItem("idEmpresa");
    const [matriz, setMatriz] = useState([]);
    const [modalCancelarAberto, setModalCancelarAberto] = useState(false);
    const [descricaoAgendamento, setDescricaoAgendamento] = useState("");
    const [agendamento, setAgendamento] = useState({});

    const [nomeFuncionario, setNomeFuncionario] = useState("");
    const [dataHora, setDataHora] = useState(new Date());
    const [nomeServico, setNomeServico] = useState("");
    const [precoServico, setPrecoServico] = useState(0);
    const [horaFinalizacao, setHoraFinalizacao] = useState(new Date());

    const [dataSelecionada, setDataSelecionada] = useState(new Date());

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        buscarAgenda(dataSelecionada);
    }, [dataSelecionada]);

    const buscarAgenda = (dia) => {
        setDataSelecionada(dia)
        setMatriz([]);
        let dataFormatada = transformarDataBd(dia);

        api.get(`/agendamentos/matriz/empresa/${idEmpresa}/data/${dataFormatada}`).then((response) => {
            const { data } = response;
            console.log(data);
            setMatriz(data);
        }).catch((error) => {
            console.error("Houve um erro ao buscar agendamentos");
            console.error(error)
        })
    }

    const buscarInfoAgenda = (id) => {
        api.get(`/agendamentos/empresa/${idEmpresa}/id/${id}`).then((response) => {
            const { data } = response;
            console.log("Exibir card do agendamento de id: " + id);
            setAgendamento(data);
            const { nomeFuncionario, dtHora, nomeServico, preco, ident, horarioFinalizacao } = data;
            setNomeFuncionario(nomeFuncionario);
            setDataHora(dtHora);
            setNomeServico(nomeServico);
            setPrecoServico(preco);
            setHoraFinalizacao(horarioFinalizacao);
            //console.log(this)

            //document.getElementById("card").style.visibility = "visible";
        }).catch((error) => {
            console.error("Houve um erro ao buscar agendamento");
            console.error(error)
        })


    }

    const abrirModalCancelar = () => {
        if (!modalCancelarAberto) {
            setDescricaoAgendamento(`${transformarData(agendamento.dtHora)} das ${transformarHora(agendamento.dtHora.substring(11, 16)).substring(0, 5)} às ${transformarHora(agendamento.horarioFinalizacao).substring(0, 5)}`);
        } else {
            setAgendamento({});
            setDescricaoAgendamento("");
        }

        setModalCancelarAberto(!modalCancelarAberto);
    }

    const cancelar = () => {
        api.patch(`/agendamentos/atualizar-BitStatus-Cancelar-agendamento/${idEmpresa}/${agendamento.id}`).then(() => {
            toast.success("Agendamento cancelado com sucesso!");
            buscarAgenda(transformarDataBd(new Date()));
            abrirModalCancelar();
        }).catch((error) => {
            toast.error("Ocorreu um erro ao tentar cancelar agendamento. Tente novamente mais tarde.");
            console.log(error);
        });
    }

    return (
        <>
            <section className={styles["section-agenda"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-agenda"]}>

                    <div className={styles["content-agenda"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={"Agenda"} />
                            <div className={styles["group-button"]}>
                                <div>

                                    <Button
                                        funcaoButton={() => navigate("/agenda/relatorio")}
                                        cor="roxo"
                                        titulo={"Ver Relatório"}
                                        icone={<TbCalendarTime style={{ fontSize: "1.7rem" }} />}
                                    />

                                </div>
                                <Button
                                    funcaoButton={() => navigate("/agenda/adicionar")}
                                    cor="roxo"
                                    titulo={"Agendar"}
                                    icone={<FaPlus />}
                                />
                                <div>
                                    <Input
                                        valor={dataSelecionada}
                                        type={"date"}
                                        alterarValor={buscarAgenda}
                                        cor={"roxo"}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className={styles["table-agenda"]}>
                            {
                                matriz.length === 0 ?
                                    <div className={styles["sem-agendamentos"]}>
                                        <div>
                                            <img className={styles["imagem"]} src={fechado} alt="" />
                                        </div>
                                        <div>
                                            <span>Empresa fechada para o dia selecionado!</span>
                                        </div>
                                    </div>
                                    :
                                    <AgendaDoDia
                                        agenda={matriz}
                                        buscarInfoAgenda={buscarInfoAgenda}
                                    />
                            }


                        </div>
                    </div>
                </div>

                <Tooltip
                    id="my-tooltip"
                    style={{ backgroundColor: "rgba(91, 91, 91, 0.0)" }}
                    opacity={1}
                    clickable
                    className={styles["example-no-radius"]}>
                    <div style={{ minWidth: "30vw" }}>
                        <CardAgendamento
                            cor={"branco"}
                            tamanho={"sm"}
                            nomeFuncionario={nomeFuncionario}
                            dataHora={dataHora}
                            nomeServico={nomeServico}
                            precoServico={precoServico}
                            horaFinalizacao={horaFinalizacao}
                            funcaoCancelar={() => abrirModalCancelar()}
                            funcaoConfirmar={() => navigate(`/agenda/editar/${agendamento.id}`)}
                        />
                    </div>
                </Tooltip>
            </section>
            <ModalCancelarAgendamento
                modalCancelarAberto={modalCancelarAberto}
                setModalCancelarAberto={abrirModalCancelar}
                cancelar={cancelar}
                descricaoAgendamento={descricaoAgendamento}
            />
        </>
    );
};

export default Agenda;