import { useContext, useEffect, useState } from "react";
import { baseUrl, DataContext } from "../../Context/dataContext";
import styles from "./index.module.scss";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import CronoMetr from "../../Components/CronoMetr";
import FeedIcon from "@mui/icons-material/Feed";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Calendar from "../../Components/Calendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Todos from "../../Components/Todos";
import axios from "axios";
import Project from "../../Components/ProjectChart";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import AddCircleIcon from "@mui/icons-material/AddCircle";
function HomePage() {
  const [block, setBlock] = useState(null);
  const [user, setUser] = useState(null);
  let store = useContext(DataContext);
  if (!store.client.data) {
    window.location.replace("/");
  }

  useEffect(() => {
    axios.get(baseUrl + "users/" + store.client.data).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <section className={styles.homepage}>
      <div className={styles.left}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h3>{user && user.fullname}</h3>
            <span
              onClick={() => {
                localStorage.setItem("TMuser", JSON.stringify(null));
                store.client.set(null);
                store.client.setObject({});
              }}
            >
              Log out
            </span>
          </div>
          <div className={styles.body}>
            <div className={styles.log}>
              <h3 className={styles.name}>
                <FeedIcon />
                Navigation
              </h3>
              <div className={styles.btns}>
                <p
                  onClick={() => {
                    block == 1 ? setBlock(null) : setBlock("1");
                  }}
                  style={
                    block == 1 ? { paddingLeft: "20px", color: "#1976d2" } : {}
                  }
                >
                  <FormatListBulletedIcon fontSize="small" />
                  Todos
                </p>
                <p
                  onClick={() => {
                    block == "2" ? setBlock(null) : setBlock("2");
                  }}
                  style={
                    block == 2 ? { paddingLeft: "20px", color: "#1976d2" } : {}
                  }
                >
                  <AccessAlarmsIcon fontSize="small" />
                  Timer
                </p>
                <p
                  onClick={() => {
                    block == "3" ? setBlock(null) : setBlock("3");
                  }}
                  style={
                    block == 3 ? { paddingLeft: "20px", color: "#1976d2" } : {}
                  }
                >
                  <AccountTreeIcon fontSize="small" />
                  Projects
                </p>
                <p
                  onClick={() => {
                    block == 4 ? setBlock(null) : setBlock("4");
                  }}
                  style={
                    block == 4 ? { paddingLeft: "20px", color: "#1976d2" } : {}
                  }
                >
                  <CalendarMonthIcon fontSize="small" />
                  Calendar
                </p>
                <p></p>
                <p onClick={() => {}}>
                  <AddCircleIcon fontSize="small" />
                  New Project
                </p>
              </div>
            </div>
          </div>
          {/* <div className={styles.body}>
            <div className={styles.log}>
              <h3 className={styles.name}>
                <SettingsSuggestIcon fontSize="medium" />
                Creative
              </h3>
            </div>
          </div> */}
        </div>
      </div>
      <div className={styles.right}>
        <div
          className={styles.block}
          style={
            block
              ? block == "1"
                ? {
                    width: "100%",
                    height: "100vh",
                    position: "absolute",
                    top: "0",
                    left: "0",
                  }
                : { display: "none" }
              : { top: "0", left: "0" }
          }
        >
          <div className={styles.content}>
            <Todos size={block} />
            <div
              className={styles.screenBtns}
              onClick={() => {
                block ? setBlock(null) : setBlock("1");
              }}
            >
              <OpenInFullIcon
                style={block ? { display: "none" } : { display: "block" }}
              />
              <CloseFullscreenIcon
                style={block ? { display: "block" } : { display: "none" }}
              />
            </div>
          </div>
        </div>
        <div
          className={styles.block}
          style={
            block
              ? block == "2"
                ? {
                    width: "100%",
                    height: "100vh",
                    top: "0",
                    right: "0",
                  }
                : { display: "none" }
              : { top: "0", right: "0" }
          }
        >
          <div className={styles.content}>
            <CronoMetr size={block} />
            <div
              className={styles.screenBtns}
              onClick={() => {
                block ? setBlock(null) : setBlock("2");
              }}
            >
              <OpenInFullIcon
                style={block ? { display: "none" } : { display: "block" }}
              />
              <CloseFullscreenIcon
                style={block ? { display: "block" } : { display: "none" }}
              />
            </div>
          </div>
        </div>
        <div
          className={styles.block}
          style={
            block
              ? block == "3"
                ? { width: "100%", height: "100vh", bottom: "0", left: "0" }
                : { display: "none" }
              : { bottom: "0", left: "0" }
          }
        >
          <div className={styles.content}>
            <Project />
            <div
              className={styles.screenBtns}
              onClick={() => {
                block ? setBlock(null) : setBlock("3");
              }}
            >
              <OpenInFullIcon
                style={block ? { display: "none" } : { display: "block" }}
              />
              <CloseFullscreenIcon
                style={block ? { display: "block" } : { display: "none" }}
              />
            </div>
          </div>
        </div>
        <div
          className={styles.block}
          style={
            block
              ? block == "4"
                ? { width: "100%", height: "100vh", bottom: "0", right: "0" }
                : { display: "none" }
              : { bottom: "0", right: "0" }
          }
        >
          <div className={styles.content}>
            <Calendar />
            <div
              className={styles.screenBtns}
              onClick={() => {
                block ? setBlock(null) : setBlock("4");
              }}
            >
              <OpenInFullIcon
                style={block ? { display: "none" } : { display: "block" }}
              />
              <CloseFullscreenIcon
                style={block ? { display: "block" } : { display: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
