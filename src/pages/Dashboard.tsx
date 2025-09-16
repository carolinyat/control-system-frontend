import Sidebar from "../components/Sidebar";
import styles from "../styles/Dashboard.module.css";
import { FaMicrophone } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className={styles.content}>
        {/* Box de pontuação no canto direito */}
        <div className={styles.scoreBox}>
          <h4>Suas conquistas 🏆</h4>
          <div className={styles.scoreInfo}>
            <span>Nível</span>
            <span>Pontuação</span>
          </div>
        </div>

        {/* Card central */}
        <div className={styles.card}>
          <h2>
            Olá, <strong>[Nome do Usuário]</strong> 👋
          </h2>
          <p>Assim que estiver pronto, clique no botão abaixo</p>

          <div className={styles.micContainer}>
            <button className={styles.micBtn}>
              <FaMicrophone />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
