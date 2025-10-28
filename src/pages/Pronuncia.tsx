import { useRecorder } from "../hooks/useRecorder";
import MicButton from "../components/MicButton";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Pronuncia.module.css";
import { useState } from "react";


export default function Pronuncia() {
  const {
    isRecording,
    audioURL,
    startRecording,
    stopRecording,
    resetRecording,
  } = useRecorder();

  const [currentSentence, setCurrentSentence] = useState(
    "O rato roeu a roupa do rei de Roma"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleMicClick = async () => {
    if (isRecording) {
      stopRecording();
      setIsAnalyzing(true);

      // Simulação de envio e resposta da IA
      setTimeout(() => {
        const success = Math.random() > 0.3; // 70% chance de "acerto"
        setResult(success ? "Acertou!" : "Tente novamente.");
        setIsAnalyzing(false);
      }, 2000);
    } else {
      resetRecording();
      setResult(null);
      startRecording();
    }
  };

  const handleNext = () => {
    setResult(null);
    setCurrentSentence("O sabiá sabia assobiar");
    resetRecording();
  };
  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <div className={styles.scoreBox}>
          <h4>Suas conquistas 🏆</h4>
          <div className={styles.scoreInfo}>
            <span>Nível</span>
            <span>Pontuação</span>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.instruction}>Repita a frase abaixo:</p>
          <h3 className={styles.sentence}>{currentSentence}</h3>

          <div className={styles.micContainer}>
            <MicButton isRecording={isRecording} onClick={handleMicClick} />
          </div>

          {isAnalyzing && <p className={styles.loading}>Analisando sua fala...</p>}

          {audioURL && !isAnalyzing && (
            <div className={styles.audioSection}>
              <audio src={audioURL} controls />
              {result && <p className={styles.result}>{result}</p>}
            </div>
          )}

          {result && (
            <button className={styles.nextBtn} onClick={handleNext}>
              Próxima frase ➜
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
