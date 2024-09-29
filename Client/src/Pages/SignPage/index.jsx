/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import styles from "./index.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";     
import { baseUrl, DataContext } from "../../Context/dataContext";
import signUpValidation from "../../Validation/signUpValidation";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';

function SignPage() {      
  const [signMode, setSignMode] = useState("up");
  const [upSpin,setUpSpin] = useState(false)
  const [inSpin,setInSpin] = useState(false)
  const [upError, setUpError] = useState("");
  const [inError, setInError] = useState("");
  const [upPass, setUpPass] = useState(true);
  const [inPass, setInPass] = useState(true);
  let store = useContext(DataContext);
  if(store.client.data){
    window.location.replace('/home')
  }
  const signInFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setInSpin(true)
      axios
        .post(baseUrl + "users/login", {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          setInSpin(false)
          if(res.data.status){
            localStorage.setItem('TMuser',JSON.stringify(res.data.data._id))
            store.client.set(res.data.data) ;
            signUpFormik.resetForm() ;  
          }
          else{
            setInError(res.data.mess)
          }
        });
    },
  });

  const signUpFormik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      username: "",
      password: "",
    },
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      setUpSpin(true)
      let bool = true;
      store.users.data.map((e) => {
        if (e.email == values.email || e.username == values.username) {
          bool = false;
        }
      });
      if (!bool) setUpError("Email or Username are already used!");
      else {
        axios
        .post(baseUrl+"users", {
          fullname: values.fullname,
          username: values.username,
          password: values.password,
          email: values.email,
          todos : [] ,
          notes : []
        })
        .then(() => {
          axios.get(baseUrl+"users").then((res) => {
            store.users.set(res.data);
            setUpSpin(false)
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
              setSignMode("in");
              signUpFormik.resetForm();
            });
          });
      }
    },
  });

  return (
    <div className={styles.signpage}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.sign}>
            <div className={styles.signIn}>
              <div>
                <h1>Log in to your account!</h1>
              </div>
              <form onSubmit={signInFormik.handleSubmit}>
                <p>{inError}</p>
                <TextField
                  className={styles.input}
                  label="Username"
                  variant="outlined"
                  name="username"
                  onChange={signInFormik.handleChange}
                  value={signInFormik.values.username}
                />
                <div className={styles.pass}>
                  <TextField
                    name="password"
                    onChange={signInFormik.handleChange}
                    value={signInFormik.values.password}
                    className={styles.input}
                    label="Password"
                    variant="outlined"
                    type={inPass ? "password" : "text"}
                  />
                  <RemoveRedEyeIcon
                    className={styles.eye}
                    onClick={() => {
                      setInPass(!inPass);
                    }}
                    style={inPass ? { color: "grey" } : { color: "blue" }}
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  className={styles.button}
                >
                  {inSpin ? <CircularProgress style={{color:"white"}}/> : "Log in!"}
                </Button>
              </form>
              <div className={styles.footer}>
                <div className={styles.tape}>
                  <span></span>
                  <p>or</p>
                  <span></span>
                </div>
                <p
                  onClick={() => {
                    setSignMode("up");
                  }}
                >
                  Don't have an account?{" "}
                  <span style={{ color: "blue" }}>Sign up!</span>
                </p>
              </div>
            </div>
            <div
              className={styles.banner}
              style={signMode == "up" ? { left: "0" } : { left: "50%" }}
            >
              <h1>Welcome to TimeMastery</h1>
              <p>Master Your Minutes, Achieve Your Goals!</p>
            </div>
            <div className={styles.signUp}>
              <div className={styles.header}>
                <h1>Create a account!</h1>
              </div>
              <form onSubmit={signUpFormik.handleSubmit}>
                <p>{upError}</p>
                <TextField
                  className={styles.input}
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={signUpFormik.handleChange}
                  value={signUpFormik.values.email}
                />
                <p>
                  {signUpFormik.errors.email ? signUpFormik.errors.email : " "}
                </p>
                <TextField
                  className={styles.input}
                  label="Full name"
                  variant="outlined"
                  name="fullname"
                  onChange={signUpFormik.handleChange}
                  value={signUpFormik.values.fullname}
                />
                <p>
                  {signUpFormik.errors.fullname
                    ? signUpFormik.errors.fullname
                    : " "}
                </p>
                <TextField
                  className={styles.input}
                  label="Username"
                  variant="outlined"
                  name="username"
                  onChange={signUpFormik.handleChange}
                  value={signUpFormik.values.username}
                />
                <p>
                  {signUpFormik.errors.username
                    ? signUpFormik.errors.username
                    : " "}
                </p>
                <div className={styles.pass}>
                  <TextField
                    className={styles.input}
                    label="Password"
                    variant="outlined"
                    name="password"
                    onChange={signUpFormik.handleChange}
                    value={signUpFormik.values.password}
                    type={upPass ? "password" : "text"}
                  />
                  <RemoveRedEyeIcon
                    className={styles.eye}
                    onClick={() => {
                      setUpPass(!upPass);
                    }}
                    style={upPass ? { color: "grey" } : { color: "blue" }}
                  />
                </div>
                <p>
                  {signUpFormik.errors.password
                    ? signUpFormik.errors.password
                    : " "}
                </p>
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.button}
                >
                  {upSpin ? <CircularProgress style={{color:"white"}}/> : "Sign up!"}
                </Button>
              </form>
              <div className={styles.footer}>
                <div className={styles.tape}>
                  <span></span>
                  <p>or</p>
                  <span></span>
                </div>
                <p
                  onClick={() => {
                    setSignMode("in");
                  }}
                >
                  Have an account?{" "}
                  <span style={{ color: "blue" }}>Log in! </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignPage;
