/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// for demo purposes
const tweets = 
[
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  for (let tweet of tweets) {
    $('#results').append(createTweetElement(tweet));
  }
}

const createTweetElement = (tweet) => {

  // const dateReadable = ${tweet.created_at}.toDateString();
  // console.log(dateReadable)
  // const dateReadable = (new Date(tweet.created_at)) => {

  // }

  let $tweet = `
  <article class="new-tweet-container">
  <header class="tw-header">
    <div class="user">
    <img src="${tweet.user.avatars}" class="icon">
      <div class="name">${tweet.user.name}</div>
    </div>
    <div class="tweet-handle">${tweet.user.handle}</div>
  </header>
  <p>${tweet.content.text}</p>
  <footer>
    <div class="date">${new Date(tweet.created_at)}</div>
    <div class="icons">
      <i class="fa fa-flag" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
  </footer>
</article>
`;

  return $tweet;

}






// const $tweet = createTweetElement(tweetObj);

// console.log($tweet); // to see what it looks like
// $('.new-tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


$(document).ready(function() {

  console.log("READY!!");

  renderTweets(tweets);

})