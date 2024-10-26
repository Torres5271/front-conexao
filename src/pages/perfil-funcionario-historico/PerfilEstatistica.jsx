import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import styles from "./PerfilEstatistica.module.css";
import { logado, transformarDataHora, transformarTelefoneCelular } from "../../utils/global";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Titulo from "../../components/titulo/Titulo";
import imgPerfil from "./../../utils/assets/perfil_gradiente.svg";
import Table from "../../components/table/Table";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const PerfilEstatistica = () => {
    const navigate = useNavigate();
    const titulos = ["Data Agendamento", "Nome Cliente", "Telefone Cliente", "Valor Total", "Serviços", "Status"]
    const idEmpresa = sessionStorage.getItem("idEmpresa")
    const idProfissional = useParams().idProfissional;
    const [dadosAgendamentos, setDadosAgendamentos] = useState([]);
    const [qntdClientes, setQntdClientes] = useState(0);
    const [qntdConcluidos, setQntdConcluidos] = useState(0);
    const [valorComissao, setValorComissao] = useState(0);
    const [dataSelecionada, setDataSelecionada] = useState(new Date());
    const [nome, setNome] = useState("");

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        chamarFuncoes(dataSelecionada);
    }, [navigate, idEmpresa]);

    const chamarFuncoes = (data) => {
        const dataFormatada = new Date(data);
        const mes = dataFormatada.getMonth() + 1;
        const ano = dataFormatada.getFullYear();
        setDataSelecionada(dataFormatada);
        buscarNomeUsuario(idProfissional);
        buscarAgendamentos(idProfissional, ano, mes);
        buscarQntdClientes(idProfissional, ano, mes);
        buscarValorComissao(idProfissional, ano, mes);
        buscarAgendConcluido(idProfissional, ano, mes);
    }
    
    //Buscar lista de agendamentos do mês
    const buscarAgendamentos = (idProfissional, ano, mes) => {
        api.get(`/perfilFuncionario/agendamentos/${idProfissional}/${ano}/${mes}`)
            .then((response) => {
                const { data } = response;
                console.log(data);
                setDadosAgendamentos(data);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Erro ao buscar agendamentos");
            });
    }

    const buscarNomeUsuario = (idProfissional) => {
        api.get(`/perfilFuncionario/nomeFuncionario/${idProfissional}`)
            .then((response) => {
                const { data } = response;
                console.log(data);
                setNome(data);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Erro ao buscar agendamentos");
            });
    }

    //Retornar quantidade de agendamentos no mês
    // const quantidadeAgendamentos = () => {
    //     return dadosAgendamentos.length;
    // }

    const buscarAgendConcluido = (idProfissional, ano, mes) => {
        api.get(`/perfilFuncionario/quantidadeAgendamentos/${idProfissional}/${ano}/${mes}`)
            .then((response) => {
                const { data } = response;
                console.log(data);
                setQntdConcluidos(data);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Erro ao buscar agendamentos");
            });
    }
    //Retornar quantidade de clientes atendidos no mês
    const buscarQntdClientes = (idProfissional, ano, mes) => {
        api.get(`/perfilFuncionario/quantidadeClientesAtendidos/${idProfissional}/${ano}/${mes}`)
            .then((response) => {
                const { data } = response;
                console.log(data);
                setQntdClientes(data);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Erro ao buscar agendamentos");
            });
    }

    const buscarValorComissao = (idProfissional, ano, mes) => {
        api.get(`/perfilFuncionario/valorComissao/${idProfissional}/${ano}/${mes}`)
            .then((response) => {
                const { data } = response;
                console.log(data);
                setValorComissao(data);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Erro ao buscar agendamentos");
            });
    }


    return (
        <>
            <section className={styles["section-perfil"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-perfil"]}>
                    <div className={styles["content-perfil"]}>
                        <div className={styles["header"]}>
                            {/* <Titulo
                                titulo={<FaArrowLeft className={styles["icon-voltar"]}/>}
                                onClick={() => navigate("/equipe")} 
                            /> */}
                            <Button
                                // funcaoButton={() => navigate("/equipe")}
                                funcaoButton={() => navigate(-1)}
                                cor="branco"
                                icone={<FaArrowLeft className={styles["icon-voltar"]} />}
                            />
                            <div className={styles["group-button"]}>

                                <Input
                                    valor={dataSelecionada}
                                    type={"date"}
                                    isMensal={true}
                                    alterarValor={chamarFuncoes}
                                    cor={"roxo"}
                                />

                            </div>
                        </div>
                        <div className={styles["informations-perfil"]}>
                            <div className={styles["photo-perfil"]}>
                                <div>
                                    <img
                                        src={imgPerfil}
                                        alt="Foto de perfil do usuário"
                                        className={styles["img-perfil"]}
                                        style={{ borderRadius: "50%" }}
                                    />
                                </div>
                                <div>
                                    <Titulo tamanho={"md"} cor={"roxo"} titulo={nome} />
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div className={styles["info-estatisticas"]}>
                                    {/* <div className={styles["info-kpis"]}>
                                    <Titulo tamanho={"md"} titulo={"10"} />
                                    <Titulo tamanho={"sm"} titulo={"Serviços realizados"} />
                                </div> */}

                                    <div className={styles["info-kpis"]}>
                                        <Titulo tamanho={"md"} titulo={qntdConcluidos} />
                                        <Titulo tamanho={"sm-leve"} titulo={"Atendimentos Concluídos"} />
                                    </div>
                                    <div className={styles["info-kpis"]}>
                                        <Titulo tamanho={"md"} titulo={qntdClientes} />
                                        <Titulo tamanho={"sm-leve"} titulo={"Clientes Atendidos No Período"} />
                                    </div>

                                    <div className={styles["info-kpis"]}>
                                        {
                                            valorComissao ?
                                                <Titulo tamanho={"md"} titulo={"R$ " + (valorComissao / 100).toFixed(2).replace(".",",")} />
                                                :
                                                <Titulo tamanho={"md"} titulo={"R$ 0,00"} />
                                        }
                                        <Titulo tamanho={"sm-leve"} titulo={"Comissão Mensal"} />
                                    </div>
                                </div>
                            </div>


                            <div className={styles["historico-agendamento"]}>
                                <div className={styles["header"]}>
                                    <Titulo tamanho={"md"} titulo={"Histórico de Agendamentos"} />
                                </div>

                                <div className={styles["tabela-historico"]}>
                                    {
                                        dadosAgendamentos.length === 0 ?
                                            <div className={styles["sem-agendamentos"]}>
                                                Não há agendamentos para esse mês.
                                            </div>
                                            :
                                            <Table
                                                titulos={titulos}
                                                matriz={dadosAgendamentos.map((linha) => {
                                                    return [transformarDataHora(linha.dtHora), linha.nomeCliente,
                                                    transformarTelefoneCelular(linha.telefoneCliente), (`R$ ${linha.valorServico.toFixed(2).replace(".",",")}`), linha.nomeServico, linha.descricaoStatus]
                                                })}
                                            />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PerfilEstatistica;
