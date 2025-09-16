import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>Pro-Nuncia</h2>
      <nav>
        <ul>
          <li><Link to="/user/home">Início</Link></li>
          <li><Link to="/user/pronuncia">Pronúncia</Link></li>
          <li><Link to="/user/evolucao">Evolução</Link></li>
          <li><Link to="/user/relatorio">Relatório</Link></li>
          <li><Link to="/user/perfil">Perfil</Link></li>
        </ul>
      </nav>
    </div>
  );
}
