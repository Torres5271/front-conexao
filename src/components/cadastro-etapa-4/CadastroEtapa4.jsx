import React from "react";
import Input from "../../components/input/Input";
import styles from "./CadastroEtapa4.module.css"

const CadastroEtapa4 = ({
    Nome, setNome,
    Telefone, setTelefone,
    Email, setEmail,
    Senha, setSenha
}) => {

    return (

        <div className={styles["tela-cadastro"]}>
            <div className={styles["container-cadastro"]}>
                <Input
                    id="nomeUsuario"
                    valor={Nome}
                    alterarValor={setNome}
                    titulo={"Nome"}/>
                <Input
                    id="telefoneUsuario"
                    valor={Telefone}
                    alterarValor={setTelefone}
                    titulo={"Telefone"}
                    mascara={"(00) 00000-0000"}
                    // validarEntrada={inputSomenteNumero}
                />
                <Input
                    id="emailUsuario"
                    valor={Email}
                    alterarValor={setEmail}
                    titulo={"Email"}
                />
                <Input
                    id="senha"
                    valor={Senha}
                    alterarValor={setSenha}
                    titulo={"Senha"}
                    type={"password"}
                />

            </div>
        </div>

    );
}


export default CadastroEtapa4;
