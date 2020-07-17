const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#results').empty();

  tweets.reverse().forEach(tweet => $('#results').append(createTweetElement(tweet)))
}

// puts a new tweet in a new-tweet-container
const createTweetElement = (tweet) => {
  //date from database
  let dbDate = tweet.created_at;
  //relative time using moment.js
  let readableDate = moment(dbDate).fromNow();
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
    <div class="date">${readableDate}</div>
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
  /* appears on scroll and takes you to the top on click and enables text area*/
  // button.scrollup-btn
  const btn = $('button.scrollup-btn')
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.show();
    } else {
      btn.hide();
    }
  });

  //on click the page scrolls up and text fiels is enabled
  btn.on('click', function (event) {
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
    $("form.tweets").slideDown()
    $("#tweet-text").focus();
  });



  //shows/hides and enables new tweeter form on click of red arrow in nav
  $(".nav-btn").on("click", () => {
    $("form.tweets").slideToggle("slow");
    $("#tweet-text").focus();
  })

  // POST request
  $('form.tweets').on('submit', (event) => {

    event.preventDefault();

    const input = $('#tweet-text');

    // removes previous error msgs before validation
    $("#empty-error").hide("slow")
    $("#long-error").hide("slow")

    //validate before submission
    if (!input.val()) {
      $("#empty-error").slideDown("slow")
    } else if (input.val().length > 140) {
      $("#long-error").slideDown("slow")
    } else {

      // Preventing XSS with Escaping
      const p = document.createElement('p');
      p.appendChild(document.createTextNode(input.val()));

      $.ajax({
        url: `http://localhost:8080/tweets`,
        method: 'POST',
        data: { text: p.innerHTML }
      }).then(() => {
        loadTweets();
      }).catch((error) => console.log(error));


      // clears the form after submission
      $('form.tweets').trigger('reset');

      // resets character count to 140
      $('.counter').text(140);
    }

  })

  // GET request
  const loadTweets = function () {

    $.ajax({
      url: `http://localhost:8080/tweets`,
      method: 'GET',
      data: $('#tweet-text').serialize(),
    }).then((response) => {

      renderTweets(response);
    }).catch((error) => console.log(error));

  }
  // loads tweets when page is refreshed
  loadTweets()

})