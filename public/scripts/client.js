/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // create a tweet
  const createTweetElement = function(tweetObj) {
    const $tweetArticle = $("<article>");
    
    const $header = $("<header>");
    const $profileDiv = $("<div>");
    const $profileImg = $("<img>");
    const $profileName = $("<span>");
    const $userName = $("<span>");
    
    const $main = $("<main>");
    const $bodyText = $("<p>");
    
    const $footer = $("<footer>");
    const $date = $("<span>");
    const $iconDiv = $("<div>");
    const $reportIcon = $("<i>");
    const $retweetIcon = $("<i>");
    const $likeIcon = $("<i>");

    // difference in dates
    const tweetDate = new Date(tweetObj.created_at);
    const dayDiff = timeago.format(tweetDate);

    // build tweet header
    $profileImg.attr("src", tweetObj.user.avatars);
    $profileName.text(tweetObj.user.name);
    $profileDiv.append($profileImg, $profileName);
    $userName.addClass("username");
    $userName.text(tweetObj.user.handle);
    $header.addClass("tweet-header");
    $header.append($profileDiv, $userName);

    // build tweet body
    $bodyText.text(tweetObj.content.text);
    $main.addClass("tweet-main");
    $main.append($bodyText);

    // build tweet footer
    $date.text(dayDiff);
    $reportIcon.addClass("fa-solid fa-flag");
    $retweetIcon.addClass("fa-solid fa-retweet");
    $likeIcon.addClass("fa-solid fa-heart");
    $iconDiv.append($reportIcon, $retweetIcon, $likeIcon);
    $footer.addClass("tweet-footer");
    $footer.append($date, $iconDiv);

    // build whole tweet
    $tweetArticle.append($header, $main, $footer);

    return $tweetArticle;
  }

  // loop through passed in array and append a new tweet to the page
  const renderTweets = function(tweets) {
    const $allTweets = $(".all-tweets");
    // reverse array so newest tweets are first
    const newestFirstTweets = tweets.toReversed();

    // empty the all-tweets section so the updated tweets can be rendered
    $allTweets.empty();
    
    for (tweet of newestFirstTweets) {
      $allTweets.append(createTweetElement(tweet));
    }
  }

  // form submit event handler
  const submitForm = function() {
    const $tweetForm = $("form");

    // event handler on form submit
    $tweetForm.on("submit", function(event) {
      event.preventDefault();

      // get value of textarea
      const formData = $(this).serialize();

      // if form is empty, alert user
      if (formData.length < 6) {
        return alert("Input is empty. Please enter at least one character.");
      }
      // if form input is longer than 140 characters, alert user
      if (formData.length > 145) {
        console.log(formData.length);
        return alert("Tweet is too long. Please shorten it and try again.");
      }
      
      // send POST request to /tweets
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData
      })
        // if request successful, call loadTweets
        .then(() => {
          loadTweets();
        })
        .catch(err => console.log(err));
    });
  }

  // load tweets
  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
    })
      .then(data => renderTweets(data));
  }

  loadTweets();
  submitForm();
});