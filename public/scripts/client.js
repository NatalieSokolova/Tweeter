/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetObj) => {

  <article class="new-tweet-container">
  <header class="tw-header">
    <div class="user">
<div class="icon">${tweetObj.user.avatars}</div>
      <div class="name">${tweetObj.user.name}</div>
    </div>
    <div class="tweet-handle">${tweetObj.user.handle}</div>
  </header>
  <p>${tweetObj.user.text}</p>
  <footer>
    <div class="date">${tweetObj.user.created_at}</div>
    <div class="icons">
      <i class="fa fa-flag" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
  </footer>
</article>

}