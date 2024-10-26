import React from 'react';
import styles from "./AgendaDoDia.module.css";
import { Tooltip } from 'react-tooltip'
import ReactDOMServer from 'react-dom/server';
import CardAgendamento from "../../components/card-agendamento/CardAgendamento";

const AgendaDoDia = ({ agenda, buscarInfoAgenda, nomeFuncionario, dataHora, nomeServico, precoServico, ident, cancelar }) => {

    return (
        <>
            <div className={styles["container-table"]}>
                <table className={styles["table"]}>
                    <tbody className={styles["body-table"]}>
                        {agenda.map((linha, i) => (

                            <tr className={styles["linhas"]} key={i}>

                                {linha.map((coluna, j) => (

                                    (i === 0 && j === 0) &&
                                    <th className={styles["classe-th"]} key={j}>
                                        <div className={styles["td-div"]}>
                                            <span className={styles["dia-titulo"]}></span>
                                        </div>
                                    </th>

                                    || (i === 0 && j > 0) &&
                                    <th id={styles["th-funcionario"]} className={styles["classe-th"]} key={j}>
                                        <div className={["td-div"]}>
                                            <span className={["dia-titulo"]}>{coluna}</span>
                                        </div>
                                    </th>

                                    || (i > 0 && j === 0) &&
                                    <td className={styles["classe-td-borda"]} key={j}>
                                        <div className={styles["td-div"]}>
                                            <span className={styles["hora"]}>{coluna}</span>
                                        </div>
                                    </td>

                                    || (i > 0 && j > 0) &&
                                    <td className={styles["classe-td"]} key={j}>
                                        <div className={styles["td-div"]} >
                                            {
                                                coluna ?
                                                    <span 
                                                        className={styles["span-servico"]}
                                                        onMouseEnter={() => { buscarInfoAgenda(coluna[1])}}
                                                        data-tooltip-id="my-tooltip">
                                                            {coluna[0]}
                                                    </span>
                                                    :
                                                    <span>
                                                    </span>
                                            }
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))
                        }

                    </tbody>
                </table>
            </div>
        </>

    );
};

export default AgendaDoDia;