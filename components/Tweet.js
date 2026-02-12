import { useDispatch, useSelector } from 'react-redux';
import { addTweet, deleteTweet, likeTweet } from '../reducers/tweets';
import { useState } from 'react';
import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';



function Tweet(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [newTweet, setNewTweet] = useState('');

const handleClick = () => {
    if (!user.token) {
        alert("Vous devez être connecté pour tweeter !");
        return;
    } 
  fetch('http://localhost:3000/tweets/add', {
    method: 'POST', 
    headers: { 
        'Content-Type': 'application/json' }, 
        body: JSON.stringify({ token: user.token, content: newTweet }),
         }) 
         .then(response => response.json()) 
         .then(data => { 
            if (data.result) 
            { dispatch(addTweet(data.tweet)); 
                setNewTweet('');
             } else {
                 alert('Erreur : ' + data.error); } }) 
                
 };

 
 
 
  const handleDelete = () => {
    fetch('http://localhost:3000/tweets/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'},
            body: JSON.stringify({ token: user.token, tweetId: props._id }),
    }) 
    .then(response => response.json()) 
    .then(data => {
        if (data.result) 
        {
         dispatch(deleteTweet(props._id)); 
        }
     })}
   

const like = () => {
    fetch('http://localhost:3000/tweets/like', {
    method: 'POST', 
    headers: { 
        'Content-Type': 'application/json' }, 
        body: JSON.stringify({ token: user.token, tweetId: props._id }),
         }) 
         .then(response => response.json()) 
         .then(data => { 
            if (data.result) 
            { dispatch(likeTweet({tweetId: props._id})); 
             }
                 }) 
}

let heartIconStyle = { cursor : 'pointer' };

 return (
    <div>
        <div className={styles.addTweetContainer}>
         <input type="text" placeholder="What's up ?" onChange={(e) => setNewTweet(e.target.value)} value={newTweet}/>
         <button onClick={() => handleClick(props.tweet)}>Tweet</button>
      </div>
      <div className={styles.tweetContainer}>
        <span><FontAwesomeIcon icon={faHeart} onClick={() => like(props.tweet)} style={heartIconStyle} className="like" /></span>
        {props.username === user.username && (
        <span><FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(props.tweet)} className={styles.deleteBtn}/></span>
      )}
      </div>
   </div>
 );
  }

export default Tweet;