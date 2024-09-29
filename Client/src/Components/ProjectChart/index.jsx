import styles from "./index.module.scss";
import { Gauge } from "@mui/x-charts/Gauge";

function Project() {
  return (
    <div className={styles.project}>
      <Gauge
        className={styles.chart}
        value={70}
        startAngle={0}
        endAngle={360}
        innerRadius="80%"
        outerRadius="100%"
        text={({ value }) => `${value}%`}
      />
    </div>
  );
}

export default Project;
