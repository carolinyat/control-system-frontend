import { useEffect, useState } from "react";
import styles from "../styles/ScoreBox.module.css";

export default function ScoreBox() {
  const [pontuacao, setPontuacao] = useState<number>(0);

  useEffect(() => {
    const savedAverage = localStorage.getItem("userAverageScore");
    if (savedAverage) setPontuacao(parseFloat(savedAverage));
  }, []);

  return (
    <div className={styles.scoreBox}>
      <h4>Suas conquistas 🏆</h4>
      <div className={styles.scoreInfo}>
        <span className={styles.label}>Pontuação média:</span>
        <span className={styles.value}>
          {pontuacao ? `${pontuacao.toFixed(1)} pts` : "—"}
        </span>
      </div>
    </div>
  );
}
