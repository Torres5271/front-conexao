import React from "react";
import styles from "./Ul.module.css";
import { TickSquare, IconlyProvider } from "react-iconly";
import { useNavigate } from "react-router-dom";

const Ul = ({ items, titulo, servicosSelecionados, toggleServico, nomeCampo }) => {
    const navigate = useNavigate();

    return (
        <div className={styles["servicos-container"]}>
            <span className={styles["titulo-input"]}>{titulo}</span>
            <div className={styles["servicos-input"]}>
                <div className={styles["servicos-grid"]}>
                    {!items || items.length === 0 ?
                        <div className={styles["sem-servicos"]}>
                            Nenhum serviço cadastrado. <span
                                className={styles["link-servico"]}
                                onClick={() => navigate("/servicos/adicionar")}>
                                Cadastrar serviço
                            </span>
                        </div>
                        :
                        items.map((item, index) => (
                            <div key={index}
                                className={`${styles["servico-item"]} ${servicosSelecionados.includes(item) ? styles["selected"] : ""}`}
                                onClick={() => toggleServico(item)}
                            >
                                <IconlyProvider
                                    stroke="bold"
                                    set={servicosSelecionados.includes(item) ? "bold" : "light border"}
                                    style={{
                                        transition: "0.3s all linear"
                                    }}
                                    secondaryColor="var(--roxo-principal)"

                                >
                                    <TickSquare strokeColor={servicosSelecionados.includes(item) ? "var(--texto-preto)" : undefined} />
                                </IconlyProvider>
                                <span className={servicosSelecionados.includes(item) ? styles["selected-text"] : ""}>{nomeCampo ? item.nomeServico : item.nome} - R$ {item.preco.toFixed(2).replace(".", ",")} </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Ul;
