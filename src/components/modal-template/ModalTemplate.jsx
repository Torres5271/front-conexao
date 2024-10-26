import styles from './ModalTemplate.module.css'
import { IoArrowBackOutline, IoClose } from "react-icons/io5";
import Button from './../button/Button';
import { FaCheck } from 'react-icons/fa6';
import Titulo from '../titulo/Titulo';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { TiCancel } from 'react-icons/ti';

const ModalTemplate = ({ tamanho, aberto, setAberto, titulo, corpo, tituloBotaoConfirmar, tituloBotaoCancelar, funcaoBotaoConfirmar, funcaoBotaoCancelar }) => {

    const handleClose = () => setAberto(false);
    // const handleShow = () => setAberto(true);

    return (
        <>
            <Modal
                open={aberto}
                onClose={handleClose}
                center
                showCloseIcon={false}
                modalId={tamanho ? styles[tamanho] : ""}
                classNames={{
                    modal: styles['modal']
                }}
            >
                <div className={styles["container-modal"]}>
                    <div className={styles["header-modal"]}>
                        <Titulo titulo={titulo || "Título Modal"} tamanho={"md"} />
                        <IoClose
                            className={styles["icon"]}
                            onClick={handleClose}
                        />
                    </div>
                    <div className={styles['form']}>
                        {corpo}
                    </div>
                    <div className={styles['group-button']}>
                        <Button
                            funcaoButton={funcaoBotaoCancelar || handleClose}
                            titulo={tituloBotaoCancelar || "Cancelar"}
                            cor={"branco"}
                            icone={
                                tituloBotaoCancelar === "Voltar" ? <IoArrowBackOutline /> : <TiCancel />
                            } />
                        <Button
                            funcaoButton={funcaoBotaoConfirmar || handleClose}
                            titulo={tituloBotaoConfirmar || "Confirmar"}
                            icone={

                                <FaCheck />
                            }
                            cor={"roxo"}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ModalTemplate;