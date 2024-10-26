import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Input from "../../components/input/Input";
import { inputSomenteTexto, logado, isVazio, isLengthValid, isValidEmail } from "../../utils/global";
import styles from "./AdicionarFuncionario.module.css";
import Ul from "../../components/ul/Ul";
import SelectInput from "../../components/select-input/SelectInput";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";

const AdicionarFuncionario = () => {

    //const { currentStep, currentComponent, changeStep, isLastStep } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const { idProfissional } = useParams();
    const idUser = sessionStorage.getItem("idUser")
    const idEmpresa = sessionStorage.getItem("idEmpresa")
    const isEditar = location.pathname === `/profissional/editar/${idProfissional}`;
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [optionsStatus] = useState([
        {
            label: "Ativo",
            value: 1
        },
        {
            label: "Inativo",
            value: 0
        }
    ]);
    const [bitStatus, setBitStatus] = useState(optionsStatus[0]);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [empresa, setEmpresa] = useState({});
    const [options] = useState([
        {
            label: "Administrador",
            value: "Administrador"
        },
        {
            label: "Funcionário",
            value: "Funcionário"
        }]);

    // const [tipoPerfil, setTipoPerfil] = useState(options[0])
    const [tipoPerfil, setTipoPerfil] = useState("")
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const [servicosPorFuncionario, setServicosPorFuncionario] = useState([]);
    const [servicosPreco, setServicosPreco] = useState([]);

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get(`/funcionarios/${idUser}`).then((response) => {
            const { data } = response;
            const { empresa } = data;
            setEmpresa(empresa);
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        });

        if (isEditar) {
            api.get(`/funcionarios/${idProfissional}`).then((response) => {
                const { data } = response;
                const { nome, telefone, email, bitStatus, perfilAcesso } = data;
                setNome(nome);
                setTelefone(telefone);
                var tipoStatus = optionsStatus.find(s => s.value === bitStatus)
                setBitStatus(tipoStatus);
                setEmail(email);
                var tipoPerfil = options.find(s => s.label === perfilAcesso)
                setTipoPerfil(tipoPerfil)

            }).catch((error) => {
                console.log("Houve um erro ao buscar o funcionário");
                console.log(error);
            });
        }

        api.get(`/servico-preco/${idEmpresa}`).then((response) => {
            const { data } = response;
            const resposta = data
            setServicosPreco(resposta.length === 0 ? [] : resposta)

            if (isEditar) {
                api.get(`/servico-por-funcionario/${idEmpresa}/funcionario/${idProfissional}`
                ).then((response) => {
                    const { data } = response;
                    setServicosPorFuncionario(data || [])
                    var servicosRealizados = []
                    // Percorrendo a lista de servicos realizados pelo funcionario
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        // resposta do servico preco(todos os servicos cadastrados da empresa) e filtrando apartir do serivco atual 
                        var servicoFuncionario = resposta.find(s => s.nome === element.nomeServico && element.bitStatus === 1)
                        servicosRealizados.push(servicoFuncionario)
                    }
                    setServicosSelecionados(servicosRealizados)


                }).catch((error) => {
                    console.log("Houve um erro ao buscar o serviço");
                    console.log(error);
                });
            }

        }).catch((error) => {
            console.log("Houve um erro ao buscar o serviço");
            console.log(error);
        });


    }, [navigate, isEditar, idProfissional, idUser, idEmpresa, options, optionsStatus]);


    const validarFuncionario = () => {
        if (!isVazio(nome, "Nome")
            && !isVazio(telefone, "Telefone")
            && !isVazio(email, "Email") && isValidEmail(email, "Email")
            && (isEditar || !isVazio(senha, "Senha"))
            && !isVazio(options, "Tipo de Perfil")
            && !isVazio(tipoPerfil, "Tipo de Perfil")
            && !isVazio(servicosSelecionados, "Serviços que realiza")
            && (isEditar || isLengthValid(senha, 6, "Senha"))
        ) {
            return true;
        }

        return false;
    }

    const handleSave = () => {
        var url = isEditar ? `/funcionarios/${idProfissional}` : "/funcionarios"
        var perfil = tipoPerfil.value;
        const objetoAdicionado = {
            nome,
            telefone,
            email,
            senha,
            perfilAcesso: perfil,
            empresa,
            bitStatus: bitStatus.value
        };
        if (validarFuncionario()) {
            if (isEditar) {
                api.put(url, objetoAdicionado).then(() => {
                    for (let index = 0; index < servicosPreco.length; index++) {
                        // Serviço por Funcionário atual
                        var servicoFuncionario = servicosPorFuncionario.find(sp => sp.servicoPrecoId === servicosPreco[index].id);

                        if (servicoFuncionario) {
                            // Variavel utilizada para checar se o serviço atual está selecionado e definir o status
                            var servicoPreco = servicosPreco.find(sp => sp.id === servicoFuncionario.servicoPrecoId);
                            var isSelecionado = servicosSelecionados.includes(servicoPreco) ? 1 : 0;
                            // Se o status do serviço vindo do BD estiver diferente do status atual, então atualiza no BD
                            if (servicoFuncionario.bitStatus !== isSelecionado) {
                                api.patch(`/servico-por-funcionario/${idEmpresa}/${idProfissional}/${servicoFuncionario.id}`).then().catch((error) => {
                                    console.error(error)
                                })
                            }
                        } else {
                            // Filtrando o serviço preço pelo nome do Serviço Por Funcionário atual
                            var servicoAtual = servicosSelecionados.includes(servicosPreco.find(sp => sp.nome === servicosPreco[index].nome));

                            if (servicoAtual) {
                                let servicoAdicionado = {
                                    idFuncionario: idProfissional,
                                    idServicoPreco: servicosPreco[index].id,
                                    dtCriacao: new Date(),
                                    bitStatus: 1
                                }

                                api.post(`/servico-por-funcionario/${idEmpresa}`, servicoAdicionado).then().catch((error) => {
                                     console.error(error)
                                })
                            }
                        }
                    }

                    toast.success("Funcionario atualizado com sucesso!");
                    navigate("/equipe");
                }).catch((error) => {
                    console.error(error)
                    toast.error("Ocorreu um erro ao atualizar os dados, por favor, tente novamente.");
                })

            } else {
                api.post(url, objetoAdicionado).then((response) => {
                    const { data } = response;
                    const { id } = data;

                    for (let index = 0; index < servicosSelecionados.length; index++) {
                        let servicoAdicionado = {
                            idFuncionario: id,
                            idServicoPreco: servicosPreco[index].id,
                            dtCriacao: new Date(),
                            bitStatus: 1
                        }

                        api.post(`/servico-por-funcionario/${idEmpresa}`, servicoAdicionado).then().catch((error) => {
                            console.error(error)
                            toast.error("Ocorreu um erro ao adicionar os dados, por favor, tente novamente.");
                        })
                    }
                    toast.success("Funcionario adicionado com sucesso!");
                    sessionStorage.setItem("editado", JSON.stringify(objetoAdicionado));
                    navigate("/equipe");
                }).catch((error) => {
                    console.error(error)
                    const { code } = error;
                    if (code === "ERR_NETWORK") {
                        toast.error("Ocorreu um erro ao tentar realizar cadastro. Tente novamente mais tarde!");
                    } else {
                        const { response } = error;
                        const { status } = response;

                        if (status === 400) {
                            toast.error("O email informado já foi cadastrado!")
                        }
                    }
                })
            }
        }
    };

    const selecionarServico = (item) => {
        if (servicosSelecionados.includes(item)) {
            setServicosSelecionados(servicosSelecionados.filter(servico => servico !== item));
        } else {
            setServicosSelecionados([...servicosSelecionados, item]);
        }
    };

    return (
        <>
            <section className={styles["section-adicionar-funcionario"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-adicionar-funcionario"]}>
                    <div className={styles["content-adicionar-funcionario"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={isEditar ? "Editar Profissional" : "Adicionar Profissional"} />
                        </div>
                        <div className={styles["informations-adicionar-funcionario"]}>

                            <Input
                                id="nome"
                                tamanho={"lg"}
                                valor={nome}
                                alterarValor={setNome}
                                titulo={"Nome"}
                                validarEntrada={(e) => inputSomenteTexto(e)}
                            />
                            <Input
                                id="telefone"
                                tamanho={"lg"}
                                valor={telefone}
                                alterarValor={setTelefone}
                                titulo={"Telefone"}
                                mascara={"(00) 00000-0000"}
                            />

                            <Input
                                id="email"
                                valor={email}
                                tamanho={"lg"}

                                alterarValor={setEmail}
                                titulo={"Email"}
                            />
                            {isEditar ? "" : <Input
                                id="senha"
                                tamanho={"lg"}
                                valor={senha}
                                alterarValor={setSenha}
                                titulo={"Senha"}
                                type={"password"}
                            />}

                            <div className={styles["group-input"]}>
                                <SelectInput
                                    id={"tipoPerfil"}
                                    tamanho={isEditar ? "md" : "lg"}
                                    options={options}
                                    valor={tipoPerfil}
                                    alterarValor={setTipoPerfil}
                                    titulo={"Tipo de Perfil"}
                                    pesquisavel={false}
                                    criarOption={true}
                                />

                                {/* <div className={styles[isEditar ? "selectInput-status" : "none-selectInput-status"]}> */}
                                <SelectInput exibir={!isEditar || idProfissional === idUser || undefined}
                                    id={"status"}
                                    tamanho={"md"}
                                    options={optionsStatus}
                                    valor={bitStatus}
                                    alterarValor={setBitStatus}
                                    titulo={"Status"}
                                    pesquisavel={false}
                                    criarOption={true}
                                />
                                {/* </div> */}
                            </div>

                            <Ul className={styles["servicos-grid"]}
                                titulo={"Serviços que realiza"}
                                items={servicosPreco}
                                servicosSelecionados={servicosSelecionados}
                                toggleServico={selecionarServico}
                            />
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
                                //(e) => avancar(e)
                                funcaoButton={handleSave}
                                titulo={isEditar ? "Editar" : "Adicionar"}
                                icone={<FaCheck />}
                                cor={"roxo"}
                            />
                        </div>
                    </div>
                </div>
            </section >

        </>
    );
};

export default AdicionarFuncionario;
