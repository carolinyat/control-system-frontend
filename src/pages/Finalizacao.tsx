import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Finalizacao.module.css";
import ScoreBox from "../components/ScoreBox";

export default function Finalizacao() {
  const navigate = useNavigate();

  const handleVoltarDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        {/* Box de pontuação no canto direito */}
        <ScoreBox/>

        <div className={styles.card}>
          <h2>Parabéns! 🎉</h2>
          <p>Você concluiu todas as fases de pronúncia com sucesso.</p>
          <p>Continue praticando para aprimorar ainda mais sua fala!</p>

          <div className={styles.btnGroup}>
            <button
              className={styles.primaryBtn}
              onClick={handleVoltarDashboard}
            >
              Voltar ao Início
            </button>

            <button
              className={styles.secondaryBtn}
              onClick={() => navigate("/evolucao")}
            >
              Ver Evolução
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
