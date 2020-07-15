/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetObj = {
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
}


const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  for (let tweet of tweets) {
    $('#results').append(createTweetElement(tweet));
  }
}


const createTweetElement = (tweetObj) => {

  const item = `
  <article class="new-tweet-container">
  <header class="tw-header">
    <div class="user">
<div class="icon">${tweetObj.user.avatars}</div>
      <div class="name">${tweetObj.user.name}</div>
    </div>
    <div class="tweet-handle">${tweetObj.user.handle}</div>
  </header>
  <p>${tweetObj.content.text}</p>
  <footer>
    <div class="date">${tweetObj.created_at}</div>
    <div class="icons">
      <i class="fa fa-flag" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
  </footer>
</article>
`;

  return item;

}

const $tweet = createTweetElement(tweetObj);

console.log($tweet); // to see what it looks like
$('.new-tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.



$(document).ready(function () {

  console.log("READY!!");

})