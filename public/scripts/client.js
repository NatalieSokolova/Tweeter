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
  /* appears on scroll and takes you to the top on click and enables text area*/
  // button.scrollup-btn
  const btn = $('button.scrollup-btn')
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btn.show();
    } else {
      btn.hide();
    }
  });

  btn.on('click', function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
    $("form.tweets").slideDown()
    $("#tweet-text").focus();
  });



  //shows/hides new tweeter form on click of red arrow in nav
  $(".nav-btn").on("click", () => {
    $("form.tweets").slideToggle("slow");
    $("#tweet-text").focus();
  })


  $('form.tweets').on('submit', (event) => {

    event.preventDefault();
  
    // user's input into the text field
    // const input = event.currentTarget[0].value;
    const input = $('#tweet-text');
  
    // removes previous error msgs before validation
    $( "#empty-error" ).hide( "slow")
    $( "#long-error" ).hide( "slow")

    //validate before submission
    if (!input.val()) {
      console.log('input: ', input.val())
      $( "#empty-error" ).slideDown( "slow")
    } else if (input.val().length > 140) {
      $( "#long-error" ).slideDown( "slow")
    } else {
      //AFTER
      const p = document.createElement('p');
      p.appendChild(document.createTextNode(input.val()));
      // const safeInput = $("<div>").text(input.val());
      // console.log(safeInput.innerHTML)

      $.ajax({
        url: `http://localhost:8080/tweets`,
        method: 'POST',
        data: { text: p.innerHTML }
      }).then(() => {
        loadTweets();
      }).catch((error) => console.log(error));

      // BEFORE
      // $.ajax({
      //   url: `http://localhost:8080/tweets`,
      //   method: 'POST',
      //   data: $('form').serialize(),
      // }).then(() => {
      //   loadTweets();
      // }).catch((error) => console.log(error));

      // // clears the form after submission
      // $('form').trigger('reset');

      // // ???
      // // $('.counter').trigger('reset');
      // $('.counter').text(140);



      // clears the form after submission
      $('form.tweets').trigger('reset');

      // resets character count to 140
      $('.counter').text(140);
    }
    
  })

  const loadTweets = function () {

    $.ajax({
      url: `http://localhost:8080/tweets`,
      method: 'GET',
      data: $('#tweet-text').serialize(),
    }).then((response) => {
      // console.log('response: ', response);
      renderTweets(response);
    }).catch((error) => console.log(error));

  }

  loadTweets()

})