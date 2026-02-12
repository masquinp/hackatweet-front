import styles from "../styles/Home.module.css";

function SignUp() {
  return (
    <div className={styles.modalContainer}> 
      <div>
        <img src="image.jpg" alt="Description de l'image" />
        <h3 className={styles.soustitle}>Join Hackatweet today.</h3>
      </div>
      <div>
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
  );
}

export default SignUp;
