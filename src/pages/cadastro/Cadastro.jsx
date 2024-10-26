import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import Button from "../../components/button/Button";
import styles from "./Cadastro.module.css"
import { HiOutlineArrowLeft } from "react-icons/hi";
import Imagem from "../../utils/assets/cadastro.svg";
import Logo from "../../components/logo/Logo";
import CadastroEtapa1 from "../../components/cadastro-etapa-1/CadastroEtapa1";
import CadastroEtapa2 from "../../components/cadastro-etapa-2/CadastroEtapa2";
import CadastroEtapa3 from "../../components/cadastro-etapa-3/CadastroEtapa3";
import CadastroEtapa4 from "../../components/cadastro-etapa-4/CadastroEtapa4";
import { isVazio, aberturaMaiorFechamento, transformarHora, isValidEmail, isLengthValid } from "../../utils/global";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import Titulo from './../../components/titulo/Titulo';

const Cadastro = () => {
    const hora = new Date();
    const [razaoSocial, setRazaoSocial] = useState("")
    const [cnpj, setCNPJ] = useState("")
    const [telefonePrincipal, setTelefonePrincipal] = useState("")
    const [emailPrincipal, setEmailPrincipal] = useState("")
    const [intervaloAtendimento, setIntervaloAtendimento] = useState("")

    const [cep, setCep] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [uf, setUF] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")

    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

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

    const formComponents = [<CadastroEtapa1
        RazaoSocial={razaoSocial}
        setRazaoSocial={setRazaoSocial}

        CNPJ={cnpj}
        setCNPJ={setCNPJ}

        TelefoneDaEmpresa={telefonePrincipal}
        setTelefoneDaEmpresa={setTelefonePrincipal}

        EmailDaEmpresa={emailPrincipal}
        setEmailDaEmpresa={setEmailPrincipal}

        IntervaloAtendimento={intervaloAtendimento}
        setIntervaloAtendimento = { setIntervaloAtendimento }
    />, <CadastroEtapa2
        Cep={cep}
        setCep={setCep}

        Logradouro={logradouro}
        setLogradouro={setLogradouro}

        Bairro={bairro}
        setBairro={setBairro}

        Cidade={cidade}
        setCidade={setCidade}

        UF={uf}
        setUF={setUF}

        Numero={numero}
        setNumero={setNumero}

        Complemento={complemento}
        setComplemento={setComplemento}
    />,
    <CadastroEtapa3
        diaSegundaAberto={diaSegundaAberto}
        setDiaSegundaAberto={setDiaSegundaAberto}
        horario1Segunda={horario1Segunda}
        setHorario1Segunda={setHorario1Segunda}
        horario2Segunda={horario2Segunda}
        setHorario2Segunda={setHorario2Segunda}

        diaTercaAberto={diaTercaAberto}
        setDiaTercaAberto={setDiaTercaAberto}
        horario1Terca={horario1Terca}
        setHorario1Terca={setHorario1Terca}
        horario2Terca={horario2Terca}
        setHorario2Terca={setHorario2Terca}

        diaQuartaAberto={diaQuartaAberto}
        setDiaQuartaAberto={setDiaQuartaAberto}
        horario1Quarta={horario1Quarta}
        setHorario1Quarta={setHorario1Quarta}
        horario2Quarta={horario2Quarta}
        setHorario2Quarta={setHorario2Quarta}

        diaQuintaAberto={diaQuintaAberto}
        setDiaQuintaAberto={setDiaQuintaAberto}
        horario1Quinta={horario1Quinta}
        setHorario1Quinta={setHorario1Quinta}
        horario2Quinta={horario2Quinta}
        setHorario2Quinta={setHorario2Quinta}

        diaSextaAberto={diaSextaAberto}
        setDiaSextaAberto={setDiaSextaAberto}
        horario1Sexta={horario1Sexta}
        setHorario1Sexta={setHorario1Sexta}
        horario2Sexta={horario2Sexta}
        setHorario2Sexta={setHorario2Sexta}

        diaSabadoAberto={diaSabadoAberto}
        setDiaSabadoAberto={setDiaSabadoAberto}
        horario1Sabado={horario1Sabado}
        setHorario1Sabado={setHorario1Sabado}
        horario2Sabado={horario2Sabado}
        setHorario2Sabado={setHorario2Sabado}

        diaDomingoAberto={diaDomingoAberto}
        setDiaDomingoAberto={setDiaDomingoAberto}
        horario1Domingo={horario1Domingo}
        setHorario1Domingo={setHorario1Domingo}
        horario2Domingo={horario2Domingo}
        setHorario2Domingo={setHorario2Domingo}

    />, <CadastroEtapa4
        Nome={nome}
        setNome={setNome}

        Telefone={telefone}
        setTelefone={setTelefone}

        Email={email}
        setEmail={setEmail}

        Senha={senha}
        setSenha={setSenha}
    />]


    const { currentStep, currentComponent, changeStep, isLastStep } = useForm(formComponents)

    const navigate = useNavigate()

    const validarCadastro1 = () => {
        // validarCnpj();
        if (
            !isVazio(razaoSocial, "Razão Social") &&
            !isVazio(cnpj, "CNPJ") &&
            !isVazio(telefonePrincipal, "Telefone da Empresa") &&
            !isVazio(emailPrincipal, "Email da Empresa") &&
            !isVazio(intervaloAtendimento, "Intervalo entre Atendimentos") && 
            isValidEmail(emailPrincipal, "Email da Empresa")
        ) {
            return true
        }

        return false
    }

    const validarCadastro2 = () => {
        if (!isVazio(cep, "CEP")
            && !isVazio(logradouro, "Logradouro")
            && !isVazio(bairro, "Bairro")
            && !isVazio(cidade, "Cidade")
            && !isVazio(uf, "UF")
            && !isVazio(numero, "Número")
        ) {
            return true;
        }

        return false;

    }

    const validarCadastro3 = () => {
        if (
            !isVazio(horario1Segunda, "Horário de Abertura Segunda ")
            && !isVazio(horario2Segunda, "Horário de Fechamento Segunda")
            && !aberturaMaiorFechamento(horario1Segunda, horario2Segunda)
            && !isVazio(horario1Terca, "Horário de Abertura Terça")
            && !isVazio(horario2Terca, "Horário de Fechamento Terça")
            && !aberturaMaiorFechamento(horario1Terca, horario2Terca)
            && !isVazio(horario1Quarta, "Horário de Abertura Quarta")
            && !isVazio(horario2Quarta, "Horário de Fechamento Quarta")
            && !aberturaMaiorFechamento(horario1Quarta, horario2Quarta)
            && !isVazio(horario1Quinta, "Horário de Abertura Quinta")
            && !isVazio(horario2Quinta, "Horário de Fechamento Quinta")
            && !aberturaMaiorFechamento(horario1Quinta, horario2Quinta)
            && !isVazio(horario1Sexta, "Horário de Abertura Sexta")
            && !isVazio(horario2Sexta, "Horário de Fechamento Sexta")
            && !aberturaMaiorFechamento(horario1Sexta, horario2Sexta)
            && !isVazio(horario1Sabado, "Horário de Abertura Sábado")
            && !isVazio(horario2Sabado, "Horário de Fechamento Sábado")
            && !aberturaMaiorFechamento(horario1Sabado, horario2Sabado)
            && !isVazio(horario1Domingo, "Horário de Abertura Domingo")
            && !isVazio(horario2Domingo, "Horário de Fechamento Domingo")
            && !aberturaMaiorFechamento(horario1Domingo, horario2Domingo)
        ) {
            return true;
        }

        return false;
    }

    const validarCadastro4 = (e) => {
        if (!isVazio(nome, "Nome")
            && !isVazio(telefone, "Telefone")
            && !isVazio(email, "Email")
            && !isVazio(senha, "Senha") &&
            isValidEmail(email, "Email") &&
            isLengthValid(e, "Senha") 

        ) {
            return true;
        }

        return false;
    }

    const cadastrar = () => {

        let body = {
            razaoSocial,
            cnpj,
            telefonePrincipal,
            emailPrincipal,
            intervaloAtendimento
        }

        api.post("/empresas", body).then((response) => {
            const { data } = response;
            const { id } = data;
            const bodyEndereco = {
                cep,
                numero,
                complemento
            }
            api.post(`/enderecos/${id}`, bodyEndereco).then().catch((error) => {
                toast.error("Houve um erro ao tentar cadastrar o endereço")
            });

            const dias = [
                {
                    codDiaSemana: 1,
                    diaSemana: "Segunda-feira",
                    inicio: horario1Segunda,
                    fim: horario2Segunda,
                    status: diaSegundaAberto ? 1 : 0
                },
                {
                    codDiaSemana: 2,
                    diaSemana: "Terça-feira",
                    inicio: horario1Terca,
                    fim: horario2Terca,
                    status: diaTercaAberto ? 1 : 0
                    ,
                },
                {
                    codDiaSemana: 3,
                    diaSemana: "Quarta-feira",
                    inicio: horario1Quarta,
                    fim: horario2Quarta,
                    status: diaQuartaAberto ? 1 : 0
                },
                {
                    codDiaSemana: 4,
                    diaSemana: "Quinta-feira",
                    inicio: horario1Quinta,
                    fim: horario2Quinta,
                    status: diaQuintaAberto ? 1 : 0
                },
                {
                    codDiaSemana: 5,
                    diaSemana: "Sexta-feira",
                    inicio: horario1Sexta,
                    fim: horario2Sexta,
                    status: diaSextaAberto ? 1 : 0
                    ,
                },
                {
                    codDiaSemana: 6,
                    diaSemana: "Sábado",
                    inicio: horario1Sabado,
                    fim: horario2Sabado,
                    status: diaSabadoAberto ? 1 : 0
                },
                {
                    codDiaSemana: 7,
                    diaSemana: "Domingo",
                    inicio: horario1Domingo,
                    fim: horario2Domingo,
                    status: diaDomingoAberto ? 1 : 0
                }
            ];

            for (let i = 0; i < dias.length; i++) {
                let bodyDias = {
                    diaSemana: dias[i].diaSemana,
                    codDiaSemana: dias[i].codDiaSemana,
                    inicio: dias[i].status === 0 ? "00:00:00" : transformarHora(dias[i].inicio),
                    fim: dias[i].status === 0 ? "00:00:00" : transformarHora(dias[i].fim),
                    status: dias[i].status,
                    empresaId: id
                };

                api.post("/horarios-funcionamento", bodyDias).then().catch((error) => {
                    console.log("houve um erro ao tentar cadastrar o horario de funcionamento");
                    toast.error("Houve um erro ao tentar cadastrar o horario de funcionamento dia:" + bodyDias.diaSemana);
                    console.log(error);
                })
            }

            let bodyFuncionario = {
                nome,
                telefone,
                email,
                senha,
                perfilAcesso: "Administrador",
                "empresa": {
                    id,
                    razaoSocial,
                    cnpj,
                    telefonePrincipal,
                    emailPrincipal,
                    intervaloAtendimento
                }
            }

            api.post("/funcionarios", bodyFuncionario).then((response) => {
                toast.success("Cadastro realizado com sucesso!");
                navigate("/login");
                sessionStorage.removeItem("currentStep");
            }).catch((error) => {
                toast.error("Houve um erro ao tentar cadatrar funcionario")
                console.error(error)
            });

        }).catch((error) => {
            console.log(error);
            const { code } = error;

            if (code === "ERR_NETWORK") {
                toast.error("Houve um erro ao tentar realizar cadastro. Tente novamente mais tarde!");
            } else {
                const { response } = error;
                const { status } = response;

                if (status === 400) {
                    toast.error("O CNPJ informado, já foi cadastrado!")
                }
            }

        });

    }

    const validacoes = [validarCadastro1, validarCadastro2, validarCadastro3, validarCadastro4];

    const avancar = (e) => {
        if (validacoes[currentStep]()) {
            changeStep(Number(currentStep) + 1, e)
        }
    }

    return (
        <>
            <div className={styles["tela-cadastro"]}>
                <div className={styles["container-imagem-cadastro"]}>
                    <div className={styles["logo-cadastro"]}><Logo /></div>
                    <img className={styles["imagem-cadastro"]} src={Imagem} alt="imagem cadastro" />
                </div>
                <div className={styles["formulario-cadastro"]}>
                    <div className={styles["engloba-formulario"]}>
                        <div className={styles["texto"]}>
                            <Titulo titulo={"Cadastro"} tamanho={"md"}/>
                            <p className={styles["text"]}>Informe {currentStep === 2 ? "os dias" : currentStep === 1 ? "a localidade" : "os dados"} da <b>{currentStep < 2 ? "empresa" : currentStep === 2 ? "funcionamento" : "usuário"}</b> para começar a realizar os agendamentos.</p>
                        </div>
                        <div className={styles["inputs-container"]}>
                            <div className={styles["form"]}>
                                {currentComponent}
                            </div>
                            <div className={styles["container-buttons"]}>
                                <Button funcaoButton={() => changeStep(currentStep - 1, null)} titulo="Voltar" cor={"branco"} icone={<HiOutlineArrowLeft />}></Button>
                                {!isLastStep ?
                                    <Button
                                        funcaoButton={(e) => avancar(e)}
                                        titulo="Avançar"
                                        cor={"roxo"}
                                    /> :
                                    <Button
                                        funcaoButton={() => cadastrar()}
                                        titulo="Cadastrar"
                                        cor={"roxo"}
                                    />}
                            </div>
                        </div>

                        <div className={styles["text-entrar"]}>
                            <span>Já possui uma conta? <b className={styles["link-entrar"]} onClick={() => navigate("/login")}>Entrar</b></span>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}


export default Cadastro;