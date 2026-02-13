import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const hashtagsSlice = createSlice({
	name: 'hashtag',
	initialState,
	reducers: {
		searchHashtag: (state, action) => {
			state.value.unshift(action.payload);
		},
		deleteHashtag: (state, action) => {
  state.value = state.value.filter(
    tweet => tweet._id !== action.payload.tweetId
  );
},
		likeHashtag: (state, action) => {
         const hashtag = state.value.find(
           tweet => tweet._id === action.payload.tweetId
             );
             if (hashtag) {
               hashtag.likes.push({ username: action.payload.username });
     }
     },
    
      displayHashtags: (state, action) => {state.value = action.payload; 

		}

	},
});

export const { searchHashtag, deleteHashtag, likeHashtag, displayHashtags } = hashtagsSlice.actions;
export default hashtagsSlice.reducer;