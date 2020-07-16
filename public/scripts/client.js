const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#results').empty();

  tweets.reverse().forEach(tweet => $('#results').append(createTweetElement(tweet)))
}

// puts a new tweet in a new-tweet-container
const createTweetElement = (tweet) => {
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

  //shows/hides new tweeter form on click of red arrow in nav
  $(".nav-btn").on("click", () => {
    $("form.tweets").slideToggle("slow")
  })

  $('form').on('submit', (event) => {

    event.preventDefault();
  
    // user's input into the text field
    const input = event.currentTarget[0].value;
  
    // removes previous error msgs before validation
    $( "#empty-error" ).hide( "slow")
    $( "#long-error" ).hide( "slow")

    //validate before submission
    if (!input) {
      $( "#empty-error" ).slideDown( "slow")
    } else if (input.length > 140) {
      $( "#long-error" ).slideDown( "slow")
    } else {
      $.ajax({
        url: `http://localhost:8080/tweets`,
        method: 'POST',
        data: $('form').serialize(),
      }).then(() => {
        loadTweets();
      }).catch((error) => console.log(error));

      // clears the form after submission
      $('form').trigger('reset');
    }
    
  })

  const loadTweets = function () {

    $.ajax({
      url: `http://localhost:8080/tweets`,
      method: 'GET',
      data: $('form').serialize(),
    }).then((response) => {
      // console.log('response: ', response);
      renderTweets(response);
    }).catch((error) => console.log(error));

  }

})