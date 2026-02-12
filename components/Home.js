import { useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

function Home() {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.gauche}>
        <Image
          src="/images/twitter.jpg"
          alt="Logo"
          width={120}
          height={120}
        />
      </div>

      <div className={styles.droit}>
        <main className={styles.main}>
          <div>
            <img src="/images/pngwing.com.png"
          alt="Logo"
          width={120}
          height={120} />
          </div>
          <div>
            <h1 className={styles.title}>See What's happening</h1>
          </div>
          <h3 className={styles.soustitle}>Join Hackatweet today.</h3>
          <button className={styles.btnUp} onClick={() => setOpenSignUp(true)} type="button">
            Sign up
          </button>
          <h6 className={styles.soussoustitle}>Already have an account?</h6>
          <button className={styles.btnIn} onClick={() => setOpenSignIn(true)} type="button">
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
