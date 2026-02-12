import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const tweetsSlice = createSlice({
	name: 'tweets',
	initialState,
	reducers: {
		addTweet: (state, action) => {
			state.value.push(action.payload);
		},
		deleteTweet: (state, action) => {
			state.value = state.value.filter(tweet => tweet._id !== action.payload.tweetId);
		},
        likeTweet: (state, action) => {
        const tweet = state.value.find(tweet => tweet._id === action.payload.tweetId);
        if (tweet) {
            tweet.likes += 1;
        }
        }

	},
});

export const { addTweet, deleteTweet, likeTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;