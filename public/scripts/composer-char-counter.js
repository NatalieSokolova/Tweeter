
$(document).ready(function() {

  // selector => #tweet-text is my form textarea
  // section => new-tweet
  // button = anonymous (in tweet-form-footer)
  // counter = counter (in tweet-form-footer)
  // event is change or blur
  // use .this, make sure it's capturing the right thing
  const $tweetText = ('#tweet-text');
  
  $($tweetText).on('keydown', function(event) {
    //console.log( $(this).val().length); //logs the char in textarea
    const charLength = $(this).val().length;
    const $textArea = $(this);
    const $tweetForm = $textArea.closest('form');
    const $counter = $tweetForm.find('.counter');
    
    console.log("textArea", $textArea);
    console.log("tweetForm", $tweetForm);
    console.log("counter:", $counter);
    $counter.html(140-charLength)

    if (charLength > 140) {
      $counter.addClass("red"); 
    } else {
      $counter.removeClass("red");
    }
    
  })
  // need to append tweet to initial-tweets.json
  // 
});