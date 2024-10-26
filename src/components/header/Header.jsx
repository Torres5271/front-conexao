import Logo from "../logo/Logo";
import styles from "./Header.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { IconlyProvider, Home, Calendar, Work, Chart, TwoUsers, AddUser } from "react-iconly";
import iconProfile from "./../../utils/assets/perfil_padrao.svg"
import { LuMenu } from "react-icons/lu";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const nomeUser = sessionStorage.getItem("nomeUser");

    return (
        <>
            <header className={styles["header"]}>
                <div className={styles["logo-header"]}>
                    {/* <LuMenu className={styles["icon-menu"]} /> */}
                    <Logo />
                </div>
                <ul className={styles["nav-list"]}>
                    <li
                        className={
                            styles[
                            location.pathname === "/inicio" ? "roxo" : "cinza"
                            ]
                        }
                        onClick={() => navigate("/inicio")}
                    >
                        <IconlyProvider
                            className={styles["icon-link"]}
                            stroke="bold"
                        >
                            <Home />
                        </IconlyProvider>
                        <span className={styles["text-link"]}>
                            Início
                        </span>
                    </li>
                    <li
                        className={
                            styles[
                            location.pathname === "/agenda" ? "roxo" : "cinza"
                            ]
                        }
                        onClick={() => navigate("/agenda")}
                    >
                        <IconlyProvider
                            className={styles["icon-link"]}
                            stroke="bold"
                        >
                            <Calendar />
                        </IconlyProvider>
                        <span className={styles["text-link"]}>
                            Agenda
                        </span>
                    </li>
                    <li
                        className={
                            styles[
                            location.pathname === "/servicos" ? "roxo" : "cinza"
                            ]
                        }
                        onClick={() => navigate("/servicos")}
                    >
                        <IconlyProvider
                            className={styles["icon-link"]}
                            stroke="bold"
                        >
                            <Work />
                        </IconlyProvider>
                        <span className={styles["text-link"]}>
                            Serviços
                        </span>
                    </li>
                    <li
                        className={
                            styles[
                            location.pathname === "/dashboard" ? "roxo" : "cinza"
                            ]
                        }
                        onClick={() => navigate("/dashboard")}
                    >
                        <IconlyProvider
                            className={styles["icon-link"]}
                            stroke="bold"
                        >
                            <Chart
                            />
                        </IconlyProvider>
                        <span className={styles["text-link"]}

                        >
                            Dashboard
                        </span>
                    </li>
                    <li
                        className={
                            styles[
                            location.pathname === "/equipe" ? "roxo" : "cinza"
                            ]
                        }
                        onClick={() => navigate("/equipe")}
                    >
                        <IconlyProvider
                            className={styles["icon-link"]}
                            stroke="bold"
                        >
                            <TwoUsers />
                        </IconlyProvider>
                        <span className={styles["text-link"]}>
                            Minha Equipe
                        </span>
                    </li>
                    <li
                        className={
                            styles[
                            location.pathname === "/clientes" ? "roxo" : "cinza"
                            ]
                        }
                        onClick={() => navigate("/clientes")}
                    >
                        <IconlyProvider
                            className={styles["icon-link"]}
                            stroke="bold"
                        >
                            <AddUser />
                        </IconlyProvider>
                        <span className={styles["text-link"]}>
                            Clientes
                        </span>
                    </li>
                    {/* <li
                        className={
                            styles[
                            location.pathname === "/financas" ? "roxo" : "cinza"
                            ]
                        }
                    >
                        <IconlyProvider
                            className={styles["icon-link"]}
                            stroke="bold"
                        >
                            <Graph />
                        </IconlyProvider>
                        <span className={styles["text-link"]}>
                            Finanças
                        </span>
                    </li> */}
                </ul>
                <div
                    className={styles["user-profile"]}
                    onClick={() => navigate(`/perfil`)} id={
                        styles[
                        location.pathname === `/perfil` ? "roxo" : "cinza"
                        ]
                    }
                >
                    <div className={styles["icon-profile"]}>
                        <img src={iconProfile} alt="Ícone de perfil" className={styles["img-profile"]} />
                    </div>
                    <span
                        className={styles["name-user"]}
                    >
                        {nomeUser || "Nome do Usuário"}
                    </span>
                    <div className={styles["icon-arrow"]}>
                        <FaAngleRight />
                    </div>
                </div>
            </header >
        </>
    );
}

export default Header;