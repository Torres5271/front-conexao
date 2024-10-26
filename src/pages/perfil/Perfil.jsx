import React, { useEffect, useState } from "react";
import styles from "./Perfil.module.css"
import Header from "../../components/header/Header";
import api from "../../api";
import Button from "../../components/button/Button";
import {IconlyProvider, Logout } from "react-iconly";
import { useNavigate } from "react-router-dom";
import imgPerfil from "./../../utils/assets/perfil_padrao.svg";
import Row from './../../components/row/Row';
import { isVazio, logado, logoutUsuario, transformarData } from "../../utils/global";
import DiaDaSemanaComponente from './../../components/dia-da-semana/DiaDaSemanaComponente';
import { toast } from "react-toastify";
import ModalTemplate from "../../components/modal-template/ModalTemplate";
import Titulo from './../../components/titulo/Titulo';
import Input from "../../components/input/Input";

const Perfil = () => {
    const navigate = useNavigate();
    const hora = new Date();
    const idUser = sessionStorage.getItem('idUser');
    const idEmpresa = sessionStorage.getItem('idEmpresa');

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dtCriacao, setDtCriacao] = useState("");
    const [intervaloAtendimento, setIntervaloAtendimento] = useState(0)
    const [servicosPrestados, setServicosPrestados] = useState([])
    const [empresa, setEmpresa] = useState({})

    const [razaoSocial, setRazaoSocial] = useState("")
    const [cnpj, setCNPJ] = useState("")
    const [telefonePrincipal, setTelefonePrincipal] = useState("")
    const [emailPrincipal, setEmailPrincipal] = useState("")
    const [endereco, setEndereco] = useState("")


    const [diaSegundaAberto, setDiaSegundaAberto] = useState(true);
    const [horario1Segunda, setHorario1Segunda] = useState(hora)
    const [horario2Segunda, setHorario2Segunda] = useState(hora)

    const [diaTercaAberto, setDiaTercaAberto] = useState(true);
    const [horario1Terca, setHorario1Terca] = useState(hora)
    const [horario2Terca, setHorario2Terca] = useState(hora)

    const [diaQuartaAberto, setDiaQuartaAberto] = useState(true);
    const [horario1Quarta, setHorario1Quarta] = useState(hora)
    const [horario2Quarta, setHorario2Quarta] = useState(hora)

    const [diaQuintaAberto, setDiaQuintaAberto] = useState(true);
    const [horario1Quinta, setHorario1Quinta] = useState(hora)
    const [horario2Quinta, setHorario2Quinta] = useState(hora)

    const [diaSextaAberto, setDiaSextaAberto] = useState(true);
    const [horario1Sexta, setHorario1Sexta] = useState(hora)
    const [horario2Sexta, setHorario2Sexta] = useState(hora)

    const [diaSabadoAberto, setDiaSabadoAberto] = useState(true);
    const [horario1Sabado, setHorario1Sabado] = useState(hora)
    const [horario2Sabado, setHorario2Sabado] = useState(hora)

    const [diaDomingoAberto, setDiaDomingoAberto] = useState(true);
    const [horario1Domingo, setHorario1Domingo] = useState(hora)
    const [horario2Domingo, setHorario2Domingo] = useState(hora)

    const [idEndereco, setIdEndereco] = useState([]);
    const [cep, setCep] = useState([]);
    const [logradouro, setLogradouro] = useState([]);
    const [numero, setNumero] = useState([]);
    const [complemento, setComplemento] = useState([]);
    const [bairro, setBairro] = useState([]);
    const [cidade, setCidade] = useState([]);
    const [uf, setUf] = useState([]);

    const [dias, setDias] = useState([]);
    const vetorSetters = [
        [setDiaSegundaAberto, setHorario1Segunda, setHorario2Segunda, diaSegundaAberto, horario1Segunda, horario2Segunda],
        [setDiaTercaAberto, setHorario1Terca, setHorario2Terca, diaTercaAberto, horario1Terca, horario2Terca],
        [setDiaQuartaAberto, setHorario1Quarta, setHorario2Quarta, diaQuartaAberto, horario1Quarta, horario2Quarta],
        [setDiaQuintaAberto, setHorario1Quinta, setHorario2Quinta, diaQuintaAberto, horario1Quinta, horario2Quinta],
        [setDiaSextaAberto, setHorario1Sexta, setHorario2Sexta, diaSextaAberto, horario1Sexta, horario2Sexta],
        [setDiaSabadoAberto, setHorario1Sabado, setHorario2Sabado, diaSabadoAberto, horario1Sabado, horario2Sabado],
        [setDiaDomingoAberto, setHorario1Domingo, setHorario2Segunda, diaDomingoAberto, horario1Domingo, horario2Domingo],
    ];

    const [secaoPerfil, setSecaoPerfil] = useState(sessionStorage.getItem("sessaoPerfil") || "informacoes-empresa");
    const [modalEditarEnderecoAberto, setModalEditarEnderecoAberto] = useState(false);

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get(`/empresas/${idEmpresa}`).then((response) => {
            const { data } = response
            const { razaoSocial, cnpj, emailPrincipal, telefonePrincipal, horariosFuncionamentos, intervaloAtendimento } = data;

            setRazaoSocial(razaoSocial);
            setCNPJ(cnpj);
            setEmailPrincipal(emailPrincipal);
            setTelefonePrincipal(telefonePrincipal);
            setIntervaloAtendimento(intervaloAtendimento);

            const ordemDias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
            const vetorDias = [];

            horariosFuncionamentos.forEach((h) => {
                vetorDias.push({
                    id: h.id,
                    diaSemana: h.diaSemana.replace("-Feira", "").replace("-feira", ""),
                    fim: h.fim,
                    inicio: h.inicio,
                    aberto: h.status === 0 ? false : true
                })
            });

            for (let i = 0; i < ordemDias.length; i++) {
                let posicaoTroca = i;

                for (let j = i; j < ordemDias.length; j++) {
                    if (vetorDias[j].diaSemana === ordemDias[i]) {
                        posicaoTroca = j;
                    }
                }

                console.log(posicaoTroca);
                let proximoDia = vetorDias[i];
                vetorDias[i] = vetorDias[posicaoTroca];
                vetorDias[posicaoTroca] = proximoDia;
            }

            vetorToSetters(vetorDias);
            setDias(vetorDias);

            console.log(vetorDias)
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        })

        buscarEndereco();

        api.get(`/funcionarios/${idUser}`).then((response) => {
            const { data } = response;
            const { nome, email, telefone, dtCriacao, empresa } = data;

            setNome(nome);
            setEmail(email);
            setTelefone(telefone);
            setDtCriacao(dtCriacao);
            setEmpresa(empresa)
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        }, [])

        api.get(`/servico-por-funcionario/${idEmpresa}/funcionario/${idUser}`).then((response) => {
            const { data } = response;
            setServicosPrestados(data.filter(servicoFuncionario => servicoFuncionario.bitStatus === 1))
            console.log(data)
        }).catch((error) => {
            console.error(error)
        });
        
    }, [idEmpresa, idUser, navigate]);

    const buscarEndereco = () => {
        api.get(`/enderecos/empresa/${idEmpresa}`).then((response) => {
            const { data } = response;
            const { id, cep, logradouro, numero, complemento, bairro, localidade, uf, descricaoEndereco } = data;
            setIdEndereco(id);
            setCep(cep);
            setLogradouro(logradouro);
            setNumero(numero);
            setComplemento(complemento);
            setBairro(bairro);
            setCidade(localidade);
            setUf(uf);
            setEndereco(descricaoEndereco);
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    const navegar = (tipoPagina) => {
        navigate(
            tipoPagina === "usuario" ? `/usuario/editar/${idUser}`
                : tipoPagina === "empresa" ? `/empresa/editar/${idEmpresa}`
                    : `/dias-funcionamento/editar/${idEmpresa}`

        );
    }

    const mudarSecao = (secao) => {
        setSecaoPerfil(secao);
        sessionStorage.setItem("sessaoPerfil", secao)
    }

    const sair = (url) => {
        logoutUsuario();
        sessionStorage.removeItem("sessaoPerfil");
        sessionStorage.removeItem("token");
        navigate(url);
    }

    const abrirModalEditarEndereco = () => {
        setModalEditarEnderecoAberto(!modalEditarEnderecoAberto);
    }

    const buscarCep = () => {
        if (cep.length >= 8) {
            api.post(`/enderecos/address/${cep}`).then((response) => {
                const { data } = response;
                const { logradouro, bairro, localidade, uf } = data;
                setLogradouro(logradouro);
                setBairro(bairro);
                setCidade(localidade);
                setUf(uf);

            }).catch((error) => {
                console.log("Houve um erro ao buscar o CEP");
                console.log(error);
            });
        }
    }

    const editarEndereco = () => {
        if (
            !isVazio(cep) &&
            !isVazio(logradouro) &&
            !isVazio(numero) &&
            !isVazio(bairro) &&
            !isVazio(cidade) &&
            !isVazio(uf)
        ) {
            let body = {
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
                localidade: cidade,
                uf,
                empresa
            }
            api.put(`/enderecos/${idEndereco}`, body).then(() => {
                toast.success("Endereço editado com sucesso!");
                buscarEndereco();
                abrirModalEditarEndereco();
            }).catch((error) => {
                toast.error("Ocorreu um erro ao tentar editar o endereço");
                console.error(error)
            })
        }
    }

    const vetorToSetters = (vetor) => {
        console.log(vetor);
        setDiaSegundaAberto(vetor[0].aberto);
        setHorario1Segunda(vetor[0].inicio)
        setHorario2Segunda(vetor[0].fim)

        setDiaTercaAberto(vetor[1].aberto);
        setHorario1Terca(vetor[1].inicio);
        setHorario2Terca(vetor[1].fim)

        setDiaQuartaAberto(vetor[2].aberto);
        setHorario1Quarta(vetor[2].inicio)
        setHorario2Quarta(vetor[2].fim)

        setDiaQuintaAberto(vetor[3].aberto);
        setHorario1Quinta(vetor[3].inicio)
        setHorario2Quinta(vetor[3].fim)

        setDiaSextaAberto(vetor[4].aberto);
        setHorario1Sexta(vetor[4].inicio)
        setHorario2Sexta(vetor[4].fim)

        setDiaSabadoAberto(vetor[5].aberto);
        setHorario1Sabado(vetor[5].inicio)
        setHorario2Sabado(vetor[5].fim)

        setDiaDomingoAberto(vetor[6].aberto);
        setHorario1Domingo(vetor[6].inicio)
        setHorario2Domingo(vetor[6].fim)
    }

    const corpoModalEditarEndereco = (
        <>
            <Input
                id="cep"
                valor={cep}
                alterarValor={setCep}
                titulo={"CEP"}
                funcao={() => buscarCep()}
                mascara={"00000-000"}
                minlength={9}
                maxlength={9}
            />
            <Input
                id="logradouro"
                valor={logradouro}
                alterarValor={setLogradouro}
                titulo={"Logradouro"}
                minlength={5}
                maxlength={45}
            />
            <div className={styles["group-inputs"]}>
                <div style={{
                    width: "30%"
                }}>
                    <Input
                        id="numeroLogradouro"
                        valor={numero}
                        alterarValor={setNumero}
                        titulo={"Número"}
                        maxlength={9}
                        minlength={1}
                    />
                </div>
                <div style={{
                    width: "67%"
                }}>
                    <Input
                        id="complemento"
                        valor={complemento}
                        alterarValor={setComplemento}
                        titulo={"Complemento"}
                        minlength={0}
                        maxlength={9}
                    />
                </div>
            </div>
            <Input
                id="bairro"
                valor={bairro}
                alterarValor={setBairro}
                titulo={"Bairro"}
                minlength={6}
                maxlength={45}
            />
            <div className={styles["group-inputs"]}>
                <Input
                    id="cidade"
                    valor={cidade}
                    alterarValor={setCidade}
                    titulo={"Cidade"}
                    minlength={5}
                    maxlength={45}
                />
                <div className={styles["uf"]}>
                    <Input
                        id="UF"
                        valor={uf}
                        alterarValor={setUf}
                        titulo={"UF"}
                        minlength={2}
                        maxlength={2}
                    />
                </div>
            </div>
        </>
    )

    return (
        <>
            <section className={styles["section-perfil"]}>
                <div>
                    <Header nomeUser={nome} />
                </div>
                <div className={styles["container-perfil"]}>
                    <div className={styles["content-perfil"]}>
                        <div className={styles["header"]}>
                            <div className={styles["group-button"]}>
                                <Button
                                    cor="branco"
                                    titulo={"Ver Perfil"}
                                    funcaoButton={() => navigate(`/equipe/estatistica/${idUser}`)}
                                    icone={
                                        <IconlyProvider
                                            stroke="bold"
                                            size="small"
                                        >
                                            {/* <Delete /> */}
                                        </IconlyProvider>
                                    }
                                />
                                <Button
                                    funcaoButton={() => sair("/login")}
                                    cor={"roxo"}
                                    titulo={"Sair da conta"}
                                    icone={
                                        <IconlyProvider
                                            stroke="bold"
                                            size="small"
                                        >
                                            <Logout />
                                        </IconlyProvider>
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles["informations-perfil"]}>
                            <div className={styles["photo-perfil"]}>
                                <img
                                    src={imgPerfil}
                                    alt="Foto de perfil do usuário"
                                    className={styles["img-perfil"]}
                                />
                            </div>
                            <div className={styles["group-button"]}>
                                <button
                                    onClick={() => mudarSecao("informacoes-empresa")}
                                    className={
                                        styles[
                                        secaoPerfil === "informacoes-empresa" ?
                                            "roxo" : "sem-fundo"
                                        ]
                                    }
                                >
                                    Informações da Empresa
                                </button>
                                <button
                                    onClick={() => mudarSecao("informacoes-pessoais")}
                                    className={
                                        styles[
                                        secaoPerfil === "informacoes-pessoais" ?
                                            "roxo" : "sem-fundo"
                                        ]
                                    }
                                >
                                    Informações Pessoais
                                </button>
                            </div>{
                                secaoPerfil === "informacoes-empresa" ?
                                    <div className={styles["info-empresa"]}>
                                        <div className={styles["grid-info"]}>

                                            <Row
                                                titulo="Razão Social"
                                                valor={razaoSocial}
                                                funcao={() => navegar("empresa")}
                                            />
                                            <Row
                                                titulo="CNPJ"
                                                valor={cnpj}
                                                funcao={() => navegar("empresa")}
                                            />
                                            <Row
                                                titulo="Email Principal"
                                                valor={emailPrincipal}
                                                funcao={() => navegar("empresa")}
                                            />
                                            <Row
                                                titulo="Telefone Principal"
                                                valor={telefonePrincipal}
                                                funcao={() => navegar("empresa")}
                                            />
                                            <Row
                                                titulo="Endereço"
                                                valor={endereco}
                                                funcao={abrirModalEditarEndereco}
                                            />
                                            <Row
                                                titulo="Intervalo de Atendimentos"
                                                valor={intervaloAtendimento + " minutos"}
                                                funcao={() => navegar("empresa")}
                                            />

                                        </div>
                                        <div className={styles["dias-funcionamento"]}>
                                            <div style={{ width: "100%" }}>
                                                <Titulo titulo={"Dias de Funcionamento"} />
                                            </div>
                                            <div className={styles["card-horarios"]}>
                                                <div className={styles["card-container"]}>
                                                    {
                                                        dias.map((d, index) => (
                                                            <div key={index}>
                                                                <DiaDaSemanaComponente
                                                                    diaSemana={d.diaSemana}
                                                                    setAberto={vetorSetters[index][0]}
                                                                    setHorario1={vetorSetters[index][1]}
                                                                    setHorario2={vetorSetters[index][2]}
                                                                    aberto={vetorSetters[index][3]}
                                                                    horario1={vetorSetters[index][4]}
                                                                    horario2={vetorSetters[index][5]}
                                                                    funcaoClickSwitch={() => navegar("dias-funcionamento")}
                                                                />
                                                            </div>

                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div> :
                                    <div className={styles[""]}>
                                        <div>
                                            <Row
                                                titulo="Nome"
                                                valor={nome}
                                                funcao={() => navegar("usuario")}
                                            />
                                            <Row
                                                titulo="Telefone"
                                                valor={telefone}
                                                funcao={() => navegar("usuario")}
                                            />
                                            <Row
                                                titulo="Email"
                                                valor={email}
                                                funcao={() => navegar("usuario")}
                                            />
                                            <Row
                                                titulo="Serviços Prestados"
                                                valor={servicosPrestados.length === 0 ? "Nenhum" : servicosPrestados.map((s) => s.nomeServico).join(", ").replace(/,([^,]*)$/, ' e$1')}
                                                funcao={() => navegar("usuario")}
                                            />
                                            <Row
                                                titulo="Data de Cadastro"
                                                valor={transformarData(dtCriacao)}
                                                funcao={() => navegar("usuario")}
                                            />
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <ModalTemplate
                tamanho={"lg"}
                aberto={modalEditarEnderecoAberto}
                setAberto={setModalEditarEnderecoAberto}
                funcaoBotaoConfirmar={editarEndereco}
                corpo={corpoModalEditarEndereco}
                titulo={"Editar Endereço"}
                tituloBotaoConfirmar={"Editar"}
            />

        </>
    );
}

export default Perfil;