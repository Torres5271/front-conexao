import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./Dashboard.module.css";
import Titulo from './../../components/titulo/Titulo';
import Button from './../../components/button/Button';
import { Download, IconlyProvider, Work, User, Calendar } from "react-iconly";
import CardKpi from './../../components/card-kpi/CardKpi';
import { CiMoneyBill } from "react-icons/ci";
import Input from "../../components/input/Input";
import api from "../../api";
import { logado, transformarData, transformarDataBd } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import CardTop3 from '../../components/card-top-3/CardTop3';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import { Tooltip } from 'react-tooltip';import { toast } from "react-toastify";
;

Chart.register(CategoryScale);

const Dashboard = () => {
    const navigate = useNavigate();
    const idEmpresa = sessionStorage.idEmpresa;
    const [agendamentosTotalDoDia, setAgendamentosTotalDoDia] = useState(0);
    const [agendamentosPendentes, setagendamentosPendentes] = useState(0);
    const [agendamentosAtivos, setagendamentosAtivos] = useState(0);
    const [agendamentosFinalizados, setAgendamentosFinalizados] = useState(0);
    const [agendamentosCancelados, setAgendamentosCancelados] = useState(0);
    const [lucroTotalDoDia, setLucroTotalDoDia] = useState(0);
    const [servicoMaisAgendado, setServicoMaisAgendado] = useState("");
    const [dataSelecionada, setDataSelecionada] = useState(new Date());
    const [top3Servicos, setTop3Servicos] = useState([]);
    const [top3Profissionais, setTop3Profissionais] = useState([]);
    const [top3Clientes, setTop3Clientes] = useState([]);
    const [dadosAgendamentosPorProfissional, setDadosAgendamentosPorProfissional] = useState(false);
    const [dadosAgendamentosPorCategoria, setDadosAgendamentosPorCategoria] = useState([])

    const [graficoBarras, setGraficoBarras] = useState({
        labels: ["Nome"],
        datasets: [
            {
                label: "Agendamentos no Dia",
                data: [0],
                backgroundColor: [
                    "#9F35F0",
                    "#3545F0",
                    "#6134EF",
                    "#C085EF",
                    "#8758EA",
                    "#F036A5",
                    "#DB35EF",
                    "#51BDE9",
                    "#5EA4EA",
                    "#35F0E9",
                    "#F1AA36"
                ],
                borderColor: "transparent",
                borderWidth: 2
            }
        ]
    });

    const [graficoDonut, setGraficoDonut] = useState({
        labels: ["Categoria"],
        datasets: [
            {
                label: "Agendamentos no Dia",
                data: [0],
                backgroundColor: [
                    "#9F35F0",
                    "#3545F0",
                    "#6134EF",
                    "#C085EF",
                    "#8758EA",
                    "#F036A5",
                    "#DB35EF",
                    "#51BDE9",
                    "#5EA4EA",
                    "#35F0E9",
                    "#F1AA36"
                ],
                borderColor: "transparent",
                borderWidth: 2,
            }
        ]
    });

    const cores = [[
        "rgba(159, 53, 240, 0.5)",
        "rgba(53, 69, 240, 0.5)",
        "rgba(97, 52, 239, 0.5)",
        "rgba(192, 133, 239, 0.5)",
        "rgba(135, 88, 234, 0.5)",
        "rgba(240, 54, 165, 0.5)",
        "rgba(219, 53, 239, 0.5)",
        "rgba(81, 189, 233, 0.5)",
        "rgba(94, 164, 234, 0.5)",
        "rgba(53, 240, 233, 0.5)",
        "rgba(241, 170, 54, 0.5)"
    ], [
        "#9F35F0",
        "#3545F0",
        "#6134EF",
        "#C085EF",
        "#8758EA",
        "#F036A5",
        "#DB35EF",
        "#51BDE9",
        "#5EA4EA",
        "#35F0E9",
        "#F1AA36"
    ]]

    useEffect(() => {
        if (!logado(sessionStorage.token)) {
            navigate("/login")
        }

        buscarDadosDashboard(dataSelecionada);

    }, [idEmpresa, navigate, dataSelecionada]);

    const buscarDadosDashboard = (dataSelecionada) => {
        console.log(dataSelecionada)
        setDataSelecionada(dataSelecionada)
        let dataFormatada = transformarDataBd(dataSelecionada);

        api.get(`/dashboard/stats/${idEmpresa}/${dataFormatada}`).then((response) => {
            const { data } = response;
            const { Pendentes, Cancelados, Finalizados, TotalAgendamentos } = data;
            setagendamentosAtivos(TotalAgendamentos - (Pendentes + Cancelados + Finalizados))
            setAgendamentosTotalDoDia(TotalAgendamentos)
            setagendamentosPendentes(Pendentes)
            setAgendamentosFinalizados(Finalizados)
            setAgendamentosCancelados(Cancelados)
        }).catch((error) => {
            console.error(error);
        })


        api.get(`/dashboard/profissional/${idEmpresa}/${dataFormatada}`).then((response) => {
            const { data } = response;
            console.log(data)
            gerarGraficoBarra(data);
        }).catch((error) => {
            console.error(error);
        })

        api.get(`/dashboard/categoria/${idEmpresa}/${dataFormatada}`).then((response) => {
            const { data } = response;
            console.log(data)
            setDadosAgendamentosPorCategoria(data);
            gerarGraficoDonut(data);
        }).catch((error) => {
            console.error(error);
        })

        api.get(`/dashboard/lucro/${idEmpresa}/${dataFormatada}`).then((response) => {
            const { data } = response;
            const { LucroTotalDoDia } = data;
            setLucroTotalDoDia(LucroTotalDoDia || 0)
        }).catch((error) => {
            console.error(error);
        })

        api.get(`/dashboard/rentabilidade/${idEmpresa}/${dataFormatada}`).then((response) => {
            const { data } = response;
            let servico = data.length > 0 ? data[0].servico : undefined;
            setServicoMaisAgendado(servico);
        }).catch((error) => {
            console.error(error);
        })

        api.get(`/dashboard/top3-servicos/${idEmpresa}/${dataFormatada}`).then((response) => {
            const { data } = response;
            setTop3Servicos(data || [])
        }).catch((error) => {
            console.error(error);
        })

        api.get(`/dashboard/top3-profissionais/${idEmpresa}/${dataFormatada}`).then((response) => {
            const { data } = response;
            setTop3Profissionais(data || []);
        }).catch((error) => {
            console.error(error);
        })

        api.get(`/dashboard/top3-clientes/${idEmpresa}/${dataFormatada}`).then((response) => {
            const { data } = response;
            setTop3Clientes(data || []);
        }).catch((error) => {
            console.error(error);
        })
    }


    const gerarGraficoBarra = (dadosAgendamentosPorProfissional) => {
        setDadosAgendamentosPorProfissional(dadosAgendamentosPorProfissional);
        setGraficoBarras({
            labels: dadosAgendamentosPorProfissional.map((s) => s.nome),
            datasets: [
                {
                    label: "Agendamentos no Dia",

                    data: dadosAgendamentosPorProfissional.map((s) => s.count),
                    backgroundColor: [
                        "rgba(159, 53, 240, 0.25)",
                        "rgba(53, 69, 240, 0.25)",

                        "rgba(97, 52, 239, 0.25)",

                        "rgba(192, 133, 239, 0.25)",
                        "rgba(135, 88, 234, 0.25)",
                        "rgba(240, 54, 165, 0.25)",
                        "rgba(219, 53, 239, 0.25)",
                        "rgba(81, 189, 233, 0.25)",
                        "rgba(94, 164, 234, 0.25)",
                        "rgba(53, 240, 233, 0.25)",
                        "rgba(241, 170, 54, 0.25)"
                    ],
                    borderColor: [
                        "#9F35F0",
                        "#3545F0",
                        "#6134EF",
                        "#C085EF",
                        "#8758EA",
                        "#F036A5",
                        "#DB35EF",
                        "#51BDE9",
                        "#5EA4EA",
                        "#35F0E9",
                        "#F1AA36"
                    ],
                    borderWidth: 2
                }
            ]
        })
    }

    const gerarGraficoDonut = (dadosAgendamentosPorCategoria) => {
        setDadosAgendamentosPorCategoria(dadosAgendamentosPorCategoria);
        setGraficoDonut({
            labels: dadosAgendamentosPorCategoria.map((s) => s.categoria),
            datasets: [
                {
                    label: `Agendamentos`,
                    data: dadosAgendamentosPorCategoria.map((s) => s.count),
                    backgroundColor: cores[0],
                    borderColor: cores[1],
                    borderWidth: 2
                }
            ],
        })
    }

    const gerarRelatorio = () => {
        api.get(`/pdfs/${idEmpresa}?date=${transformarDataBd(dataSelecionada)}&page=0&size=3`, {
            responseType: "arraybuffer"
        }).then((response) => {
            const { data } = response;
            // Criando uma URL e um arquivo Blob com a resposta da requisição no Backend
            const url = window.URL.createObjectURL(new Blob([data]));
            // Criando um elemento A, para representar um link
            const link = document.createElement("a");
            // Definindo nome do arquivo a ser baixado
            link.download = `Relatório do Dia - ${transformarData(dataSelecionada)}.pdf`;
            // Definindo a URL no link
            link.href = url;
            // Simulando um click no link para baixar o arquivo
            link.click();
        }).catch((error) => {
            console.error(error);
            toast.error("Ocorreu um erro baixar relatório.");
        })
    }

    return (
        <>
            <section className={styles["section-dashboard"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-dashboard"]}>
                    <div className={styles["content-dashboard"]}>
                        <div className={styles["titulo-dashboard"]}>
                            <Titulo titulo="Dashboard" tamanho={"md"} />
                            <div className={styles["group-button"]}>
                                <Button
                                    titulo={"Baixar Relatório"}
                                    cor={"branco"}
                                    icone={
                                        <IconlyProvider
                                            size={"medium"}
                                        >
                                            <Download />
                                        </IconlyProvider>
                                    }
                                    funcaoButton={() => gerarRelatorio()}
                                />
                                <div>
                                    <Input
                                        valor={dataSelecionada}
                                        type={"date"}
                                        alterarValor={buscarDadosDashboard}
                                        cor={"roxo"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles["group-kpis"]}>
                            <div className={styles["card-kpi"]}>
                                <CardKpi
                                    legenda={"Agendamentos Total do Dia"}
                                    valor={agendamentosTotalDoDia}
                                    icon={
                                        <IconlyProvider
                                            stroke="bold"
                                            size={"large"}
                                        >
                                            <Calendar />
                                        </IconlyProvider>
                                    }

                                    tooltip={
                                        <Tooltip
                                            anchorSelect="#tooltip"
                                            className={styles["tooltip"]}
                                            content={
                                                <div className={styles["content-tooltip"]}>
                                                    <span>
                                                        Total de Agendamentos: <b> {agendamentosTotalDoDia} </b>
                                                    </span>
                                                    <span>
                                                        Agendamentos Ativos: <b> {agendamentosAtivos} </b>
                                                    </span>
                                                    <span>
                                                        Agendamentos Pendentes: <b> {agendamentosPendentes} </b>
                                                    </span>
                                                    <span>
                                                        Agendamentos Finalizados: <b> {agendamentosFinalizados} </b>
                                                    </span>
                                                    <span>
                                                        Agendamentos Cancelados: <b> {agendamentosCancelados} </b>
                                                    </span>
                                                </div>
                                            }
                                        />
                                    }
                                />
                            </div>
                            <div className={styles["card-kpi"]}>
                                <CardKpi
                                    legenda={"Lucro Obtido no Dia"}
                                    valor={"R$ " + lucroTotalDoDia.toFixed(2).replace(".", ",")}
                                    icon={
                                        <CiMoneyBill style={{
                                            fontSize: "2.5rem",
                                            textAlign: "center",
                                            display: "flex",
                                            stroke: "var(--roxo-principal)",
                                            strokeWidth: "0.5px"
                                        }} />
                                    }
                                />
                            </div>
                            <div className={styles["card-kpi"]}>
                                <CardKpi
                                    legenda={"Serviço Mais Agendado"}
                                    valor={servicoMaisAgendado || "Nenhum"}
                                    icon={
                                        <IconlyProvider
                                            stroke="bold"
                                            size={"large"}
                                        >
                                            <Work />
                                        </IconlyProvider>
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles["group-dashboard"]}>
                            <div className={styles["card-dashboard"]} id={styles["lg"]}>
                                <span className={styles["title-chart"]}>
                                    Agendamentos no Dia Por Profissional
                                </span>
                                {dadosAgendamentosPorProfissional.length === 0 ?
                                    <div className={styles["sem-dados"]}>
                                        Não há dados para exibir
                                    </div> :
                                    <Bar
                                        style={{
                                            fontFamily: "Poppins"
                                        }}
                                        data={graficoBarras}
                                        options={{
                                            scales: {
                                                x: {
                                                    ticks: {
                                                        color: cores[1],
                                                        font: {
                                                            family: "Poppins",
                                                            weight: "700"
                                                        }
                                                    },
                                                },
                                                y: {
                                                    ticks: {
                                                        stepSize: 1
                                                    }
                                                }
                                            },
                                            plugins: {
                                                title: {
                                                    display: false
                                                },
                                                legend: {
                                                    display: false
                                                },
                                                subtitle: {
                                                    display: false
                                                },
                                                tooltip: {
                                                    bodyFont: {
                                                        family: "Poppins"
                                                    },
                                                    titleFont: {
                                                        family: "Poppins"
                                                    },

                                                }
                                            }
                                        }}
                                    />
                                }
                            </div>
                            <div className={styles["card-dashboard"]} id={styles["md"]}>
                                <span className={styles["title-chart"]}>
                                    Agendamentos no Dia Por Categoria
                                </span>
                                {
                                    dadosAgendamentosPorCategoria.length === 0 ?
                                        <div className={styles["sem-dados"]}>
                                            Não há dados para exibir
                                        </div> :
                                        <>
                                            <div className={styles["content-chart"]}>

                                                <div className={styles["grafico-chart"]}>
                                                    <Doughnut
                                                        data={graficoDonut}
                                                        options={{
                                                            plugins: {
                                                                title: {
                                                                    display: false
                                                                },
                                                                legend: {
                                                                    display: false,
                                                                },
                                                                subtitle: {
                                                                    display: false
                                                                },
                                                                tooltip: {
                                                                    boxWidth: 10,
                                                                    position: "average",
                                                                    bodyFont: {
                                                                        family: "Poppins"
                                                                    },
                                                                    titleFont: {
                                                                        family: "Poppins"
                                                                    },
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className={styles["group-porcentagem"]}>
                                                    {dadosAgendamentosPorCategoria.map((categoria, index) => (
                                                        <div key={index} className={styles["label"]} style={{ color: cores[1][index] }}>
                                                            <figure>
                                                                <div className={styles["barrinha-label"]} style={{ backgroundColor: cores[1][index] }} />
                                                            </figure>
                                                            {(categoria.count / (agendamentosTotalDoDia) * 100).toFixed(0).replace(".", ",")}%
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <ul className={styles["group-labels"]}>
                                                {dadosAgendamentosPorCategoria.map((categoria, index) => (
                                                    <li key={index} className={styles["label"]} style={{ color: cores[1][index] }}>
                                                        {categoria.categoria}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                }
                            </div>
                        </div>
                        <div className={styles["group-top3"]}>
                            <div className={styles["card-top3"]}>
                                <CardTop3
                                    legenda={"Top 3 Serviços Mais Utilizados"}
                                    icon={
                                        <IconlyProvider
                                            stroke="bold"
                                            size={"medium"}
                                        >
                                            <Work />
                                        </IconlyProvider>
                                    }
                                    vetor={top3Servicos.map((itemAtual) => {
                                        return itemAtual.servico;
                                    })}
                                />
                            </div>
                            <div className={styles["card-top3"]}>
                                <CardTop3
                                    legenda={"Top 3 Profissionais Mais Agendados"}
                                    icon={
                                        <IconlyProvider
                                            stroke="bold"
                                            size={"medium"}
                                        >
                                            <User />
                                        </IconlyProvider>
                                    }
                                    vetor={top3Profissionais.map((itemAtual) => {
                                        return itemAtual.profissional ? itemAtual.profissional.slice(0, itemAtual.profissional.indexOf(" ") + 2) + "." : "";
                                        // return itemAtual.profissional;
                                    })}
                                />
                            </div>
                            <div className={styles["card-top3"]}>
                                <CardTop3
                                    legenda={"Top 3 Clientes Mais Frequentes"}
                                    icon={
                                        <IconlyProvider
                                            stroke="bold"
                                            size={"medium"}
                                        >
                                            <User />
                                        </IconlyProvider>
                                    }
                                    vetor={top3Clientes.map((itemAtual) => {
                                        return itemAtual.cliente ? itemAtual.cliente.indexOf(" ") !== -1 ? itemAtual.cliente.slice(0, itemAtual.cliente.indexOf(" ") + 2) + "." : itemAtual.cliente : "";
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </section >

        </>
    );
}

export default Dashboard;