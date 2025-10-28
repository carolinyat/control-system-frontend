import Sidebar from "../components/Sidebar";
import styles from "../styles/Relatorio.module.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useEffect } from "react";

export default function Relatorio() {
    const data = [
        { fase: "Fase 1", pontuacao: 60 },
        { fase: "Fase 2", pontuacao: 75 },
        { fase: "Fase 3", pontuacao: 82 },
        { fase: "Fase 4", pontuacao: 88 },
        { fase: "Fase 5", pontuacao: 91 },
        { fase: "Fase 6", pontuacao: 95 },
    ];

    // Calcula a média
    const media =
        data.reduce((acc, item) => acc + item.pontuacao, 0) / data.length;

    // Salva a média no localStorage quando o componente renderizar
    useEffect(() => {
        localStorage.setItem("userAverageScore", media.toFixed(1));
    }, [media]);

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
                    <p>Resumo das suas fases e pontuações alcançadas.</p>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Fase</th>
                                <th>Pontuação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.fase}>
                                    <td>{item.fase}</td>
                                    <td>{item.pontuacao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.summary}>
                        <p>
                            <strong>Média geral:</strong> {media.toFixed(1)} pontos
                        </p>

                        {/* <p>
              <strong>Status:</strong>{" "}
              {media >= 80 ? "Excelente desempenho!" : "Continue praticando!"}
            </p> */}
                    </div>
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
