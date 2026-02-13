import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const tweetsSlice = createSlice({
	name: 'tweets',
	initialState,
	reducers: {
		addTweet: (state, action) => {
			state.value.unshift(action.payload);
		},
		deleteTweet: (state, action) => {
  state.value = state.value.filter(
    tweet => tweet._id !== action.payload.tweetId
  );
},
		likeTweet: (state, action) => {
       const tweet = state.value.find(
       tweet => tweet._id === action.payload.tweetId
          );
        if (tweet) {
          const alreadyLiked = tweet.likes.some(user => user.username === action.payload.username);
          if (alreadyLiked) {
            tweet.likes = tweet.likes.filter(user => user.username !== action.payload.username);
          } else {
         tweet.likes.push({ username: action.payload.username });
     }}
     },
    
      displayTweets: (state, action) => {state.value = action.payload; 

		}

	},
});

export const { addTweet, deleteTweet, likeTweet, displayTweets } = tweetsSlice.actions;
export default tweetsSlice.reducer;