import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import styles from "./MinhaEquipe.module.css";
import { logado } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import { AddUser, IconlyProvider } from "react-iconly";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Table from "../../components/table/Table";
import ModalTemplate from "../../components/modal-template/ModalTemplate";
import { toast } from "react-toastify";
import Pilha from "../../PilhaDesfazerDados";
import { FaUndo } from "react-icons/fa";


const Equipe = () => {
    const navigate = useNavigate();
    const titulos = [/*"",*/ "Nome", "Email", "Perfil", "Status", "Serviços", ""]
    const [pilha, setPilha] = useState(new Pilha())
    const idEmpresa = sessionStorage.getItem("idEmpresa")
    const idUser = sessionStorage.getItem("idUser")
    const [dados, setDados] = useState("");
    const [idprofissional, setIdProfissional] = useState("");
    const [nome, setNome] = useState("");


    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        var pilhaSecundaria = new Pilha()
        pilhaSecundaria.setPilha(sessionStorage.pilha ? JSON.parse(sessionStorage.pilha) : [])
        setPilha(pilhaSecundaria)
        buscarFuncionarios()
    }, [navigate, idEmpresa]);

    const buscarFuncionarios = () => {
        api.get(`/funcionarios/empresa?idEmpresa=${idEmpresa}`)
            .then((response) => {
                const { data } = response;
                const promessasServicos = data.map((funcionario) =>
                    api.get(`/servico-por-funcionario/${idEmpresa}/funcionario/${funcionario.id}`)
                );

                Promise.all(promessasServicos)
                    .then((respostas) => {
                        const dadosAtualizados = data.map((funcionario, index) => {
                            var respostaAtual = respostas[index].data.length === 0 ? [] : respostas[index].data
                            let servicos = respostaAtual.filter(s => s.bitStatus === 1);
                            const servicosFuncionario = respostaAtual.length === 0 ? "" :
                                (
                                    <ul style={{
                                        listStyle: "revert",
                                        textAlign: "left",
                                        rowGap: "0.5rem",
                                        display: "grid",
                                    }}>

                                        {servicos.map((servico) => (
                                            <li key={index}>{servico.nomeServico}</li>
                                        ))}
                                    </ul>
                                )
                            return {
                                ...funcionario,
                                servicos: servicosFuncionario
                            };
                        });
                        setDados(dadosAtualizados);
                    })
                    .catch((error) => {
                        console.error("Houve um erro ao buscar serviços", error);
                    });
            })
            .catch((error) => {
                console.error("Houve um erro ao buscar o funcionário", error);
            });
    };

    const desfazer = () => {
        if (pilha.isEmpty()) {
            toast.warning("Não há nada para desfazer!")
            return;
        } else {
            const id = pilha.pop();
            const funcionarioStatusDto = {
                bitStatus: 1
            };
            api.patch(`/funcionarios/status/${id}`, funcionarioStatusDto)
                .then(() => {
                    buscarFuncionarios()
                })
                .catch((error) => {
                    console.log("Houve um erro ao desfazer a ação");
                    console.log(error);
                });
        }

    };


    const corpoModal = (
        <>
            <span style={{
                lineHeight: "1.5rem",
            }}>
                Você realmente deseja excluir o funcionário <b>"{nome}"</b>?
            </span>
        </>
    )

    const [modalAberto, setModalAberto] = useState(false);

    const abrirModal = () => {
        setModalAberto(!modalAberto);
    }

    const editar = (index) => {
        let idprofissional = dados[index].id;
        navigate(`/profissional/editar/${idprofissional}`);
    }

    const deletar = (index) => {
        var id = dados[index].id;
        var nome = dados[index].nome;

        if (id === Number(idUser)) {
            toast.error("Você não pode excluir a si mesmo!")
        } else {
            setIdProfissional(id)
            setNome(nome)
            abrirModal(nome);
        }
    }

    const acessarEstatisticas = (index) => {
        let idprofissional = dados[index].id;
        navigate(`/equipe/estatistica/${idprofissional}`);
    }

    const excluir = () => {
        const funcionarioStatusDto = {
            bitStatus: 4
        };
        console.log(funcionarioStatusDto)
        api.patch(`/funcionarios/status/${idprofissional}`, funcionarioStatusDto).then(() => {
            toast.success("Funcionário excluído com sucesso!");
            buscarFuncionarios()
            pilha.push(idprofissional)
            sessionStorage.pilha = JSON.stringify(pilha.getPilha())
            setIdProfissional("")
            setNome("")
            abrirModal();
        }).catch((error) => {
            toast.error("Ocorreu um erro ao tentar excluir funcionário!");
            console.error(error);
        })
    }

    return (
        <>
            <section className={styles["section-equipe"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-equipe"]}>
                    <div className={styles["content-equipe"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={"Minha Equipe"} />
                            <div className={styles["group-button"]}>

                                <Button
                                    funcaoButton={desfazer}
                                    cor="branco"
                                    disabled={pilha.isEmpty()}
                                    titulo={"Desfazer Exclusão"}
                                    icone={<FaUndo className={styles["icon-desfazer"]} />}
                                />

                                <Button
                                    funcaoButton={() => navigate("/profissional/adicionar")}
                                    cor="roxo"
                                    titulo={"Adicionar"}
                                    icone={<IconlyProvider
                                        stroke="bold"
                                        size="small"
                                    >
                                        <AddUser />
                                    </IconlyProvider>
                                    }
                                />

                            </div>
                        </div>
                        <div className={styles["table-equipe"]}>
                            {dados.length === 0 ?
                                <div className={styles["sem-funcionarios"]}>
                                    Nenhum funcionário cadastrado
                                </div> : <Table
                                    titulos={titulos}
                                    matriz={dados.map((linha) => {
                                        const status = linha.bitStatus === 1 ? "Ativo" : "Inativo";
                                        return [/*linha.id,*/ linha.nome, linha.email, linha.perfilAcesso, status, linha.servicos]
                                    })}
                                    showEditIcon={true}
                                    showDeleteIcon={true}
                                    funcaoEditar={editar}
                                    funcaoDeletar={deletar}
                                    acessarEstatisticas={acessarEstatisticas}
                                />}

                        </div>
                    </div>
                </div>
            </section>
            <ModalTemplate
                aberto={modalAberto}
                setAberto={setModalAberto}
                funcaoBotaoConfirmar={excluir}
                corpo={corpoModal}
                titulo={"Excluir Profissional"}
                tituloBotaoConfirmar={"Excluir"}
            />
        </>
    );
}

export default Equipe;
