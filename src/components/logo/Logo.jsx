import styles from "./Logo.module.css";
import imgLogo from "../../utils/assets/logo_calencare.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles["logo"]}>
                <img
                    className={styles["img-logo"]}
                    src={imgLogo}
                    alt="Logo da Calencare"
                    onClick={() => navigate("/")}
                />
            </div>
        </>
    );

}
export default Logo;