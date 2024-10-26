import React from "react";
import styles from "./Input.module.css";
// import InputMask from 'react-input-mask';
import { IMaskInput } from 'react-imask';
import DatePicker from "react-date-picker";
import { Calendar } from "react-iconly";
import { IoIosArrowDown } from "react-icons/io";


const Input = ({
    tamanho,
    id,
    valor,
    placeholder,
    titulo,
    type,
    alterarValor,
    validarEntrada,
    funcao,
    readonly,
    mascara,
    regex,
    maxlength,
    minlength,
    sobrepor,
    cor,
    isAnual,
    isMensal,
    isDiaria,
    showCalendarIcon
}) => {
    const mudarValor = (e) => {
        alterarValor(e.target.value);
    }

    return (
        <>
            <div className={styles["componet-input"]}>
                {(titulo) &&
                    <label for={id}>
                        <span
                            className={styles["titulo-input"]}
                        >
                            {titulo}
                        </span>
                    </label>
                }
                {mascara ?
                    <IMaskInput
                        id={id || styles[cor]}
                        value={valor}
                        className={styles["input"]}
                        placeholder={placeholder || titulo}
                        onChange={(e) => mudarValor(e)}
                        onKeyUp={funcao}
                        onInput={validarEntrada ? (e) => validarEntrada(e) : null}
                        mask={mascara}
                        style={{
                            height: tamanho ? "1rem" : "",
                            fontSize: tamanho ? "0.9rem" : "",
                            padding: tamanho ? "0.9rem 1.8rem" : "",
                        }}
                        type={type}
                        maxLength={maxlength}
                        minLength={minlength}
                        readOnly={readonly}
                    /> : type === "date" ?
                        <div id={id || styles[cor]} className={styles["component-date"]}
                            style={{
                                height: tamanho ? "1rem" : "",
                                fontSize: tamanho ? "14px" : "",
                                padding: tamanho ? "0.9rem 1.8rem" : "",
                                zIndex: sobrepor ? "99999" : ""
                            }}
                        >
                            <DatePicker
                                value={valor || new Date()}
                                onChange={(e) => alterarValor(e)}
                                className={styles["input-date"]}
                                calendarIcon={
                                    showCalendarIcon ?
                                    <Calendar
                                        primaryColor={cor === "roxo" ? "var(--texto-branco)" : ""}
                                    /> :
                                        <IoIosArrowDown 
                                        
                                            style={{
                                                fontSize: "1.2rem",
                                                color: cor === "roxo" ? "var(--texto-branco)" : ""
                                            }}
                                    />
                                }
                                clearIcon={null}
                                format={isAnual ? "yyyy" : isMensal ? "MM/yyyy" : "dd/MM/yyyy"}
                                locale="br-BR"
                                calendarProps={{
                                    view: isMensal ? "year" : isDiaria ? "month" : "day",
                                    defaultView: isMensal ? "year" : isDiaria ? "month" : "day",
                                    onClickMonth: isMensal ? (e) => alterarValor(e) : null,
                                    onClickYear: isAnual ? (e) => alterarValor(e) : null,
                                    onClickDay: isMensal ? (e) => alterarValor(e) : null,
                                }}
                            />
                        </div>
                        : <input
                            id={id || styles[cor]}
                            type={type}
                            value={valor}
                            className={styles["input"]}
                            placeholder={placeholder || titulo}
                            onChange={(e) => mudarValor(e)}
                            onInput={validarEntrada ? (e) => validarEntrada(e) : null}
                            readOnly={readonly || false}
                            style={{
                                height: tamanho ? "1rem" : "",
                                fontSize: tamanho ? "14px" : "",
                                padding: tamanho ? "0.9rem 1.8rem" : "",
                                zIndex: sobrepor ? "99999" : ""
                            }}
                            pattern={regex}
                            maxLength={maxlength}
                            minLength={minlength}
                        />
                }
            </div>

        </>
    );
}

export default Input;