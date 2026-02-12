import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTweet, likeTweet } from '../reducers/tweets';

function LastTweet(props) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const handleLike = () => {
        fetch('http://localhost:3000/tweets/like', {
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json' }, 
            body: JSON.stringify({ 
                token: user.token, 
                tweetId: props._id }),
             }) 
             .then(response => response.json()) 
             .then(data => { 
                if (data.result) 
                { dispatch(likeTweet({tweetId: props._id})); 
                 }
                     }) 
    }


     const handleDelete = () => {
        fetch('http://localhost:3000/tweets/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    token: user.token, 
                    tweetId: props._id}),
        }) 
        .then(response => response.json()) 
        .then(data => {
            if (data.result) 
            {
             dispatch(deleteTweet({ tweetId: props._id })); 
            }
         })}

         return (
            <div>
                <p><strong>{props.author?.username}</strong> : {props.content}</p>
             <span><FontAwesomeIcon icon={faHeart} onClick={() => handleLike()} style={{ cursor: 'pointer' }} className="like" /></span>
             {props.author?.username === user.username && (
             <span><FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete()} style={{ cursor: 'pointer', marginLeft: '10px' }} className={styles.deleteBtn}/></span> )}
            </div>
         )
       
}




export default LastTweet;