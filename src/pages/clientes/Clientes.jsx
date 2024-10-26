import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import styles from "./Clientes.module.css";
import { inputTelefone, isValidEmail, isVazio, logado, transformarData, transformarTelefoneCelular } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import Titulo from "../../components/titulo/Titulo";
import Table from "../../components/table/Table";
import ModalTemplate from "../../components/modal-template/ModalTemplate";
import Input from "../../components/input/Input";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import { AddUser, IconlyProvider } from "react-iconly";

const Clientes = () => {
    const navigate = useNavigate();
    const idEmpresa = sessionStorage.getItem("idEmpresa");
    const titulos = ["Nome", "Email", "Telefone", "Cliente Desde", "Último Agendamento", ""]
    const [dados, setDados] = useState([]);
    const [dadosResposta, setDadosResposta] = useState([]);
    const [idCliente, setIdCliente] = useState(0);
    const [nomeCliente, setNomeCliente] = useState("");
    const [sobrenomeCliente, setSobrenomeCliente] = useState("");
    const [emailCliente, setEmailCliente] = useState("");
    const [telefoneCliente, setTelefoneCliente] = useState("");
    const [dataNascimentoCliente, setDataNascimentoCliente] = useState("");

    const corpoModalEditar = (
        <>
            <Input
                id={"nomeCliente"}
                titulo={"Nome"}
                valor={nomeCliente}
                alterarValor={setNomeCliente}
            />
            <Input
                id={"sobrenomeCliente"}
                titulo={"Sobrenome"}
                valor={sobrenomeCliente}
                alterarValor={setSobrenomeCliente}
            />
            <Input
                id={"emailCliente"}
                titulo={"Email (Opcional)"}
                placeholder={"Email"}
                valor={emailCliente}
                alterarValor={setEmailCliente}
            />
            <Input
                id={"telefoneCliente"}
                titulo={"Telefone"}
                valor={telefoneCliente}
                alterarValor={setTelefoneCliente}
                validarEntrada={inputTelefone}
                // mascara={"(00) 00000-0000"}
            />
            {/* <Input
                id={"dataNascimentoCliente"}
                titulo={"Data de Nascimento"}
                valor={dataNascimentoCliente}
                alterarValor={setDataNascimentoCliente}
                type={"date"}
            /> */}
        </>
    )

    const corpoModalExcluir = (
        <>
            <span style={{
                lineHeight: "1.5rem",
                letterSpacing: "-0.03rem"
            }}>
                Você realmente deseja excluir o cliente <b> "{nomeCliente} {sobrenomeCliente}"</b>?
            </span>
        </>
    )

    const [modalAberto, setModalAberto] = useState(false);
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false);

    const abrirModal = () => {
        setModalAberto(!modalAberto);
    }

    const abrirModalExcluir = () => {
        setModalExcluirAberto(!modalExcluirAberto);
    }

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        buscarClientes();

    }, [navigate]);

    const buscarClientes = () => {
        api.get(`/clientes/listar/${idEmpresa}`).then((response) => {
            const { data } = response;
            setDadosResposta(data)
            mapear(data);
            // setDados(data);
        }).catch((error) => {
            console.error(error);
        })
    }

    const mapear = (data) => {
        var dadosMapp = [];

        for (let i = 0; i < data.length; i++) {
            var dataMappAtual = [];
            dataMappAtual.push(data[i].nome + " " + data[i].sobrenome);
            dataMappAtual.push(data[i].email);
            dataMappAtual.push(transformarTelefoneCelular(data[i].telefone));
            dataMappAtual.push(transformarData(data[i].dtCriacao));
            dataMappAtual.push(
                data[i].dtUltimoAgendamento ?
                    transformarData(data[i].dtUltimoAgendamento)
                    : "Não Há Registros"
            );
            // dataMappAtual.push(data[i].dtAgendamento);
            dadosMapp.push(dataMappAtual);
        }

        console.log(dadosMapp)
        setDados(dadosMapp);
    }

    const funcaoEditar = (index) => {
        setIdCliente(dadosResposta[index].id);
        setNomeCliente(dadosResposta[index].nome);
        setSobrenomeCliente(dadosResposta[index].sobrenome);
        setEmailCliente(dadosResposta[index].email);
        setTelefoneCliente(transformarTelefoneCelular(dadosResposta[index].telefone));
        // setDataNascimentoCliente(dadosResposta[index].dtNascimento);
        abrirModal()
    }

    const validarCamposEditar = () => {
        if (!isVazio(nomeCliente, "Nome do Cliente") &&
            !isVazio(sobrenomeCliente, "Sobrenome do Cliente") &&
            (emailCliente === "" || (
                !isVazio(emailCliente, "Email do Cliente") && isValidEmail(emailCliente, "Email do Cliente")
            )) &&
            !isVazio(telefoneCliente, "Telefone do Cliente"))
            // !isVazio(dataNascimentoCliente, "Data de Nascimento do Cliente")
         {
            return true;
        }

        return false
    }


    const editar = () => {
        if (validarCamposEditar()) {
            let body = {
                nome: nomeCliente,
                sobrenome: sobrenomeCliente,
                email: emailCliente,
                telefone: telefoneCliente.replace("(", "").replace(")", "").replace("-", "").replace(" ", ""),
                dtNascimento: dataNascimentoCliente
            }

            api.put(`/clientes/${idEmpresa}/${idCliente}`, body).then(() => {
                limparCampos()
                toast.success("Cliente editado com sucesso!");
                buscarClientes();
                abrirModal()
            }).catch((error) => {
                toast.error("Ocorreu um erro ao tentar editar o cliente.");
                console.error(error)
            })
        }
    }

    const deletar = (index) => {
        setIdCliente(dadosResposta[index].id);
        setNomeCliente(dadosResposta[index].nome);
        setSobrenomeCliente(dadosResposta[index].sobrenome);
        abrirModalExcluir()
    }

    const excluir = () => {
        api.delete(`/clientes/${idEmpresa}/${idCliente}`).then(() => {
            toast.success("Cliente excluído com sucesso!");
            abrirModalExcluir();
            limparCampos()
            buscarClientes()
        }).catch((error) => {
            toast.error("Ocorreu um erro ao tentar excluir o cliente.");
            console.error(error)
        })
    }

    const limparCampos = () => {
        setIdCliente("");
        setNomeCliente("");
        setEmailCliente("");
        setDataNascimentoCliente("");
    }

    const cancelar = () => {
        abrirModal()
        limparCampos()
    }
    
    const cancelarExcluir = () => {
        abrirModalExcluir()
        limparCampos()
    }

    return (
        <>
            <section className={styles["section-clientes"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-clientes"]}>
                    <div className={styles["content-clientes"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={`Clientes`} />
                            <div className={styles["group-button"]}>
                                    {/* <Button
                                        funcaoButton={() => abrirModal()}
                                        cor="roxo"
                                        titulo={"Adicionar"}
                                        icone={<IconlyProvider
                                            stroke="bold"
                                            size="small"
                                        >
                                            <AddUser />
                                        </IconlyProvider>
                                        }
                                    /> */}
                            </div>
                        </div>
                        <div className={styles["table-clientes"]}>
                            {
                                dados.length === 0 ?
                                    <div className={styles["sem-clientes"]}>
                                        Nenhum cliente cadastrado
                                    </div>
                                    :
                                    <Table
                                        titulos={titulos}
                                        matriz={dados}
                                        showEditIcon={true}
                                        showDeleteIcon={true}
                                        funcaoEditar={funcaoEditar}
                                        funcaoDeletar={deletar}
                                    />
                            }
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        position: "absolute"
                    }}
                >
                    <ModalTemplate
                        aberto={modalAberto}
                        setAberto={setModalAberto}
                        corpo={corpoModalEditar}
                        titulo={"Editar Cliente"}
                        tituloBotaoConfirmar={"Editar"}
                        funcaoBotaoCancelar={cancelar}
                        funcaoBotaoConfirmar={editar}
                    />
                    <ModalTemplate
                        aberto={modalExcluirAberto}
                        setAberto={setModalExcluirAberto}
                        corpo={corpoModalExcluir}
                        titulo={"Excluir Cliente"}
                        tituloBotaoConfirmar={"Excluir"}
                        funcaoBotaoCancelar={cancelarExcluir}
                        funcaoBotaoConfirmar={excluir}
                    />
                </div>
            </section>
        </>
    );
}

export default Clientes;