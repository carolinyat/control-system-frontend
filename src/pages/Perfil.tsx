import { useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Perfil.module.css";

export default function Perfil() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf] = useState("123.456.789-00");
    const [nascimento, setBirthDate] = useState("");
    const [role, setRole] = useState("Cliente");

    // const { user } = useAuth(); // AuthContext
    // const [role, setRole] = useState(user?.role || "Cliente");

    // Modal de senha
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    // Notificação
    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState<"success" | "error">("success");

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
                {/* Select de função */}
                <div className={styles.roleBox}>
                    <label htmlFor="role">Função:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => {
                            const value = e.target.value;
                            setRole(value);
                            localStorage.setItem("userRole", value); // salva no navegador
                        }}
                    >
                        <option value="Administrador">Administrador</option>
                        <option value="Cliente">Cliente</option>
                    </select>

                </div>

                <div className={styles.card}>
                    <h2>Meu Perfil</h2>

                    <form className={styles.form}>
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

                        <div className={styles.formGroup}>
                            <label>Data de Nascimento</label>
                            <input
                                type="date"
                                value={nascimento}
                                onChange={(e) => setBirthDate(e.target.value)}
                                max={new Date().toISOString().split("T")[0]} // impede datas futuras
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>CPF</label>
                            <input type="text" value={cpf} disabled />
                            <small>
                                Para alterar o CPF, envie um e-mail para{" "}
                                <a href="mailto:suporte@gmail.com">suporte@gmail.com</a>
                            </small>
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
