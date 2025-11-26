import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Admin.module.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { getUsers, registerUser, User, CreateUserRequest } from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Admin() {
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Lista de usuários do backend
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca
  const [search, setSearch] = useState("");

  // Modal de novo usuário
  const [showModal, setShowModal] = useState(false);

  // Notificações
  const [notification, setNotification] = useState("");

  // Formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Redireciona se não for admin
  useEffect(() => {
    if (!isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, navigate]);

  // Busca usuários ao carregar
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        setError("Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  // Lista filtrada
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );


  // Abrir modal de novo usuário
  const handleNewUser = () => {
    setFormData({ name: "", email: "", password: "" });
    setShowModal(true);
  };

  // Salvar novo usuário
  const handleSaveUser = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const newUser = await registerUser(formData as CreateUserRequest);
      setUsers((prev) => [...prev, newUser]);
      setNotification("Usuário criado com sucesso!");
      setFormData({ name: "", email: "", password: "" });
      setShowModal(false);
      setTimeout(() => setNotification(""), 3000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || "Erro ao criar usuário";
      alert(errorMessage);
    }
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
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "20px" }}>
                  Carregando...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "20px", color: "red" }}>
                  {error}
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "20px" }}>
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      {/* Modal Novo Usuário */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Novo Usuário</h2>
            <input
              type="text"
              placeholder="Nome"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Senha"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <div className={styles.modalActions}>
              <button onClick={handleSaveUser} className={styles.addBtn}>
                Criar
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

      {/* Notificação */}
      {notification && <div className={styles.notification}>{notification}</div>}
    </div>
  );
}
