import React from "react";
import styles from "./CadastroEtapa3.module.css"
import DiaDaSemanaComponente from "../dia-da-semana/DiaDaSemanaComponente"

const CadastroEtapa3 = ({
  diaSegundaAberto, setDiaSegundaAberto,
  horario1Segunda, setHorario1Segunda,
  horario2Segunda, setHorario2Segunda,
  diaTercaAberto, setDiaTercaAberto,
  horario1Terca, setHorario1Terca,
  horario2Terca, setHorario2Terca,
  diaQuartaAberto, setDiaQuartaAberto,
  horario1Quarta, setHorario1Quarta,
  horario2Quarta, setHorario2Quarta,
  diaQuintaAberto, setDiaQuintaAberto,
  horario1Quinta, setHorario1Quinta,
  horario2Quinta, setHorario2Quinta,
  diaSextaAberto, setDiaSextaAberto,
  horario1Sexta, setHorario1Sexta,
  horario2Sexta, setHorario2Sexta,
  diaSabadoAberto, setDiaSabadoAberto,
  horario1Sabado, setHorario1Sabado,
  horario2Sabado, setHorario2Sabado,
  diaDomingoAberto, setDiaDomingoAberto,
  horario1Domingo, setHorario1Domingo,
  horario2Domingo, setHorario2Domingo,

}) => {
  return (
    <div className={styles["tela-cadastro"]}>
      <div className={styles["container-cadastro"]}>
        <div className={styles["text"]}>
          <DiaDaSemanaComponente
            horario1={horario1Segunda}
            horario2={horario2Segunda}
            setHorario1={setHorario1Segunda}
            setHorario2={setHorario2Segunda}
            aberto={diaSegundaAberto}
            setAberto={setDiaSegundaAberto}
            diaSemana="Segunda" />
          <DiaDaSemanaComponente
            horario1={horario1Terca}
            horario2={horario2Terca}
            setHorario1={setHorario1Terca}
            setHorario2={setHorario2Terca}
            aberto={diaTercaAberto}
            setAberto={setDiaTercaAberto}
            diaSemana="Terça" />
          <DiaDaSemanaComponente
            horario1={horario1Quarta}
            horario2={horario2Quarta}
            setHorario1={setHorario1Quarta}
            setHorario2={setHorario2Quarta}
            aberto={diaQuartaAberto}
            setAberto={setDiaQuartaAberto}
            diaSemana="Quarta" />
          <DiaDaSemanaComponente
            horario1={horario1Quinta}
            horario2={horario2Quinta}
            setHorario1={setHorario1Quinta}
            setHorario2={setHorario2Quinta}
            aberto={diaQuintaAberto}
            setAberto={setDiaQuintaAberto}
            diaSemana="Quinta" />
          <DiaDaSemanaComponente
            horario1={horario1Sexta}
            horario2={horario2Sexta}
            setHorario1={setHorario1Sexta}
            setHorario2={setHorario2Sexta}
            aberto={diaSextaAberto}
            setAberto={setDiaSextaAberto}
            diaSemana="Sexta" />
          <DiaDaSemanaComponente
            horario1={horario1Sabado}
            horario2={horario2Sabado}
            setHorario1={setHorario1Sabado}
            setHorario2={setHorario2Sabado}
            aberto={diaSabadoAberto}
            setAberto={setDiaSabadoAberto}
            diaSemana="Sábado" />
          <DiaDaSemanaComponente
            horario1={horario1Domingo}
            horario2={horario2Domingo}
            setHorario1={setHorario1Domingo}
            setHorario2={setHorario2Domingo}
            aberto={diaDomingoAberto}
            setAberto={setDiaDomingoAberto}
            diaSemana="Domingo" />
        </div>
      </div>
    </div>
  );
}

export default CadastroEtapa3;
