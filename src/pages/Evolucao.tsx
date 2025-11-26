import Sidebar from "../components/Sidebar";
import styles from "../styles/Evolucao.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getUserProgress, UserProgress } from "../services/api";
import { AuthContext } from "../context/AuthContext";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Evolucao() {
    const { userId } = useContext(AuthContext);
    const [progressData, setProgressData] = useState<UserProgress[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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

    // Prepara dados para o gráfico - ordenado por data
    const chartData = progressData
        .sort((a, b) => new Date(a.ended_at).getTime() - new Date(b.ended_at).getTime())
        .map((item, index) => ({
            sessao: `Sessão ${index + 1}`,
            Pontuação: item.best_score,
            data: new Date(item.ended_at).toLocaleDateString('pt-BR')
        }));

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

                <div className={styles.card}>
                    <h2>Sua Evolução</h2>
                    <p>
                        Acompanhe abaixo seu desempenho em cada sessão. Continue praticando
                        para alcançar a pontuação máxima!
                    </p>

                    {loading && <p>Carregando dados...</p>}
                    {error && <p className={styles.error}>{error}</p>}

                    {!loading && !error && progressData.length === 0 && (
                        <p>Nenhum progresso registrado ainda. Comece a praticar!</p>
                    )}

                    {!loading && !error && chartData.length > 0 && (
                        <div className={styles.chartContainer}>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E3E6E9" />
                                    <XAxis dataKey="sessao" tick={{ fill: "#0A233C" }} />
                                    <YAxis domain={[0, 100]} tick={{ fill: "#0A233C" }} />
                                    <Tooltip
                                        contentStyle={{
                                            background: "white",
                                            border: "1px solid var(--gray-light)",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="Pontuação"
                                        stroke="var(--primary)"
                                        strokeWidth={3}
                                        dot={{ r: 5, fill: "var(--secondary)" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    <div className={styles.actions}>
                        <button
                            className={styles.primaryBtn}
                            onClick={() => navigate("/relatorio")}
                        >
                            Gerar Relatório
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
