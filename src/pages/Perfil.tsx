import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Perfil.module.css";
import { getUserById, User } from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Perfil() {
    const { userId } = useContext(AuthContext);
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    // Modal de senha
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    // Notificação
    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState<"success" | "error">("success");

    // Busca dados do usuário ao carregar
    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                setError("Usuário não autenticado");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await getUserById(userId);
                setUserData(data);
                setNome(data.name);
                setEmail(data.email);
                setError(null);
            } catch (err) {
                console.error("Erro ao buscar dados do usuário:", err);
                setError("Erro ao carregar dados do perfil");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleSalvar = () => {
        setNotification("Alterações salvas com sucesso!");
        setNotificationType("success");
        setTimeout(() => setNotification(""), 3000);
    };

    const handleAbrirModal = () => {
        setIsModalOpen(true);
    };

    const handleFecharModal = () => {
        setIsModalOpen(false);
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarSenha("");
    };

    const handleAlterarSenha = () => {
        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            setNotification("Por favor, preencha todos os campos.");
            setNotificationType("error");
            setTimeout(() => setNotification(""), 3000);
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setNotification("As senhas não coincidem.");
            setNotificationType("error");
            setTimeout(() => setNotification(""), 3000);
            return;
        }

        setNotification("Senha alterada com sucesso!");
        setNotificationType("success");
        setTimeout(() => setNotification(""), 3000);
        handleFecharModal();
    };

    return (
        <div className={styles.container}>
            <Sidebar />

            <main className={styles.content}>
                <div className={styles.card}>
                    <h2>Meu Perfil</h2>

                    {loading && <p>Carregando dados...</p>}
                    {error && <p className={styles.error}>{error}</p>}

                    {!loading && !error && userData && (
                        <form className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>ID</label>
                                <input
                                    type="text"
                                    value={userData.id}
                                    disabled
                                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Nome</label>
                                <input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>E-mail</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className={styles.actions}>
                                <button
                                    type="button"
                                    className={styles.primaryBtn}
                                    onClick={handleSalvar}
                                >
                                    Salvar Alterações
                                </button>

                                <button
                                    type="button"
                                    className={styles.secondaryBtn}
                                    onClick={handleAbrirModal}
                                >
                                    Alterar Senha
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Modal de alteração de senha */}
                {isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <h3>Alterar Senha</h3>

                            <div className={styles.modalGroup}>
                                <label>Senha atual</label>
                                <input
                                    type="password"
                                    value={senhaAtual}
                                    onChange={(e) => setSenhaAtual(e.target.value)}
                                />
                            </div>

                            <div className={styles.modalGroup}>
                                <label>Nova senha</label>
                                <input
                                    type="password"
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                />
                            </div>

                            <div className={styles.modalGroup}>
                                <label>Confirmar nova senha</label>
                                <input
                                    type="password"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                />
                            </div>

                            <div className={styles.modalActions}>
                                <button
                                    className={styles.primaryBtn}
                                    onClick={handleAlterarSenha}
                                >
                                    Salvar
                                </button>
                                <button
                                    className={styles.secondaryBtn}
                                    onClick={handleFecharModal}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notificação */}
                {notification && (
                    <div
                        className={`${styles.notification} ${notificationType === "success" ? styles.success : styles.error
                            }`}
                    >
                        {notification}
                    </div>
                )}
            </main>
        </div>
    );
}
