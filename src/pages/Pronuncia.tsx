import { useState, useEffect } from "react";
import { useRecorder } from "../hooks/useRecorder";
import MicButton from "../components/MicButton";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Pronuncia.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import ScoreBox from "../components/ScoreBox";

export default function Pronuncia() {
  const {
    isRecording,
    audioURL,
    startRecording,
    stopRecording,
    resetRecording,
  } = useRecorder();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Obtém a fase atual pela URL
  const faseAtual = Number(searchParams.get("fase")) || 1;

  // Lista de frases por fase
  const frases = [
    "O rato roeu a roupa do rei de Roma",
    "O sabiá sabia assobiar",
    "A aranha arranha a jarra",
    "Três pratos de trigo para três tigres tristes",
    "A babá bebeu o leite do bebê",
    "O gato bebe leite e pula o muro",
  ];

  const [currentSentence, setCurrentSentence] = useState(frases[faseAtual - 1]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Atualiza a frase ao mudar de fase
  useEffect(() => {
    setCurrentSentence(frases[faseAtual - 1]);
    resetRecording();
    setResult(null);
  }, [faseAtual]);

  const handleMicClick = async () => {
    if (isRecording) {
      stopRecording();
      setIsAnalyzing(true);

      // Simulação de análise por IA
      setTimeout(() => {
        const success = Math.random() > 0.3;
        setResult(success ? "Acertou!" : "Tente novamente.");
        setIsAnalyzing(false);
      }, 2000);
    } else {
      resetRecording();
      setResult(null);
      startRecording();
    }
  };

  // Muda de fase ou finaliza
  const handleNext = () => {
    const proximaFase = faseAtual + 1;
    if (proximaFase <= frases.length) {
      navigate(`/pronuncia?fase=${proximaFase}`);
    } else {
      navigate("/finalizacao"); // redireciona para a tela de parabéns
    }
  };

  const ultimaFase = faseAtual === frases.length;

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <ScoreBox />

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
              {ultimaFase ? "Finalizar" : "Próxima fase ➜"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
