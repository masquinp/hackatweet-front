import styles from "../styles/Home.module.css";

function SignIn() {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div>
          <img src="image.jpg" alt="Description de l'image" />
          <h3 className={styles.soustitle}>Join Hackatweet today.</h3>
        </div>
        <div>
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
            placeholder="<Password"
          />
          <button type="submit">Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
