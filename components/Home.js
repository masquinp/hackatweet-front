import { useState } from "react";
import styles from "../styles/Home.module.css";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

function Home() {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  return (
    <div>
      <div>
        <img src="image.jpg" alt="Description de l'image" />
      </div>
      <div>
        <main className={styles.main}>
          <div>
            <img src="image.jpg" alt="Description de l'image" />
          </div>
          <div>
            <h1 className={styles.title}>See What's happening</h1>
          </div>
          <h3 className={styles.soustitle}>Join Hackatweet today.</h3>
          <button onClick={() => setOpenSignUp(true)} type="button">
            Sign up
          </button>
          <h6 className={styles.soussoustitle}>Already have an account?</h6>
          <button onClick={() => setOpenSignIn(true)} type="button">
            Sign in
          </button>
        </main>
      </div>
     {openSignUp && <SignUp onClose={() => setOpenSignUp(false)} />}
  {openSignIn && <SignIn onClose={() => setOpenSignIn(false)} />}
    </div>
  );
}

export default Home;
