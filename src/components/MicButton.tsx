import { FaMicrophone } from "react-icons/fa";
import styles from "../styles/MicButton.module.css";

interface MicButtonProps {
  isRecording?: boolean;
  onClick?: () => void;
}

export default function MicButton({ isRecording = false, onClick }: MicButtonProps) {
  return (
    <button
      className={`${styles.micBtn} ${isRecording ? styles.recording : ""}`}
      onClick={onClick}
      aria-label="Botão de microfone"
    >
      <FaMicrophone className={styles.icon} />
      <span className={styles.ripple}></span>
    </button>
  );
}
