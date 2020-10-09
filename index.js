var http = require('http');
exports.handler = (event, context, callback) => {
	const city = event.currentIntent.slots["City"];
	const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=be97ab389e6883a0097c72b91dab5ffc&units=metric'
	var response = http.get(url, function(response){
		var body = '';
		response.on('data', function(chunk){
			body += chunk;	
		});
		
		if (event.currentIntent.slots.Introd){
		    
		}
		else{
		    response.statusCode = 200;
                response.body = {
                    "dialogAction": {
                        "type": "ElicitSlot",
                        "intentName": "CityWeather",
                        "slots": {
                            "City": null
                        },
                        "slotToElicit": "City"
                    }
                };
                // return callback(null, response.body);
		}
		response.on('end', function(){
			var response = JSON.parse(body);
			console.log("Got a Weather responce: "+response);
			var weather="Current weather  in "+response['name']+  " is: " +"temperature: "+Math.floor(response.main['temp'])+ " °C. " +response.weather[0]["description"]+", with humidity "+response.main["humidity"]+"%, preasure ";
			weather += response.main['pressure']+" Hectopascal. "
			var final ={
			    "sessionAttributes": event["sessionAttributes"],
					"dialogAction": {
						"type":"Close",
						"fulfillmentState":"Fulfilled",
						"message": {
							"contentType":"PlainText",
							"content" : weather + "Would you like to know another weather location?"
						}
					}
				}
			callback(null,final);
		});
		});
};
