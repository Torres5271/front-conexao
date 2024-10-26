import React, { useEffect, useState } from "react";
import styles from "./EditarDiasFuncionamento.module.css"
import Header from "../../components/header/Header";
import api from "../../api";
import Titulo from '../../components/titulo/Titulo';
import Button from "../../components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { logado, transformarHora } from "../../utils/global";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";
import DiaDaSemanaComponente from '../../components/dia-da-semana/DiaDaSemanaComponente';

const EditarDiasFuncionamento = () => {
    const navigate = useNavigate();
    const hora = new Date();
    const { idEmpresa } = useParams();

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

    const [dias, setDias] = useState([]);
    const vetorSetters = [
        [setDiaSegundaAberto, setHorario1Segunda, setHorario2Segunda, diaSegundaAberto, horario1Segunda, horario2Segunda],
        [setDiaTercaAberto, setHorario1Terca, setHorario2Terca, diaTercaAberto, horario1Terca, horario2Terca],
        [setDiaQuartaAberto, setHorario1Quarta, setHorario2Quarta, diaQuartaAberto, horario1Quarta, horario2Quarta],
        [setDiaQuintaAberto, setHorario1Quinta, setHorario2Quinta, diaQuintaAberto, horario1Quinta, horario2Quinta],
        [setDiaSextaAberto, setHorario1Sexta, setHorario2Sexta, diaSextaAberto, horario1Sexta, horario2Sexta],
        [setDiaSabadoAberto, setHorario1Sabado, setHorario2Sabado, diaSabadoAberto, horario1Sabado, horario2Sabado],
        [setDiaDomingoAberto, setHorario1Domingo, setHorario2Domingo, diaDomingoAberto, horario1Domingo, horario2Domingo],
    ];

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get(`/empresas/${idEmpresa}`).then((response) => {
            const { data } = response
            const { horariosFuncionamentos } = data;
        
            const ordemDias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
            const vetorDias = [];

            horariosFuncionamentos.forEach((h) => {
                vetorDias.push({
                    id: h.id,
                    diaSemana: h.diaSemana.replace("-feira", "").replace("-Feira", ""),
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


                let proximoDia = vetorDias[i];
                vetorDias[i] = vetorDias[posicaoTroca];
                vetorDias[posicaoTroca] = proximoDia;
            }

            vetorToSetters(vetorDias);
            setDias(vetorDias);

        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        })
    }, [navigate, idEmpresa]);



    const voltar = () => {
        navigate("/perfil");
    }

    const editar = () => {
        const vetorDias = [
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

        var deuRuim = false;

        for (let i = 0; i < vetorDias.length; i++) {
            let bodyDias = {
                diaSemana: vetorDias[i].diaSemana,
                codDiaSemana: vetorDias[i].codDiaSemana,
                inicio: vetorDias[i].status === 0 ? "00:00:00" : transformarHora(vetorDias[i].inicio),
                fim: vetorDias[i].status === 0 ? "00:00:00" : transformarHora(vetorDias[i].fim),
                status: vetorDias[i].status,
                empresaId: 
                    idEmpresa
                      
            };

            api.put(`/horarios-funcionamento/${dias[i].id}`, bodyDias).then(() => {
            // eslint-disable-next-line no-loop-func
            }).catch((error) => {
                console.log("houve um erro ao tentar cadastrar o horario de funcionamento");
                console.log(error);
                deuRuim = true;
            })
        }

        if (deuRuim) {
            toast.error("Ocorreu um erro ao atualizar os dias de funcionamento");
        } else {
            toast.success("Dias de Funcionamento editados com sucesso!");
            navigate("/perfil")
        }
    }

    const vetorToSetters = (vetor) => {
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


    return (
        <>
            <section className={styles["section-empresa"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-empresa"]}>
                    <div className={styles["content-empresa"]}>
                        <div className={styles["header"]}>
                            <Titulo
                                tamanho={"md"}
                                titulo={"Editar Dias de Funcionamento da Empresa"}
                            />
                        </div>
                        <div className={styles["informations-empresa"]}>
                            <div className={styles["dias-funcionamento"]}>
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
                                                        // funcaoClickSwitch={() => navigate(`/editar-empresa/${idEmpresa}`)}
                                                    />
                                                </div>

                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={styles["group-button"]}>
                            <Button
                                titulo={"Cancelar"}
                                cor={"branco"}
                                funcaoButton={() => voltar()}
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
                                titulo={"Editar"}
                                icone={<FaCheck />}
                                cor={"roxo"}
                                funcaoButton={() => editar()}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default EditarDiasFuncionamento;