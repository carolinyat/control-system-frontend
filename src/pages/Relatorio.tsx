import Sidebar from "../components/Sidebar";
import styles from "../styles/Relatorio.module.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useEffect, useState, useContext } from "react";
import { getUserProgress, UserProgress } from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Relatorio() {
    const { userId } = useContext(AuthContext);
    const [progressData, setProgressData] = useState<UserProgress[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Busca os dados do progresso quando o componente carrega
    useEffect(() => {
        const fetchProgress = async () => {
            if (!userId) {
                setError("Usuário não autenticado");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await getUserProgress(userId);
                setProgressData(data);
                setError(null);
            } catch (err) {
                console.error("Erro ao buscar progresso:", err);
                setError("Erro ao carregar dados do progresso");
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, [userId]);

    // Calcula estatísticas dos dados reais
    const stats = progressData.length > 0 ? {
        totalSessions: progressData.length,
        averageScore: progressData.reduce((acc, p) => acc + p.best_score, 0) / progressData.length,
        bestScore: Math.max(...progressData.map(p => p.best_score)),
        totalAttempts: progressData.reduce((acc, p) => acc + p.attempt_count, 0)
    } : null;

    // Salva a média no localStorage quando os dados mudarem
    useEffect(() => {
        if (stats) {
            localStorage.setItem("userAverageScore", stats.averageScore.toFixed(1));
        }
    }, [stats]);

    const handleDownloadPDF = async () => {
        const element = document.getElementById("report-content");
        if (!element) return;

        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("relatorio-pronuncia.pdf");
    };

    return (
        <div className={styles.container}>
            <Sidebar />

            <main className={styles.content}>
                {/* <div className={styles.scoreBox}>
          <h4>Suas conquistas 🏆</h4>
          <div className={styles.scoreInfo}>
            <span>Nível</span>
            <span>Pontuação</span>
          </div>
        </div> */}

                <div className={styles.card} id="report-content">
                    <h2>Relatório de Desempenho</h2>
                    <p>Resumo das suas sessões e pontuações alcançadas.</p>

                    {loading && <p>Carregando dados...</p>}
                    {error && <p className={styles.error}>{error}</p>}

                    {!loading && !error && progressData.length === 0 && (
                        <p>Nenhum progresso registrado ainda. Comece a praticar!</p>
                    )}

                    {!loading && !error && progressData.length > 0 && (
                        <>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Dificuldade</th>
                                        <th>Tentativas</th>
                                        <th>Melhor Score</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {progressData.map((item, index) => (
                                        <tr key={item._id || index}>
                                            <td>{item.sentence_difficulty}</td>
                                            <td>{item.attempt_count}</td>
                                            <td>{item.best_score.toFixed(1)}%</td>
                                            <td>{new Date(item.ended_at).toLocaleDateString('pt-BR')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {stats && (
                                <div className={styles.summary}>
                                    <p><strong>Total de sessões:</strong> {stats.totalSessions}</p>
                                    <p><strong>Média geral:</strong> {stats.averageScore.toFixed(1)}%</p>
                                    <p><strong>Melhor score:</strong> {stats.bestScore.toFixed(1)}%</p>
                                    <p><strong>Total de tentativas:</strong> {stats.totalAttempts}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className={styles.actions}>
                    <button className={styles.primaryBtn} onClick={handleDownloadPDF}>
                        Baixar Relatório em PDF
                    </button>
                </div>
            </main>
        </div>
    );
}
