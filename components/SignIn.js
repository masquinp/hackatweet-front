import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import Image from "next/image";

function SignIn({ onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const SignInConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername("");
          setSignInPassword("");
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
            id="username"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
            name="Username"
            placeholder="Username"
          />
          <input
            className={styles.password}
            type="password"
            id="password"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
            name="password"
            placeholder="Password"
          />
          <button
            className={styles.btnIn2}
            onClick={() => SignInConnection()}
            type="submit"
            >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
