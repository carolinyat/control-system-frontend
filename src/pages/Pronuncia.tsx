import { useState, useEffect, useContext } from "react";
import { useRecorder } from "../hooks/useRecorder";
import MicButton from "../components/MicButton";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Pronuncia.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import ScoreBox from "../components/ScoreBox";
import { getSentences, Sentence, analyzeSpeech, AnalysisResult, saveProgress } from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Pronuncia() {
  const {
    isRecording,
    audioURL,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
  } = useRecorder();

  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Obtém a página atual pela URL (de 1 a 100)
  const paginaAtual = Number(searchParams.get("pagina")) || 1;

  // Estado para frases do backend
  const [frases, setFrases] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentSentence, setCurrentSentence] = useState("");
  const [currentSentenceId, setCurrentSentenceId] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  
  // Estados para rastrear progresso
  const [attempts, setAttempts] = useState<{score: number}[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<string | null>(null);

  // Busca as frases do backend
  useEffect(() => {
    const fetchSentences = async () => {
      try {
        setLoading(true);
        const data = await getSentences();
        console.log("✅ Frases recebidas do backend:", data);
        console.log("📊 Total de frases:", data.length);
        setFrases(data);
        if (data.length > 0) {
          const frase = data[paginaAtual - 1]?.text || "";
          console.log(`🎯 Frase atual (página ${paginaAtual}):`, frase);
          setCurrentSentence(frase);
        }
        setError(null);
      } catch (err) {
        console.error("❌ Erro ao buscar frases:", err);
        setError("Erro ao carregar frases. Usando frases padrão.");
        // Frases padrão em caso de erro
        const frasesDefault = [
          { text: "O rato roeu a roupa do rei de Roma" },
          { text: "O sabiá sabia assobiar" },
          { text: "A aranha arranha a jarra" },
          { text: "Três pratos de trigo para três tigres tristes" },
          { text: "A babá bebeu o leite do bebê" },
          { text: "O gato bebe leite e pula o muro" },
        ];
        setFrases(frasesDefault);
        setCurrentSentence(frasesDefault[paginaAtual - 1]?.text || "");
      } finally {
        setLoading(false);
      }
    };

    fetchSentences();
  }, []);

  // Atualiza a frase ao mudar de página
  useEffect(() => {
    if (frases.length > 0) {
      const fraseObj = frases[paginaAtual - 1];
      const frase = fraseObj?.text || "";
      const fraseId = fraseObj?.id || paginaAtual;
      console.log(`🔄 Mudou para página ${paginaAtual}:`, frase, 'ID:', fraseId);
      setCurrentSentence(frase);
      setCurrentSentenceId(fraseId);
      resetRecording();
      setAnalysisResult(null);
      setAnalysisError(null);
      
      // Inicia nova sessão para esta frase
      setAttempts([]);
      setSessionStartTime(new Date().toISOString());
    }
  }, [paginaAtual, frases]);

  const handleMicClick = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      resetRecording();
      setAnalysisResult(null);
      setAnalysisError(null);
      startRecording();
    }
  };

  // Observa quando o audioBlob é criado e faz a análise automaticamente
  useEffect(() => {
    const analyzeAudio = async () => {
      if (audioBlob && !isRecording && !isAnalyzing) {
        // Pega a frase diretamente do array baseado na página atual
        const fraseObj = frases[paginaAtual - 1];
        const fraseAtual = fraseObj?.text || currentSentence;
        
        console.log('🎤 Áudio gravado, iniciando análise...');
        console.log('📍 Página atual:', paginaAtual);
        console.log('📖 Frase do array:', fraseObj?.text);
        console.log('📖 currentSentence:', currentSentence);
        console.log('📝 Frase que será enviada:', fraseAtual);
        
        if (!fraseAtual || fraseAtual.trim() === '') {
          console.error('❌ Frase vazia! Não pode analisar.');
          setAnalysisError('Erro: frase não encontrada');
          return;
        }
        
        setIsAnalyzing(true);
        setAnalysisError(null);
        setAnalysisResult(null);
        try {
          const result = await analyzeSpeech(audioBlob, fraseAtual);
          setAnalysisResult(result);
          setError(null);
          
          // Adiciona esta tentativa ao histórico
          const newAttempts = [...attempts, { score: result.accuracy_percentage }];
          setAttempts(newAttempts);
          
          // Salva o progresso após análise bem-sucedida
          if (sessionStartTime && userId) {
            const bestScore = Math.max(...newAttempts.map(a => a.score));
            const progressData = {
              user_id: userId,
              sentence_difficulty: fraseObj?.difficulty === 1 ? "easy" : 
                                  fraseObj?.difficulty === 2 ? "medium" : "hard",
              started_at: sessionStartTime,
              ended_at: new Date().toISOString(),
              attempt_count: newAttempts.length,
              attempts: newAttempts,
              best_score: bestScore
            };
            
            try {
              await saveProgress(progressData);
            } catch (progressError) {
              console.error("Erro ao salvar progresso (não crítico):", progressError);
              // Não mostra erro pro usuário, pois a análise funcionou
            }
          }
        } catch (err: any) {
          console.error("❌ Erro na análise:", err);
          const errorMessage = err.message || "Erro ao analisar a fala. Tente novamente.";
          setAnalysisError(errorMessage);
        } finally {
          setIsAnalyzing(false);
        }
      }
    };

    analyzeAudio();
  }, [audioBlob, isRecording, paginaAtual, frases, currentSentence]);

  // Navega para página anterior
  const handlePrevious = () => {
    if (paginaAtual > 1) {
      setSearchParams({ pagina: String(paginaAtual - 1) });
    }
  };

  // Navega para próxima página ou finaliza
  const handleNext = () => {
    const proximaPagina = paginaAtual + 1;
    if (proximaPagina <= frases.length) {
      setSearchParams({ pagina: String(proximaPagina) });
    } else {
      navigate("/finalizacao");
    }
  };

  const ultimaPagina = paginaAtual === frases.length;
  const primeiraPagina = paginaAtual === 1;

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <ScoreBox />

        <div className={styles.card}>
          {loading && <p className={styles.loading}>Carregando frases...</p>}
          {error && <p className={styles.error}>{error}</p>}
          
          {!loading && (
            <>
              <div className={styles.paginacao}>
                <span>Frase {paginaAtual} de {frases.length}</span>
              </div>
              
              {/* Debug info - remover depois */}
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
                Debug: Total frases carregadas = {frases.length}
              </div>
              
              <p className={styles.instruction}>Repita a frase abaixo:</p>
              <h3 className={styles.sentence}>{currentSentence}</h3>

              <div className={styles.micContainer}>
                <MicButton isRecording={isRecording} onClick={handleMicClick} />
              </div>
              
              {isRecording && (
                <p className={styles.recordingInfo}>
                  🔴 Gravando... (clique novamente para parar ou aguarde 10s)
                </p>
              )}

              {isAnalyzing && (
                <div className={styles.loadingContainer}>
                  <div className={styles.spinner}></div>
                  <p className={styles.loading}>Analisando sua fala...</p>
                </div>
              )}

              {/* Erro na análise */}
              {analysisError && audioURL && !isAnalyzing && (
                <div className={styles.resultSection}>
                  <audio src={audioURL} controls className={styles.audioPlayer} />
                  
                  <div className={styles.errorDisplay}>
                    <div className={styles.errorCircle}>
                      <span className={styles.errorX}>✖</span>
                    </div>
                    <p className={styles.errorLabel}>Erro na Análise</p>
                  </div>
                  
                  <div className={styles.errorBox}>
                    <p className={styles.errorTitle}>⚠️ Erro:</p>
                    <p className={styles.errorText}>{analysisError}</p>
                  </div>
                  
                  <button className={styles.retryBtn} onClick={() => {
                    resetRecording();
                    setAnalysisError(null);
                  }}>
                    🔄 Tentar Novamente
                  </button>
                </div>
              )}

              {/* Sucesso na análise */}
              {audioURL && !isAnalyzing && analysisResult && !analysisError && (
                <div className={styles.resultSection}>
                  <audio src={audioURL} controls className={styles.audioPlayer} />
                  
                  <div className={styles.accuracyDisplay}>
                    <div className={styles.accuracyCircle}>
                      <span className={styles.accuracyNumber}>{analysisResult.accuracy_percentage}%</span>
                    </div>
                    <p className={styles.accuracyLabel}>Precisão</p>
                  </div>
                  
                  <div className={styles.tipBox}>
                    <p className={styles.tipTitle}>💡 Dica:</p>
                    <p className={styles.tipText}>{analysisResult.phonological_tip}</p>
                  </div>
                </div>
              )}

              {analysisResult && (
                <div className={styles.navigationButtons}>
                  <button 
                    className={styles.prevBtn} 
                    onClick={handlePrevious}
                    disabled={primeiraPagina}
                  >
                    ← Anterior
                  </button>
                  <button className={styles.nextBtn} onClick={handleNext}>
                    {ultimaPagina ? "Finalizar" : "Próxima →"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
