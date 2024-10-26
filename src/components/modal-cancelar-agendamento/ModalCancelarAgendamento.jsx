import React from "react";
import ModalTemplate from "../modal-template/ModalTemplate";

const ModalCancelarAgendamento = ({ modalCancelarAberto, setModalCancelarAberto, cancelar, descricaoAgendamento }) => {
    return (
        <>
            <ModalTemplate
                aberto={modalCancelarAberto}
                setAberto={setModalCancelarAberto}
                funcaoBotaoConfirmar={cancelar}
                corpo={
                    <span style={{
                        lineHeight: "1.5rem",
                    }}>
                        Você realmente deseja cancelar o agendamento que seria realizado na data "<b>{descricaoAgendamento}</b>"?
                    </span>
                }
                titulo={"Cancelar Agendamento"}
                tituloBotaoCancelar={"Voltar"}
                tituloBotaoConfirmar={"Confirmar"}
                tamanho={"lg"}
            />

        </>
    );
}

export default ModalCancelarAgendamento;