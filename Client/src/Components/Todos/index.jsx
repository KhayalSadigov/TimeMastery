import { useContext, useEffect, useState } from "react";
import { baseUrl, DataContext } from "../../Context/dataContext";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./index.module.scss";
import axios from "axios";
import { useFormik } from "formik";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PropTypes from "prop-types";
function Todos({ size }) {
  let store = useContext(DataContext);
  let [spin, setSpin] = useState(false);
  let [user, setUser] = useState(null);
  useEffect(() => {
    axios.get(baseUrl + "users/" + store.client.data).then((res) => {
      setUser(res.data);
    });
  }, []);
  let todoFormik = useFormik({
    initialValues: {
      text: "",
      priority: "none",
      done: false,
    },
    onSubmit: (values) => {
      user.todos.push(values);
      setUser(user);
      setSpin(true);
      axios.patch(baseUrl + "users/" + store.client.data, user).then(() => {
        todoFormik.resetForm();
        setSpin(false);
      });
    },
  });
  return (
    <div className={styles.todos}>
      <div className={styles.todoList}>
        <div className={styles.content}>
          {user ? (
            user && user.todos == 0 ? (
              <h1>No Todos</h1>
            ) : (
              user &&
              user.todos.map((e, i) => {
                return (
                  <Tooltip
                    key={i}
                    placement="left"
                    title={e.priority + " priority"}
                  >
                    <div
                      style={size == 1 ? { height: "calc(100% / 6)" } : {}}
                      className={styles.todo}
                    >
                      <div className={styles.body}>
                        <span
                          style={
                            e.priority == "none"
                              ? { color: "grey" }
                              : e.priority == "low"
                              ? { color: "green" }
                              : e.priority == "medium"
                              ? { color: "orange" }
                              : { color: "red" }
                          }
                        >
                          <FiberManualRecordIcon className={styles.priority} />
                        </span>
                        <p>
                          {e.done ? (
                            <del>{i + 1 + ") " + e.text}</del>
                          ) : (
                            i + 1 + ") " + e.text
                          )}
                        </p>
                        <div className={styles.btns}>
                          <button
                            style={size == 1 ? {} : { display: "none" }}
                            onClick={() => {
                              user.todos = user.todos.filter((el, index) => {
                                return index != i;
                              });
                              setUser(user);
                              todoFormik.resetForm();
                              axios
                                .patch(
                                  baseUrl + "users/" + store.client.data,
                                  user
                                )
                                .then(() => {});
                            }}
                            className={styles.del}
                          >
                            <Tooltip title={"delete"}>
                              <DeleteIcon fontSize="small" />
                            </Tooltip>
                          </button>

                          <button
                            style={
                              size == 1
                                ? e.done
                                  ? { backgroundColor: "grey" }
                                  : {}
                                : { display: "none" }
                            }
                            onClick={() => {
                              user.todos[i].done = !user.todos[i].done;
                              setUser(user);
                              todoFormik.resetForm();
                              axios
                                .patch(
                                  baseUrl + "users/" + store.client.data,
                                  user
                                )
                                .then(() => {});
                            }}
                            className={styles.mark}
                          >
                            <Tooltip title={'Mark as done'}>
                              <LibraryAddCheckIcon fontSize="small" />
                            </Tooltip>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Tooltip>
                );
              })
            )
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
      <form onSubmit={todoFormik.handleSubmit}>
        <input
          onChange={todoFormik.handleChange}
          name="text"
          value={todoFormik.values.text}
          maxLength={100}
          type="text"
          placeholder="Todo"
          required
        />
        <select
          name="priority"
          onChange={todoFormik.handleChange}
          value={todoFormik.values.priority}
        >
          <option value="none" selected hidden disabled>
            Priority
          </option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit" className={styles.add}>
          {spin ? <CircularProgress style={{ color: "white" }} /> : "Add"}
        </button>
      </form>
    </div>
  );
}
Todos.propTypes = {
  size: PropTypes.number.isRequired,
};
export default Todos;
