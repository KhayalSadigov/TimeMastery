import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import TourIcon from "@mui/icons-material/Tour";
import TimerIcon from "@mui/icons-material/Timer";
import TocIcon from "@mui/icons-material/Toc";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function CronoMetr({ size }) {



  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mlSeconds, setMlSeconds] = useState(0);
  const [pause, setPause] = useState(false);
  const [timeState, setTime] = useState(0);
  const [checkPoints, setCheckPoints] = useState([]);
  const [cronoMetrMode, setCronoMode] = useState(false);
  let time = timeState;
  const getTime = () => {
    setHours(Math.floor(time / 100 / 60 / 60));
    setMinutes(Math.floor((time / 100 / 60) % 60));
    setSeconds(Math.floor((time / 100) % 60));
    setMlSeconds(Math.floor(time % 100));
    time++;
    setTime(time);
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 10);
    if (!pause) clearInterval(interval);
    return () => clearInterval(interval);
  }, [!pause]);
  return (
    <div className={styles.cronoMetr}>
      <div
        className={styles.timer}
        style={
          size == "2"
            ? { height: "30%" }
            : cronoMetrMode
            ? { transform: "translateY(-100%)" }
            : {}
        }
      >
        <div>
          <h1>
            <h1>
              {hours < 10 && "0"}
              {hours}:{minutes < 10 && "0"}
              {minutes}:{seconds < 10 && "0"}
              {seconds}.{mlSeconds < 10 && "0"}
              {mlSeconds}
            </h1>
          </h1>
        </div>
        <div className={styles.btns}>
          <button
            style={!time ? { backgroundColor: "grey" } : {}}
            className={styles.resetBtn}
            onClick={() => {
              setTime(0);
              setHours(0);
              setMinutes(0);
              setSeconds(0);
              setMlSeconds(0);
              setCheckPoints([]);
              if (pause) {
                setPause(!pause);
              }
            }}
          >
            <RestartAltIcon/>
          </button>
          <button
            style={!time ? { backgroundColor: "grey" } : {}}
            className={styles.checkBtn}
            onClick={() => {
              if (pause) {
                let d = new Date();
                let result = "";
                result +=
                  
                  d.getHours() +
                  ":" +
                  d.getMinutes() 
                  
                setCheckPoints([
                  ...checkPoints,
                  {
                    checkpoint: `${hours < 10 ? "0" + hours : hours}:${
                      minutes < 10 ? "0" + minutes : minutes
                    }:${seconds < 10 ? "0" + seconds : seconds}.${
                      mlSeconds < 10 ? "0" + mlSeconds : mlSeconds
                    }`,
                    time: result,
                  },
                ]);
              }
            }}
          >
            <TourIcon />
          </button>
          <button
            className={styles.playBtn}
            onClick={() => {
              setTime(
                hours * 60 * 60 * 100 +
                  minutes * 60 * 100 +
                  seconds * 100 +
                  mlSeconds
              );
              setPause(!pause);
            }}
          >
            {!pause ? <PlayArrowIcon /> : <PauseIcon />}
          </button>
        </div>
      </div>
      <div
        className={styles.checkTable}
        style={
          size == "2"
            ? { height: "70%" }
            : cronoMetrMode
            ? { transform: "translateY(-100%)" }
            : {}
        }
      >
        <TableContainer component={Paper} style={{ width: "100%" }}>
          <Table  size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell align="left">CheckPoint</TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {checkPoints.length == 0 ? (
                <TableRow>
                  <TableCell>
                    <p>№</p>
                  </TableCell>
                  <TableCell>
                    <p>No checkpoint</p>
                  </TableCell>
                  <TableCell>
                    <p>No time</p>
                  </TableCell>
                </TableRow>
              ) : (
                checkPoints.map((e, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="left">{e.checkpoint}</TableCell>
                    <TableCell align="left">{e.time}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        className={styles.changeIcons}
        style={size ? { display: "none" } : {}}
      >
        <TocIcon
          style={cronoMetrMode ? { display: "none" } : {}}
          className={styles.downIcon}
          onClick={() => {
            setCronoMode(!cronoMetrMode);
          }}
        />
        <TimerIcon
          style={cronoMetrMode ? {} : { display: "none" }}
          className={styles.downIcon}
          onClick={() => {
            setCronoMode(!cronoMetrMode);
          }}
        />
      </div>
    </div>
  );
}

export default CronoMetr;
