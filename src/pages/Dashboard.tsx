import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Dashboard.module.css";
import { FaMicrophone, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ScoreBox from "../components/ScoreBox";
import { useState, useEffect } from "react";
import { getSentences, Sentence } from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [frases, setFrases] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const frasesPorPagina = 6;

  // Busca as frases do backend
  useEffect(() => {
    const fetchSentences = async () => {
      try {
        setLoading(true);
        const data = await getSentences();
        setFrases(data);
      } catch (err) {
        console.error("Erro ao buscar frases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSentences();
  }, []);

  // Calcula as frases da página atual
  const indiceInicio = (paginaAtual - 1) * frasesPorPagina;
  const indiceFim = indiceInicio + frasesPorPagina;
  const frasesVisiveis = frases.slice(indiceInicio, indiceFim);
  const totalPaginas = Math.ceil(frases.length / frasesPorPagina);

  const handleFraseClick = (numeroDaFrase: number) => {
    navigate(`/pronuncia?pagina=${numeroDaFrase}`);
  };

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const handleProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
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

          {loading ? (
            <p className={styles.loading}>Carregando frases...</p>
          ) : (
            <>
              <div className={styles.paginacaoInfo}>
                <span>Página {paginaAtual} de {totalPaginas} ({frases.length} frases no total)</span>
              </div>

              <div className={styles.grid}>
                {frasesVisiveis.map((frase, index) => {
                  const numeroReal = indiceInicio + index + 1;
                  return (
                    <button
                      key={frase.id || numeroReal}
                      className={styles.faseBtn}
                      onClick={() => handleFraseClick(numeroReal)}
                    >
                      <div className={styles.fraseNumero}>Frase {numeroReal}</div>
                      <div className={styles.fraseTexto}>{frase.text}</div>
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
                  );
                })}
              </div>

              <div className={styles.paginacaoControles}>
                <button 
                  className={styles.setaBtn} 
                  onClick={handlePaginaAnterior}
                  disabled={paginaAtual === 1}
                >
                  <FaChevronLeft /> Anterior
                </button>
                
                <span className={styles.paginaNumero}>{paginaAtual} / {totalPaginas}</span>
                
                <button 
                  className={styles.setaBtn} 
                  onClick={handleProximaPagina}
                  disabled={paginaAtual === totalPaginas}
                >
                  Próxima <FaChevronRight />
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
