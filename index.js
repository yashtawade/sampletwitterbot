// Dependencies
var twit = require('twit')
var config = require('./config.js')
var Twitter = new twit(config)

// q is the hashtagged tweet you want to retweet
var retweet = function () {
  var params = {
    q: '#Chelsea',  // REQUIRED
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('/search/tweets', params, function (err, data) {
      // if there no errors
    if (!err) {
      // grab ID of the tweet to retweet
      var tweets = data.statuses
      var randomTweet = random(tweets)
      // console.log(randomTweet)
      var retweetId = randomTweet.id_str
            // Tell Twitter to retweet
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function (err, response) {
        if (response) {
          console.log('Retweeted!!!')
        }
                // if there was an error while tweeting
        if (err) {
          console.log('Something went wrong while RETWEETING... Duplication maybe...')
        }
      })
    } else {
      console.log('Something went wrong while SEARCHING...')
    }
  })
}

retweet()
setInterval(retweet, 360000)

var favoriteTweet = function () {
  var params = {
    q: '#Chelsea',  // REQUIRED
    result_type: 'recent',
    lang: 'en'
  }
  // find the tweet
  Twitter.get('search/tweets', params, function (err, data) {
    var tweet = data.statuses    // Find tweets
    var randomTweet = random(tweet) // Picks a random tweet to be favorited

    // if random tweet exists
    if (typeof randomTweet !== 'undefined') {
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function (err, response) {
        // if there was an error while 'favorite'
        if (err) {
          console.log('Unable to favorite the tweet')
        } else {
          console.log('Favorited some tweet')
        }
      })
    }
  })
}
// grab & 'favorite' as soon as program is running...
favoriteTweet()
setInterval(favoriteTweet, 3600000)

// function to generate a random tweet tweet
function random (arr) {
  var index = Math.floor(Math.random() * arr.length)
  return arr[index]
}
