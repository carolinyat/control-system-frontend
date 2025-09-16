import { useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Admin.module.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

export default function Admin() {
  // Lista de usuários (mock)
  const [users, setUsers] = useState<
    { id: number; name: string; email: string; cpf: string; dob: string }[]
  >([]);

  // Busca
  const [search, setSearch] = useState("");

  // Modal de novo/edição
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Modal de confirmação exclusão
  const [confirmDelete, setConfirmDelete] = useState<null | number>(null);

  // Notificações
  const [notification, setNotification] = useState("");

  // Formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    dob: "",
  });

  // Lista filtrada
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );


  // Abrir modal de novo usuário
  const handleNewUser = () => {
    setFormData({ name: "", email: "", cpf: "", dob: "" });
    setEditingUser(null);
    setShowModal(true);
  };

  // Abrir modal para editar usuário
  const handleEditUser = (user: any) => {
    setFormData({
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      dob: user.dob,
    });
    setEditingUser(user);
    setShowModal(true);
  };

  // Salvar (novo ou edição)
  const handleSaveUser = () => {
    if (!formData.name || !formData.email) {
      alert("Preencha pelo menos nome e e-mail.");
      return;
    }

    if (editingUser) {
      // Atualizar
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u))
      );
      setNotification("Usuário atualizado com sucesso!");
    } else {
      // Criar com ID único
      const newUser = {
        id: Math.floor(Math.random() * 1000000), // evita duplicação
        ...formData,
      };
      setUsers((prev) => [...prev, newUser]);
      setNotification("Usuário criado com sucesso!");
    }

    // só depois de atualizar lista, limpa estados
    setEditingUser(null);
    setFormData({ name: "", email: "", cpf: "", dob: "" });
    setShowModal(false);

    // Notificação some sozinha
    setTimeout(() => setNotification(""), 3000);
  };


  // Confirmar exclusão
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    setConfirmDelete(null);
    setNotification("Usuário excluído com sucesso!");
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <h1 className={styles.title}>Gerenciamento de Usuários</h1>

        <div className={styles.actions}>
          <input
            className={styles.searchInput}
            placeholder="Buscar usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={styles.searchBtn}>
            <FaSearch />
          </button>
          <button className={styles.addBtn} onClick={handleNewUser}>
            Novo Usuário
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>CPF</th>
              <th>Data de Nascimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.cpf}</td>
                  <td>{user.dob}</td>
                  <td className={styles.actionsCol}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEditUser(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => setConfirmDelete(user.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      {/* Modal Novo/Editar */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{editingUser ? "Editar Usuário" : "Novo Usuário"}</h2>
            <input
              type="text"
              placeholder="Nome"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, email: value });
              }}
              onBlur={(e) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (e.target.value && !regex.test(e.target.value)) {
                  alert("Digite um e-mail válido!");
                  setFormData({ ...formData, email: "" }); // limpa o campo
                }
              }}
            />
            <input
              type="text"
              placeholder="CPF"
              value={formData.cpf}
              onChange={(e) => {
                let v = e.target.value.replace(/\D/g, ""); // só números
                if (v.length > 11) v = v.slice(0, 11); // garante no máximo 11 dígitos

                // aplica máscara só quando tiver números suficientes
                if (v.length > 9) {
                  v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
                } else if (v.length > 6) {
                  v = v.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
                } else if (v.length > 3) {
                  v = v.replace(/(\d{3})(\d+)/, "$1.$2");
                }

                setFormData({ ...formData, cpf: v });
              }}
              onBlur={(e) => {
                const rawCpf = e.target.value.replace(/\D/g, ""); // só números
                if (rawCpf.length !== 11) {
                  alert("Digite um CPF válido com 11 dígitos.");
                  setFormData({ ...formData, cpf: "" }); // limpa se inválido
                }
              }}
              maxLength={14} // 000.000.000-00
              required
            />

            <input
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              max={new Date().toISOString().split("T")[0]} // impede datas futuras
            />

            <div className={styles.modalActions}>
              <button onClick={handleSaveUser} className={styles.addBtn}>
                Salvar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={styles.deleteBtn}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {confirmDelete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir este usuário?</p>
            <div className={styles.modalActions}>
              <button
                onClick={() => handleDeleteUser(confirmDelete)}
                className={styles.deleteBtn}
              >
                Excluir
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className={styles.addBtn}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notificação */}
      {notification && <div className={styles.notification}>{notification}</div>}
    </div>
  );
}
