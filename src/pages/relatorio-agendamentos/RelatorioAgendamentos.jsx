import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import styles from "./RelatorioAgendamentos.module.css";
import { logado, transformarDataHora } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Table from "../../components/table/Table";
import Input from "../../components/input/Input";
import { Download, IconlyProvider } from "react-iconly";
import { toast } from "react-toastify";

const RelatorioAgendamentos = () => {
    const navigate = useNavigate();
    const idEmpresa = sessionStorage.getItem("idEmpresa");
    const titulos = ["Data Agendamento", "Profissional", "Cliente", "Valor Total", "Serviço", "Status", "Método de Pagamento"]
    const [dados, setDados] = useState([]);
    const [dataSelecionada, setDataSelecionada] = useState(new Date());

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const buscarRelatorio = useCallback((data) => {
        setDataSelecionada(data);
        api.get(`/agendamentos/historico-agendamentos-mes/${idEmpresa}/${data.getMonth() + 1}/${data.getFullYear()}`).then((response) => {
            const { data } = response;
            mapear(data);
        }).catch((error) => {
            console.error("Houve um erro ao buscar serviços");
            console.error(error)
        })
    })

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        buscarRelatorio(dataSelecionada);
        // eslint-disable-next-line no-use-before-define
    }, [buscarRelatorio, idEmpresa, navigate]);

    const mapear = (data) => {
        var dataMapp = [];

        for (let i = 0; i < data.length; i++) {
            var dataAtual = [];
            dataAtual.push(transformarDataHora(data[i].dtHora));
            dataAtual.push(data[i].nomeFuncionario);
            dataAtual.push(data[i].nomeCliente);
            dataAtual.push(`R$ ${data[i].preco.toFixed(2).replace(".", ",")}`);
            dataAtual.push(data[i].nomeServico);
            dataAtual.push(data[i].descricaoStatus);
            dataAtual.push(data[i].metodoPagamento || "-")

            dataMapp.push(dataAtual);
        }

        setDados(dataMapp);
    }

    const gerarRelatorio = () => {
        api.get(`/agendamentos/csv/${idEmpresa}/${dataSelecionada.getMonth() + 1}/${dataSelecionada.getFullYear()}`).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.download = `Relatório de Agendamentos - ${dataSelecionada.getMonth() + 1}-${dataSelecionada.getFullYear()}.csv`;
            link.click();
        }).catch((error) => {
            toast.error("Ocorreu um erro ao gerar relatório de agendamentos.");
            console.error("Houve um erro ao gerar relatório");
            console.error(error)
        })
            
    }

    return (
        <>
            <section className={styles["section-relatorio"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-relatorio"]}>
                    <div className={styles["content-relatorio"]}>
                        <div className={styles["header"]}>
                            <div style={{ display: "flex", columnGap: "1rem", alignItems: "center" }}>
                                <Button
                                    // funcaoButton={() => navigate("/equipe")}
                                    funcaoButton={() => navigate(-1)}
                                    cor="branco"
                                    icone={<FaArrowLeft className={styles["icon-voltar"]} />}
                                />
                                <Titulo tamanho={"md"} titulo={`Relatório de Agendamentos do Mês`} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", columnGap: "0.5rem" }}>
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
                                        isMensal={true}
                                        alterarValor={buscarRelatorio}
                                        cor={"roxo"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles["table-relatorio"]}>
                            {dados.length === 0 ?
                                <div className={styles["sem-relatorio"]}>
                                    Nenhum histórico encontrado
                                </div>
                                :
                                <Table
                                    titulos={titulos}
                                    matriz={dados}

                                    showEditIcon={false}
                                    showDeleteIcon={false}
                                />
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default RelatorioAgendamentos;