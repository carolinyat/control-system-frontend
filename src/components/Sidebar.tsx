import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaChartLine, FaFileAlt, FaUsers, FaUser, FaSignOutAlt } from "react-icons/fa";
import styles from "../styles/Sidebar.module.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Depois limpar token/sessão do backend
    navigate("/"); // redireciona para login
  };

  return (
    <aside className={styles.sidebar}>
      {/* Logo e subtítulo */}
      <h2 className={styles.logo}>Pro-Nuncia</h2>
      <p className={styles.subtitle}>Ferramenta de análise de pronúncia</p>
      <div className={styles.separator}></div>

      {/* Navegação */}
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <FaHome className={styles.icon} /> Início
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/evolucao"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <FaChartLine className={styles.icon} /> Evolução
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/relatorio"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <FaFileAlt className={styles.icon} /> Relatório
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/usuarios"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <FaUsers className={styles.icon} /> Usuários
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <FaUser className={styles.icon} /> Perfil
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Botão de sair no rodapé */}
      <button className={styles.logoutBtn} onClick={handleLogout}>
        <FaSignOutAlt className={styles.icon} /> Sair
      </button>
    </aside>
  );
}
