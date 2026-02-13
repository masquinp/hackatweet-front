import styles from "../styles/LastTweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteTweet, likeTweet } from "../reducers/tweets";
import ReactHashtag from "react-hashtag";
import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";

function LastTweet(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();
  const timeElapsed = moment(props.createdAt).fromNow();

  const handleLike = () => {
    fetch("http://localhost:3000/tweets/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
        tweetId: props._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(likeTweet({ tweetId: props._id, username: user.username }));
        }
      });
  };

  let heartIconStyle = {};
  if (props.isLiked) {
    heartIconStyle = { color: "red", cursor: "pointer" };
  }

  const handleDelete = () => {
    fetch("http://localhost:3000/tweets/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
        tweetId: props._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(deleteTweet({ tweetId: props._id }));
        }
      });
  };

  return (
    <div className={styles.tweetBox}>
      <div className={styles.tweetHeader}>
        <div className={styles.profilePic}>
          <Image
            src="/images/egg.jpg"
            alt="Profile Picture"
            width={40}
            height={40}
            style={{ borderRadius: "40%", margin: "15px" }}
          />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.username}>{props.author?.username}</span>
          <span className={styles.handle}>
            @{props.author?.username} • {timeElapsed}
          </span>
        </div>
      </div>
      <div className={styles.tweetContent}>
        <ReactHashtag
          onHashtagClick={(hash) => props.selectHashtag(hash)}
          renderHashtag={(hashtagValue) => (
            <span
              style={{
                color: "#1d9bf0",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {hashtagValue}
            </span>
          )}
        >
          {props.content}
        </ReactHashtag>
      </div>
      <div className={styles.actions}>
        <span>
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => handleLike()}
            style={{ ...heartIconStyle, cursor: "pointer" }}
            className="like"
          />
          <span className={styles.likeCount}>{props.likes?.length || 0}</span>
        </span>
        {props.author?.username === user.username && (
          <span>
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => handleDelete()}
              style={{ cursor: "pointer", marginLeft: "10px" }}
              className={styles.deleteBtn}
            />
          </span>
        )}
      </div>
    </div>
  );
}

export default LastTweet;
