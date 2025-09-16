import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaMicrophone, FaHistory, FaUser, FaSignOutAlt } from "react-icons/fa";
import styles from "../styles/Sidebar.module.css";

export default function SidebarUser() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Pro-Nuncia</h2>
      <p className={styles.subtitle}>Área do Usuário</p>
      <div className={styles.separator}></div>

      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/user/home" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
              <FaHome className={styles.icon} /> Início
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/user/pronuncia" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
              <FaMicrophone className={styles.icon} /> Pronúncia
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/user/historico" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
              <FaHistory className={styles.icon} /> Histórico
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/perfil" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
              <FaUser className={styles.icon} /> Perfil
            </NavLink>
          </li>
        </ul>
      </nav>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        <FaSignOutAlt className={styles.icon} /> Sair
      </button>
    </aside>
  );
}
