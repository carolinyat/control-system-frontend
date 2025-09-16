import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import inatelLogo from "../assets/Logo-Inatel.png";
import { FaSignInAlt } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={inatelLogo} alt="Inatel" className={styles.logo} />

        <h1 className={styles.title}>
          Bem-vindo ao <span>Pro-Nuncia</span>
        </h1>
        <p className={styles.subtitle}>
          Ferramenta de análise de pronúncia para auxiliar no aprendizado.
        </p>
        <button
          className={styles.loginBtn}
          onClick={() => navigate("/login")}
        >
          <FaSignInAlt /> Entrar
        </button>
      </div>
    </div>
  );
}
