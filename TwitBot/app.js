//app.js
var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);


var params = {
	//q: '#nodejs',
	q: 'I support Trump',
	count: 100,
	result_type: 'recent',
	lang: 'en'
}

T.get('search/tweets',params,function(err,data,response){
if (!err){
	//This is where the magic happens
	//Loop through returned tweets
	var msglen = 100;
	var max_tweets = 1;
	var count = 0;
	var found = false;
	var list = ['I Support Trump','I support President Trump','I Support President Trump','I support trump'];
	var index = -1;
	for (let i=0; i < data.statuses.length; i++){
		found = false;
		// Get the tweet ID from the returned data
		let id = { id : data.statuses[i].id_str }
		
		for( let j=0; j<list.length; j++) {
			if( -1 != data.statuses[i].text.indexOf( list[j] ) ) {
			console.log( list[j] + ' has identifier value : '+ index );
			found = true;
			}
		}
		
		if ( found && count < max_tweets ) {
			console.log('-');
			console.log('-----------------------------------------------');
			count = count + 1;
			index = 0;
			while (index < data.statuses[i].text.length){
				console.log(data.statuses[i].text.slice(index,index+msglen));
				index = index + msglen;
			}
			console.log(data.statuses[i].id_str + " : is the ID string.");
			console.log(data.statuses[i].text.slice(0,5));
			console.log('Found I support Trump' );
			//Try to favorite the selected Tweet
			T.post('favorites/create',id,function(err,response){
				//If favorite fails, log error
				if (err) { console.log(err[0].message); }
				else {
					let username = response.user.screen_name;
					let tweetID = response.id_str;
					console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetID}`);
       				}
    				});
			console.log('-----------------------------------------------');
			console.log('-');
			console.log(' ');
			

			user = data.statuses[i].user;
			console.log(user);

			var tweet = {
//				place: {    "attributes":{},     "bounding_box":    {        "coordinates":        [[                [-77.119759,38.791645],                [-76.909393,38.791645],                [-76.909393,38.995548],                [-77.119759,38.995548]        ]],        "type":"Polygon"    },     "country":"United States",     "country_code":"US",     "full_name":"Washington, DC",     "id":"01fbe706f872cb32",     "name":"Washington",     "place_type":"city",     "url": "http://api.twitter.com/1/geo/id/01fbe706f872cb32.json"},
				in_reply_to_screen_name: user.screen_name,
				in_reply_to_status_id: user.id,
				status: '@' + user.screen_name + ': My name is Chernee Pachoobity! I think Trump supporters are lame!' };

			T.post('statuses/update', tweet, function(err,response){
				//If status fails, log error
				if (err) { console.log(err[0].message);}
				else {
					console.log('Tweet completed...?');
				}});

			console.log('Response : ' + tweet.status);
		} else { index = 0;}
	 	}
} else {
	console.log(err);
}
})

