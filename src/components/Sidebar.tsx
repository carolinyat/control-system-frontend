import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import styles from "../styles/Sidebar.module.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui depois você pode limpar token do backend
    navigate("/"); // redireciona para login
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Pro-Nuncia</h2>
      <p className={styles.subtitle}>Ferramenta de análise de pronúncia</p>
      <div className={styles.separator}></div>

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
              to="/admin/perfil"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <FaUser className={styles.icon} /> Perfil
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/admin/config"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <FaCog className={styles.icon} /> Configurações
            </NavLink>
          </li> */}
        </ul>
      </nav>

      {/* Botão de sair no rodapé */}
      <button className={styles.logoutBtn} onClick={handleLogout}>
        <FaSignOutAlt className={styles.icon} /> Sair
      </button>
    </aside>
  );
}
