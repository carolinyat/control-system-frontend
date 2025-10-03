import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css"; 
import inatelLogo from "../assets/Logo-Inatel.png";

export default function RecoverPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // futuramente  chama o backend para enviar o email de recuperação
    alert("Um link de recuperação de senha foi enviado para o seu e-mail!");
    navigate("/"); // redireciona de volta para o login
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Pro-Nuncia</h1>
        <p className={styles.subtitle}>Ferramenta de análise de pronúncia</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Recuperar Senha</h2>
        <p className={styles.subtitle2}>
          Informe seu e-mail para receber instruções de redefinição
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            className={styles.input}
            required
          />

          <button type="submit" className={styles.button}>
            Enviar link de recuperação
          </button>
                    <a href="#" className={styles.forgot} onClick={() => navigate("/login")}>
            Voltar para login
          </a>
        </form>
      </div>

      <img src={inatelLogo} alt="Inatel" className={styles.logo} />
    </div>
  );
}
