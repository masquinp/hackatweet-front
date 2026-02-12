import { useDispatch, useSelector } from 'react-redux';
import { addTweet, deleteTweet, likeTweet } from '../reducers/tweets';
import { useState } from 'react';
import styles from '../styles/Tweet.module.css';



function Tweet(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);

    const [newTweet, setNewTweet] = useState('');

const handleClick = () => {
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

 
 
 
  const handleDelete = (tweet) => {
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
         dispatch(deleteTweet(props.tweetId)); 
        }
     })
   

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

 return (
    <div>
        <div className={styles.addTweetContainer}>
         <input type="text" placeholder="What's up ?" onChange={(e) => setNewTweet(e.target.value)} value={newTweet}/>
         <button onClick={() => handleClick(props.tweet)}>Tweet</button>
      </div>
      <div className={styles.tweetContainer}>
        <button onClick={() => like(props.tweet)}>Like</button>
        <button onClick={() => handleDelete(props.tweet)}>Delete</button>
      </div>
   </div>
 );
}
}
export default Tweet;