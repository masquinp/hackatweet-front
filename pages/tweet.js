import Tweet from '../components/Tweet';

function TweetPage() {

  const testData = {
    content: "Mon premier tweet sur Hackatweet ! #First #React",
    author: { 
      firstname: "Elsa", 
      username: "elsab" 
    },
    likes: []
  };
  return <Tweet tweet={testData} />;
}

export default TweetPage;