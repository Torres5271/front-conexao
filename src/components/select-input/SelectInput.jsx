import React from "react";
import styles from "./SelectInput.module.css";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';


const SelectInput = ({ tamanho, placeholder, titulo, id, options, alterarValor, valor, funcaoAdicionar, criarOption, exibir, pesquisavel }) => {
    const mudarValor = (value) => {
        console.log(value)
        if (value.value === "Criar") {
            funcaoAdicionar()
        } else {
            alterarValor(value)
        }
    }

    // useEffect(() => {
    //     if (options.length > 0 && options[options.length - 1].label !== "Criar") {
    //         alterarValor(options[options.length - 1]);
    //     }
    // }, [options]);

    return (
        <>
            <div className={styles["component-select"]} style={{ display: exibir ? "none" : "flex" }}>
                <label for={id}>
                    <span
                        className={styles["titulo-select"]}
                    >{titulo}</span>
                </label>
                {
                    !criarOption ?
                        <CreatableSelect
                            id={id}
                            formatCreateLabel={(value) => `Criar "${value}"`}
                            placeholder={placeholder || "Selecione"}
                            defaultValue={valor}
                            onChange={(e) => mudarValor(e)}
                            isSearchable={true}
                            value={valor}
                            options={options}
                            noOptionsMessage={() => "Nenhum resultado encontrado"}
                            onCreateOption={funcaoAdicionar}
                            styles={{
                                control: (state) => ({
                                    padding: tamanho ? "0.9rem 1.8rem" : "0px 1.2rem",
                                    height: tamanho ? "1rem" : "44px",
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: "2rem",
                                    fontSize: "0.9rem",
                                    border: "1.5px solid",
                                    letterSpacing: "-0.03rem",
                                    color: "var(--texto-preto)",
                                    fontWeight: 500,
                                    borderColor: state.isFocused ? "var(--preto)" : "var(--texto-cinza)",
                                    borderWidth: state.isFocused ? "2px" : "1.5px",
                                    // width: tamanho === "md" ? "100%" : "",
                                    backgroundColor: "white"
                                }),
                            }}
                        /> :
                        <Select
                            id={id}
                            // formatCreateLabel={(value) => `Criar "${value}"`}
                            placeholder={placeholder || "Selecione"}
                            defaultValue={valor}
                            onChange={(e) => mudarValor(e)}
                            isSearchable={pesquisavel}
                            value={valor}
                            options={options}
                            noOptionsMessage={() => "Nenhum resultado encontrado"}
                            styles={{
                                control: (state) => ({
                                    padding: tamanho ? "0.9rem 1.8rem" : "0px 1.2rem",
                                    height: tamanho ? "1rem" : "44px",
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: "100px",
                                    fontSize: "14.5px",
                                    border: "1.5px solid",
                                    letterSpacing: "-0.03rem",
                                    color: "var(--texto-preto)",
                                    fontWeight: 500,
                                    borderColor: state.isFocused ? "var(--preto)" : "var(--texto-cinza)",
                                    borderWidth: state.isFocused ? "2px" : "1.5px",
                                    // width: tamanho === "md" ? "80%" : "",
                                    background: "white"
                                }),
                            }}
                        />
                }

            </div>
        </>
    );
}

export default SelectInput;