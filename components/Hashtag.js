import { useDispatch, useSelector } from "react-redux";
import { searchHashtag, displayHashtags } from "../reducers/hashtags";
import { useState, useEffect } from "react";
import styles from "../styles/Hashtag.module.css";
import LastTweet from "./LastTweet";
import Trends from "./Trends";
import { logout } from "../reducers/user";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";

function Hashtag() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const tweets = useSelector((state) => state.tweets.value);
  const router = useRouter();

  const [searchHashtag, setSearchHashtag] = useState("");


  const displayHashtag = () => {
        fetch("http://localhost:3000/tweets")
      .then(res => res.json())
      .then(data => {
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

  const userSection = user.token ? (
    <div>
      <p>Welcome {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : null;

  const userTweets = tweets.filter(tweet => tweet.author.username === user.username);

  const hashtagData = userTweets
    .filter(tweet => tweet.content.toLowerCase().includes(searchHashtag.toLowerCase()))
    .map(tweet => {
      const isLiked = tweet.likes?.some(like => like.username === user.username) || false;
      return <LastTweet key={tweet._id} {...tweet} isLiked={isLiked} />;
    });


  return (
    <div>
       <main className={styles.main}>  
        <div className={styles.leftSection}>
          <Link href="/"  >
          <FontAwesomeIcon className={styles.twitterIcon} icon={faTwitter} />
          </Link>
             {userSection}
        </div>

        <div className={styles.middleSection}>
        <h2>Hashtag</h2>
          <div className={styles.searchHashtagContainer}>

           <input type="text" placeholder="search Hashtags" maxLength={280} onChange={(e) => setSearchHashtag(e.target.value)} value={searchHashtag}/>
          </div>

          <div className={styles.hashtagContainer}>
            {hashtagData.length > 0 ? hashtagData : <p>Aucun tweet trouvé</p>}
            </div>

      </div>
      <div className={styles.rightSection}>
        <h3>Trends</h3>
      </div>
      </main>
   </div>
  );
}

export default Hashtag;
