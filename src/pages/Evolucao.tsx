import Sidebar from "../components/Sidebar";
import styles from "../styles/Evolucao.module.css";
import { useNavigate } from "react-router-dom";

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
    const data = [
        { fase: "Fase 1", Pontuação: 60 },
        { fase: "Fase 2", Pontuação: 75 },
        { fase: "Fase 3", Pontuação: 82 },
        { fase: "Fase 4", Pontuação: 88 },
        { fase: "Fase 5", Pontuação: 91 },
        { fase: "Fase 6", Pontuação: 95 },
    ];

    const navigate = useNavigate();

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
                        Acompanhe abaixo seu desempenho em cada fase. Continue praticando
                        para alcançar a pontuação máxima!
                    </p>

                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E3E6E9" />
                                <XAxis dataKey="fase" tick={{ fill: "#0A233C" }} />
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
