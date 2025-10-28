import { useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Perfil.module.css";

export default function Perfil() {
  const [nome, setNome] = useState("Caroliny Abreu");
  const [email, setEmail] = useState("caroliny@email.com");
  const [cpf] = useState("123.456.789-00");
  const [nascimento] = useState("17/04/2001");
  const [role, setRole] = useState("Cliente");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSalvar = () => {
    alert("Alterações salvas com sucesso!");
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
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    alert("Senha alterada com sucesso!");
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
            onChange={(e) => setRole(e.target.value)}
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
              <label>CPF</label>
              <input type="text" value={cpf} disabled />
              <small>
                Para alterar o CPF, envie um e-mail para{" "}
                <a href="mailto:suporte@gmail.com">suporte@gmail.com</a>
              </small>
            </div>

            <div className={styles.formGroup}>
              <label>Data de Nascimento</label>
              <input type="text" value={nascimento} disabled />
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
      </main>
    </div>
  );
}
