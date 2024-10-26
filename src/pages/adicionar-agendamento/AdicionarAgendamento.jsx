import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Input from "../../components/input/Input";
import { inputSomenteTexto, logado, isVazio, isValidEmail, transformarHora, transformarDataHoraBd, transformarDataBd, isSelected } from "../../utils/global";
import styles from "./AdicionarAgendamento.module.css";
import Ul from "../../components/ul/Ul";
import SelectInput from "../../components/select-input/SelectInput";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import ModalTemplate from "../../components/modal-template/ModalTemplate";
import { toast } from "react-toastify";

const AdicionarAgendamento = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { idAgenda } = useParams();
    const isEditar = location.pathname === `/agenda/editar/${idAgenda}`;
    const [dadosClientes, setDadosClientes] = useState([]);
    const [dadosProfissionais, setDadosProfissionais] = useState([]);

    const idEmpresa = sessionStorage.getItem("idEmpresa");
    const [idCliente, setIdCliente] = useState(0);
    const [idProfissional, setIdProfissional] = useState(0);
    const [idServicoPreco, setIdServicoPreco] = useState(0);
    const [precoServico, setPrecoServico] = useState(0);
    const [bitStatus, setBitStatus] = useState(0);
    const [nomeServico, setNomeServico] = useState("");
    const [cliente, setCliente] = useState(undefined);
    const [clientes, setClientes] = useState([]);
    const [nomeCliente, setNomeCliente] = useState("");
    const [sobrenomeCliente, setSobrenomeCliente] = useState("");
    const [emailCliente, setEmailCliente] = useState("");
    const [telefoneCliente, setTelefoneCliente] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [data, setData] = useState(new Date());
    const [hora, setHora] = useState("");
    const [profissonais, setProfissionais] = useState([]);
    const [Profissional, setProfissional] = useState("")
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        if (isEditar) {
            buscarAgendamento();
        } else {
            buscarClientes(0);
            buscarProfissionais(0);
            buscarServicos(0);
        }

    }, [navigate, idEmpresa, isEditar, idAgenda]);


    const buscarAgendamento = () => {
        api.get(`/agendamentos/${idAgenda}`).then((response) => {
            const { data } = response;
            const { dtHora, horario, funcionarioId, clienteId, servicoPrecoId, nomeServico, status, preco } = data;
            setNomeServico(nomeServico);
            setData(dtHora);
            setHora(horario);
            setIdCliente(clienteId);
            setIdProfissional(funcionarioId);
            setIdServicoPreco(servicoPrecoId);
            setBitStatus(status);
            setPrecoServico(preco);
            buscarClientes(clienteId || 0);
            buscarProfissionais(funcionarioId || 0);
            buscarServicos(servicoPrecoId || 0);
        }).catch((error) => {
            console.log("Houve um erro ao buscar um agendamento");
            console.log(error);
        });

    }

    const buscarServicos = (id) =>{
        api.get(`/servico-preco/${idEmpresa}`).then((response) => {
            const { data } = response;
            setServicos(data.length === 0 ? [] : data)
        
            if (isEditar) { 
                toggleServico(data.find(s => s.id === id))
            }

        }).catch((error) => {
            console.log("Houve um erro ao buscar o serviço");
            console.log(error);
        });

    }

    const buscarProfissionais = (index) => {
        api.get(`/funcionarios/empresa?idEmpresa=${idEmpresa}`).then((response) => {
            const { data } = response;
            
            if (isEditar) {
                index = data.findIndex(p => p.id === idProfissional);
            }

            mapear(data, index || 0, "profissional")
            setDadosProfissionais(data)
        }).catch((error) => {
            console.log("Houve um erro ao buscar um funcionario");
            console.log(error);
        });
    }


    const validarAgenda = () => {
        if (
            isSelected(cliente, "Cliente") &&
            isSelected(Profissional, "profissional") &&
            !isVazio(servicosSelecionados, "Serviços") &&
            !isVazio(data, "Data do Agendamento"),
            !isVazio(hora, "Hora do Agendamento")
        ) {
            return true;
        }

        return false;
    };

    const toggleServico = (item) => {
        if (servicosSelecionados.includes(item)) {
            setServicosSelecionados(servicosSelecionados.filter(servico => servico !== item));
        } else {
            setServicosSelecionados([item]);
        }
    };


    const corpoModal = (
        <>
            <Input
                id={"nomeCliente"}
                titulo={"Nome"}
                valor={nomeCliente}
                alterarValor={setNomeCliente}
                maxlength={40}
                minlength={3}
                validarEntrada={inputSomenteTexto}
            />

            <Input
                id={"sobrenomeCliente"}
                titulo={"Sobrenome"}
                valor={sobrenomeCliente}
                alterarValor={setSobrenomeCliente}
                maxlength={40}
                minlength={3}
                validarEntrada={inputSomenteTexto}
            />
            <Input
                id={"emailCliente"}
                titulo={"Email (opcional)"}
                placeholder={"Email"}
                valor={emailCliente}
                alterarValor={setEmailCliente}
                maxlength={60}
                minlength={3}
            />
            <Input
                id={"telefoneCliente"}
                titulo={"Telefone"}
                valor={telefoneCliente}
                alterarValor={setTelefoneCliente}
                mascara={"(00) 00000-0000"}
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

    const abrirModal = (value) => {
        setModalAberto(!modalAberto);
        setNomeCliente(value)
    }

    const validarCadastroCliente = () => {
        if (!isVazio(nomeCliente, "Nome do Cliente") &&
            !isVazio(sobrenomeCliente, "Sobrenome do Cliente") &&
            (emailCliente === "" || (
                !isVazio(emailCliente, "Email do Cliente") && isValidEmail(emailCliente, "Email do Cliente")
            )) &&
            !isVazio(telefoneCliente, "Telefone do Cliente")
            // && !isVazio(dataNascimentoCliente, "Data de Nascimento do Cliente")
        ) {
            return true;
        }

        return false
    }

    const adicionarCliente = () => {
        if (validarCadastroCliente()) {
            let body = {
                nome: nomeCliente,
                sobrenome: sobrenomeCliente,
                telefone: telefoneCliente.replace("(", "").replace(")", "").replace(" ", "").replace("-", ""),
                email: emailCliente,
                empresaId: idEmpresa,
                // "dtNascimento": dataNascimentoCliente
            }

            api.post("/clientes", body).then(() => {
                setNomeCliente("");
                setSobrenomeCliente("");
                setEmailCliente("");
                setTelefoneCliente("");
                // setDataNascimentoCliente("");
                toast.success("Cliente adicionado com sucesso!");
                abrirModal();
                buscarClientes(dadosClientes.length)
            }).catch((error) => {
                toast.error("Houve um erro ao tentar adicionar cliente");
                console.error("Houve um erro ao tentar adicionar cliente!");
                console.error(error)
            })

        }
    }

    const buscarClientes = (index) => {
        api.get(`/clientes/listar/${idEmpresa}`).then((response) => {
            const { data } = response;

            if (isEditar) {
                index = data.findIndex(c => c.id === idCliente);
            }

            mapear(data, index, "cliente");
            setDadosClientes(data)
        }).catch((error) => {
            console.log("Houve um erro ao buscar clientes");
            console.log(error);
        });
    }

    const mapear = (data, index, nomeVetor) => {
        var dataMapp = [];

        if (nomeVetor === "cliente") {
            dataMapp.push({
                label: "Criar um Cliente",
                value: "Criar"
            })
        }

        let i = 0;

        for (i = 0; i < data.length; i++) {
            let nomeCompleto = `${data[i].nome}${data[i].sobrenome ? " " + data[i].sobrenome : ""}`;
            dataMapp.push({
                id: data[i].id,
                index: i,
                label: nomeCompleto,
                value: nomeCompleto,
            })
        }

        i = index === 0 ? index - 1 : index === clientes.length || index === dadosClientes.length ? index + 1 : index;

        if (nomeVetor === "cliente") {
            setClientes(dataMapp);
            setCliente(dataMapp[i]);
        } else {
            setProfissionais(dataMapp);
            setProfissional(dataMapp[i]);
        }
    }

    const handleSave = () => {
        if (isEditar) {
            if (idCliente || isSelected(cliente, "Cliente") &&
                idProfissional || isSelected(Profissional, "profissional") &&
                !isVazio(servicosSelecionados, "Serviços que realiza") &&
                !isVazio(data, "Data do Agendamento") && 
                !isVazio(hora, "Hora do Agendamento")) {
                let AgendaAdicionado = {
                    dtHora: transformarDataHoraBd(data, hora),
                    dia: transformarDataBd(data),
                    horario: transformarHora(hora),
                    bitStatus: bitStatus,
                    fkCliente: cliente ? dadosClientes[cliente.index].id : idCliente,
                    fkFuncionario: Profissional ? dadosProfissionais[Profissional.index].id : idProfissional ,
                    fkServicoPreco: servicosSelecionados[0].id
                }

                api.put(`/agendamentos/${idAgenda}`, AgendaAdicionado).then(() => {
                    toast.success("Agendamento atualizado com sucesso!");
                    navigate("/agenda");
                }).catch((error) => {
                    console.error(error)
                    toast.error("Ocorreu um erro ao atualizar os dados, por favor, tente novamente.");
                })
            }
        } else {
            if (  isSelected(cliente, "Cliente") &&
            isSelected(Profissional, "profissional") &&
            !isVazio(servicosSelecionados, "Serviços") &&
            !isVazio(data, "Data do Agendamento"),
            !isVazio(hora, "Hora do Agendamento")) {
                //let dataHora = dataAgenda + "T" + hora;
                let AgendaAdicionado = {
                    dtHora: transformarDataHoraBd(data, hora),
                    dia: transformarDataBd(data),
                    horario: transformarHora(hora),
                    bitStatus: 1,
                    cliente: dadosClientes[cliente.index],
                    funcionario: dadosProfissionais[Profissional.index],
                    servicoPreco: servicosSelecionados[0]
                }

                api.post(`/agendamentos/${Profissional.id}/${cliente.id}/${servicosSelecionados[0].id}`, AgendaAdicionado).then((response) => {
                    console.log(response)
                    toast.success("Agendamento adicionado com sucesso!");
                    navigate("/agenda");
                }).catch((error) => {
                    console.error(error)
                    toast.error("Ocorreu um erro ao adicionar os dados, por favor, tente novamente.");
                })
            }

        }
    };


    return (
        <>
            <section className={styles["section-adicionar-agenda"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-adicionar-agenda"]}>
                    <div className={styles["content-adicionar-agenda"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={isEditar ? "Editar Agendamento" : "Adicionar Agendamento"} />
                        </div>
                        <div className={styles["informations-adicionar-agenda"]}>

                            <SelectInput
                                id="cliente"
                                valor={cliente || clientes.find(c => c.id === idCliente)}
                                alterarValor={setCliente}
                                titulo={"Cliente"}
                                options={clientes}
                                funcaoAdicionar={abrirModal}

                            />

                            <Ul className={styles["servicos-grid"]}
                                titulo={"Serviço"}
                                items={servicos}
                                servicosSelecionados={servicosSelecionados}
                                toggleServico={toggleServico}
                                nomeCampo={undefined}
                            />
                            <SelectInput
                                id={"profissional"}
                                tamanho={"lg"}
                                options={profissonais}
                                valor={Profissional || profissonais.find(p => p.id === idProfissional)}
                                alterarValor={setProfissional}
                                titulo={"Profissional"}


                            />
                            <div className={styles["group-input"]}>
                                <Input
                                    id="data"
                                    valor={data}
                                    type={"date"}
                                    alterarValor={setData}
                                    titulo={"Data"}
                                    tamanho={"lg"}

                                />
                                <Input
                                    id="hora"
                                    valor={hora}
                                    type={"time"}
                                    alterarValor={setHora}
                                    titulo={"Hora"}
                                    tamanho={"lg"}
                                />
                            </div>
                            <div className={styles["valor-total"]}>
                                Valor Total:
                                <span>
                                    R$
                                    {
                                        servicosSelecionados.length === 0 ?
                                            "0,00"
                                            : servicosSelecionados[0].preco.toFixed(2).replace(".", ",")}

                                </span>
                            </div>
                        </div>

                        <div className={styles["group-button"]}>
                            <Button
                                funcaoButton={() => navigate(-1)}
                                titulo={"Cancelar"}
                                cor={"branco"}
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
                                funcaoButton={() => handleSave()}
                                titulo={isEditar ? "Editar" : "Adicionar"}
                                icone={<FaCheck />}
                                cor={"roxo"}
                            />
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
                        corpo={corpoModal}
                        titulo={"Adicionar Cliente"}
                        tituloBotaoConfirmar={"Adicionar"}
                        funcaoBotaoConfirmar={adicionarCliente}
                    />
                </div>
            </section>

        </>
    );
};

export default AdicionarAgendamento;
