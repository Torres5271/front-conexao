import React from "react";
import styles from "./Table.module.css";
import { Delete, Edit, IconlyProvider } from "react-iconly";

const Table = ({ titulos, matriz, showEditIcon, showDeleteIcon, funcaoEditar, funcaoDeletar, acessarEstatisticas }) => {
    return (
        <>
            <div className={styles["container-table"]}>
                <table className={styles["table"]}>
                    <thead className={styles["header-table"]}>
                        <tr>
                            {
                                titulos.map((titulo, index) => (
                                    <th scope="col" key={index}>
                                        <span>
                                            {titulo}
                                        </span>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className={styles["body-table"]}>
                        {
                            matriz.map((coluna, indiceLinha) => (
                                <tr className={styles[indiceLinha % 2 === 0 ? "branco" : "roxo"]} key={indiceLinha}>
                                    {coluna.map((dado, indiceColuna) => (
                                        <td key={indiceLinha + indiceColuna + 1}
                                        onClick={
                                            acessarEstatisticas ? 
                                            () => acessarEstatisticas(indiceLinha) : 
                                                    funcaoEditar ? () => funcaoEditar(indiceLinha) : () => {}
                                            }>
                                            <div className={styles["td-div"]}>
                                                {dado}
                                            </div>
                                        </td>
                                    ))
                                    }
                                    {showEditIcon || showDeleteIcon ?
                                        <td>
                                            <div className={styles["group-icon"]}>
                                                {showEditIcon ?
                                                    <div className={styles["td-div-icon"]} onClick={() => funcaoEditar(indiceLinha)}>
                                                        <IconlyProvider>
                                                            <Edit />
                                                        </IconlyProvider>
                                                    </div>
                                                    : ""
                                                }

                                                {showDeleteIcon ?
                                                    <div className={styles["td-div-icon"]} onClick={() => funcaoDeletar(indiceLinha)}>
                                                        <IconlyProvider>
                                                            <Delete />
                                                        </IconlyProvider>
                                                    </div>
                                                    : ""
                                                }


                                            </div>
                                        </td>
                                        : ""}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;