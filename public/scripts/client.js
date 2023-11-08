/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1699300570697
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1699386970697
  }];
  
  // create a tweet
  const createTweetElement = function(tweetObj) {
    const $tweetArticle = $(`<article>`);
    
    const $header = $(`<header>`);
    const $profileDiv = $(`<div>`);
    const $profileImg = $(`<img>`);
    const $profileName = $(`<span>`);
    const $userName = $(`<span>`);
    
    const $main = $(`<main>`);
    const $bodyText = $(`<p>`);
    
    const $footer = $(`<footer>`);
    const $date = $(`<span>`);
    const $iconDiv = $(`<div>`);
    const $reportIcon = $(`<i>`);
    const $retweetIcon = $(`<i>`);
    const $likeIcon = $(`<i>`);

    // calculate difference in dates
    const currentDate = new Date();
    console.log(currentDate);
    const tweetDate = new Date(tweetObj.created_at);
    console.log(tweetDate);
    const diff = currentDate.getTime() - tweetDate.getTime();
    console.log(diff);
    const dayDiff = Math.round(diff / (1000 * 60 * 60 * 24));

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
    $date.text(`${dayDiff} ${dayDiff > 1 ? "days" : "day"} ago`);
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
    for (tweet of tweets) {
      $(".all-tweets").append(createTweetElement(tweet));
    }
  }

  renderTweets(data);
});