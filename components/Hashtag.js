import { useDispatch, useSelector } from "react-redux";
import { searchHashtag, displayHashtags } from "../reducers/hashtags";
import { useState, useEffect } from "react";
import styles from "../styles/Hashtag.module.css";
import LastTweet from "./LastTweet";
import Trends from "./Trends";
import { logout } from "../reducers/user";
import { useRouter } from "next/router";

import Link from "next/link";
import Image from "next/image";

function Hashtag() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const tweets = useSelector((state) => state.tweets.value);
  const router = useRouter();

  const [newTweet, setNewTweet] = useState("");

  const handleClick = () => {
    if (!user.token) {
      alert("Vous devez être connecté pour tweeter !");
      return;
    }
    fetch("http://localhost:3000/tweets/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: user.token, content: newTweet }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(searchHashtag(data.tweet));
          setNewTweet("");
        } else {
          alert("Erreur : " + data.error);
        }
      });
  };

  const displayHashtag = () => {
    fetch("http://localhost:3000/tweets")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(displayHashtags(data.tweets));
        }
      });
  };

  useEffect(() => {
    displayHashtag();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  let userSection;
  if (user.token) {
    userSection = (
      <div className={styles.logoutSection}>
        <p>Welcome {user.username} / </p>
        <button className={styles.btnLogout} onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    );
  }

  const twitterData = tweets.map((data, i) => {
    const isLiked = data.likes.some((like) => like.username === user.username);
    return <LastTweet key={data._id} {...data} isLiked={isLiked} />;
  });

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.leftSection}>{userSection}</div>

        <div className={styles.middleSection}>
          <Link href="/">
            <Image
              src="/images/pngwing.png"
              alt="Logo"
              width={120}
              height={120}
            />
          </Link>
          <div className={styles.addTweetContainer}>
            <input
              type="text"
              placeholder="What's up ?"
              onChange={(e) => setNewTweet(e.target.value)}
              value={newTweet}
            />
            <button onClick={() => handleClick()}>Tweet</button>
          </div>
          <div className={styles.tweetContainer}>{twitterData}</div>
          <div className={styles.tweetContainer}></div>
        </div>
        <div className={styles.rightSection}>
          <h3>Trends</h3>
        </div>
      </main>
    </div>
  );
}

export default Hashtag;
