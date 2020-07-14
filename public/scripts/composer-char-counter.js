$(document).ready(function() {
  const $tweetText = ('#tweet-text');
  
  $($tweetText).on('keypress', function(event) {
    // length of input text
    const charLength = $(this).val().length;

    // form itself
    const $textArea = $(this);

    // goes up the DOM tree to find the element matching the selector
    const $tweetForm = $textArea.closest('form');

    // accesses counter
    const $counter = $tweetForm.find('.counter');
    
    // console.log("textArea", $textArea);
    // console.log("tweetForm", $tweetForm);
    // console.log("counter:", $counter);
    $counter.html(140-charLength)

    // color changes in counter
    if (charLength > 140) {
      // added class to style in CSS if count is over 140
      $counter.addClass("red"); 
    } else {
      $counter.removeClass("red");
    }
    
  })
});