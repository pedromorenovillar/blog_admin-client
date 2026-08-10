import { LoaderCircle } from "lucide-react";
import styles from "./Spinner.module.css";

export default function Spinner({ size = 40, color }) {
  return (
    <div className={styles.spinnerContainer}>
      <LoaderCircle className={styles.spinner} size={size} color={color} />
    </div>
  );
}
