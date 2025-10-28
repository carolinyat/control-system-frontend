import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Dashboard.module.css";
import { FaMicrophone } from "react-icons/fa";
import ScoreBox from "../components/ScoreBox";

export default function Dashboard() {
  const navigate = useNavigate();

  const fases = [1, 2, 3, 4, 5, 6];

  const handleFaseClick = (fase: number) => {
    navigate(`/pronuncia?fase=${fase}`);
  };

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        {/* Box de pontuação no canto direito */}
        <ScoreBox/>

        {/* Card principal */}
        <div className={styles.card}>
          <div className={styles.header}>
            <FaMicrophone className={styles.icon} />
            <h2>Pronúncia</h2>
          </div>

          <div className={styles.grid}>
            {fases.map((fase) => (
              <button
                key={fase}
                className={styles.faseBtn}
                onClick={() => handleFaseClick(fase)}
              >
                <span>Fase {fase}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className={styles.playIcon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
