import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import styles  from "./index.module.scss";

export default function Calendar() {
  return (
    <div className={styles.calendar}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar"]}>
          <DateCalendar
            referenceDate={dayjs("2024-08-17")}
            views={["year", "month", "day"]}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
