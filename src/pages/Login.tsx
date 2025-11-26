import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/api";
import styles from "../styles/Login.module.css";
import inatelLogo from "../assets/Logo-Inatel.png";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setUserId, setIsAdmin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await login(email, password);
      
      // Salva os dados do usuário no contexto
      setUser(response.user.name);
      setUserId(response.user.id);
      
      // Verifica se é admin pelo nome
      const isAdminUser = response.user.name.toLowerCase() === "admin";
      setIsAdmin(isAdminUser);
      
      // Redireciona para o dashboard
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Erro no login:", err);
      const errorMessage = err.response?.data?.detail || "Erro ao fazer login. Verifique suas credenciais.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/reset-password");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Pro-Nuncia</h1>
        <p className={styles.subtitle}>Ferramenta de análise de pronúncia</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Login</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          
          <input 
            type="email" 
            placeholder="E-mail" 
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input 
            type="password" 
            placeholder="Senha" 
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <a href="#" className={styles.forgot} onClick={handleForgotPassword}>
            Esqueceu sua senha?
          </a>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>

      <img src={inatelLogo} alt="Inatel" className={styles.logo} />
    </div>
  );
}
