import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import Image from "next/image";

function SignUp({ onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const SignUpRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: signUpFirstname,
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: signUpUsername,
              firstname: signUpFirstname,
              token: data.token,
            }),
          );
          setSignUpFirstname("");
          setSignUpUsername("");
          setSignUpPassword("");
          onClose();
        }
      });

    const handleLogout = () => {
      dispatch(logout());
    };
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div>
          <Image
            className={styles.modalImg}
            src="/images/pngwing.png"
            alt="Logo"
            width={120}
            height={120}
          />
          <h3 className={styles.soustitle}>Join Hackatweet today.</h3>
        </div>
        <div className={styles.buttonContainer}>
          <input
            className={styles.buble}
            type="text"
            id="firstname"
            onChange={(e) => setSignUpFirstname(e.target.value)}
            value={signUpFirstname}
            placeholder="Firstname"
          />
          <input
            className={styles.buble}
            type="text"
            id="username"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
            placeholder="Username"
          />
          <input
            className={styles.password}
            type="password"
            id="password"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
            placeholder="Password"
          />
          <button
            className={styles.btnUp2}
            onClick={() => SignUpRegister()}
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
