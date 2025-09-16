import styles from "../styles/Login.module.css";
import inatelLogo from "../assets/Logo-Inatel.png";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Pro-Nuncia</h1>
        <p className={styles.subtitle}>Ferramenta de análise de pronúncia</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Login</h2>

        <form className={styles.form}>
          <input type="email" placeholder="E-mail" className={styles.input} />
          <input type="password" placeholder="Senha" className={styles.input} />

          <a href="#" className={styles.forgot}>
            Esqueceu sua senha?
          </a>

          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
      </div>

      <img src={inatelLogo} alt="Inatel" className={styles.logo} />
    </div>
  );
}
