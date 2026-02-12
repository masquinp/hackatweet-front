import styles from "../styles/Home.module.css";

function SignUp() {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div>
          <img className={styles.modalImg} src="/images/pngwing.png"
                    alt="Logo"
                    width={120}
                    height={120} /> 
          <h3 className={styles.soustitle}>Join Hackatweet today.</h3>
        </div>
        <div className={styles.buttonContainer}>
          <input
            className={styles.buble}
            type="text"
            id="firstname"
            name="Firstname"
            placeholder="Firstname"
          />
          <input
            className={styles.buble}
            type="text"
            id="username"
            name="Username"
            placeholder="Username"
          />
          <input
            className={styles.password}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <button className={styles.btnUp2} type="submit">Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
