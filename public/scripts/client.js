/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// for demo purposes
// const tweets = []

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#results').empty();
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
 

$(document).ready(function () {
  $('form').on('submit', (event) => {
    event.preventDefault();
  
    console.log('event: ', event)
  
    console.log('form', $('form'))
  
    console.log('input: ', event.currentTarget[0].value)

    //validate before submission
    const input = event.currentTarget[0].value;

    if (!input) {
      alert('Sorry, you can not submit an empty tweet!')
    } else if (input.length > 140) {
      alert('Oops! Your tweet is too long. Maximum length is 140 characters')
    }
  
    $.ajax({
      url: `http://localhost:8080/tweets`,
      method: 'POST',
      data: $('form').serialize(),
    }).then(() => {
      loadTweets();
    }).catch((error) => console.log(error));
  
  })


  const loadTweets = function() {

      $.ajax({
        url: `http://localhost:8080/tweets`,
        method: 'GET',
        data: $('form').serialize(),
      }).then((response) => {
        console.log('response: ', response);
        renderTweets(response);
      }).catch((error) => console.log(error));
    // })
}

  // renderTweets(tweets);

  //loadTweets()

  // console.log("READY!!");

})