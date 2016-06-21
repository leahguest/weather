var data = require('./data');

function forEach(arr, cb) {
	for (var i = 0; i < arr.length; i++) {
		cb(arr[i]);
	}
}

function map(arr, cb) {
	var newArr = [];
	forEach(arr, function (value) {
		newArr[newArr.length] = cb(value);
	})
	return newArr;
}

function reduce(arr, cb) {
	var result = arr[0];
	for (var i = 1; i < arr.length; i++) {
		result = cb(result, arr[i]);
	}
	return result;
}

function filter(arr, cb) {

	var newArr = [];
	forEach(arr, function(value) {
		if (cb(value)) {
			newArr[newArr.length] = value;
		}
	})

	return newArr;
}

function sum(a,b) {
	return a + b;
}

function title(x, location, string) {
	 var equals = x - location.length - 1;
	 var sign = '';
	 for (var i = 0; i < equals; i++) {
	 	sign += string;
	 }
	 return location + ' ' + sign;
} 

function temp(k) {
	var f = k * (9/5) - 459.67;
	return Math.round(f);
}

function cardinal(deg) {
	if (deg > 0 && deg < 90) {
		return 'NE';
	} else if (deg === 90) {
		return 'E';
	} else if (deg > 90 && deg < 180) {
		return 'SE';
	} else if (deg === 180) {
		return 'S';
	} else if (deg > 180 && deg < 270) {
		return 'SW';
	} else if (deg === 270) {
		return 'W';
	} else if (deg > 270 && deg < 360) {
		return 'NW';
	} else {
		return 'N';
	}
}

function weatherInfo(location) {
	console.log(title(30, location.name, '='));
	console.log('   ' + location.weather[0].description);
	console.log('   ' + 'Temp: ' + temp(location.main.temp));
	console.log('   ' + 'Lo: ' + temp(location.main.temp_min) + ', Hi: ' + temp(location.main.temp_max));
	console.log('   ' + 'Humidity: ' + location.main.humidity + '%');
	console.log('   ' + 'Wind: ' + location.wind.speed + ' MPH ' + cardinal(location.wind.deg));
	console.log('==============================');
}

var sortArray = data['list'];

sortArray.sort(function(a,b) {
    if ( a.name < b.name )
        return -1;
    if ( a.name > b.name )
        return 1;
    return 0;
});

forEach(data.list, weatherInfo);

// AVERAGES

var averages = {
	name: 'Averages'
};

averages.weather = [{}];

averages.main = {};

averages.wind = {};

// weather description

function avgWeatherDescription () {
	var descriptions = map(data.list, function(x) {
		return x.weather[0].description;
	});

	return descriptions[0];
}

averages.weather[0].description = avgWeatherDescription();

// temperature

function avgTemp() {
	var temps = map(data.list, function(x) {
		return x.main.temp;
	});
	var avg = reduce(temps, sum) / temps.length;
	return avg;
}

averages.main.temp = avgTemp();

// minimum temp

function avgMin() {
	var mins = map(data.list, function(x) {
		return x.main.temp_min;
	});
	var avg = reduce(mins, sum) / mins.length;
	return avg;
}

averages.main.temp_min = avgMin();

// max temp

function avgMax() {
	var maxs = map(data.list, function(x) {
		return x.main.temp_max;
	});
	var avg = reduce(maxs, sum) / maxs.length;
	return avg;
}	

averages.main.temp_max = avgMax();

// humidity

function avgHumidity() {
	var humidity = map(data.list, function(x) {
		return x.main.humidity;
	});
	var avg = reduce(humidity, sum) / humidity.length;
	return Math.round(avg);
}

averages.main.humidity = avgHumidity();

// wind speed and direction

function avgSpeed() {
	var windSpeed = map(data.list, function(x) {
		return x.wind.speed;
	});
	var avg = reduce(windSpeed, sum) / windSpeed.length;
	return Math.round(avg);	
}

function avgDirection() {
	var windDirection = map(data.list, function(x) {
		return x.wind.deg;
	});
	var avg = reduce(windDirection, sum) / windDirection.length;
	return Math.round(avg);
}

averages.wind.speed = avgSpeed();
averages.wind.deg = avgDirection();

weatherInfo(averages);

// additional calculations
// lowest current temp and highest current temp
function loTemp () {
	var lo = reduce(data.list, function(a, x) {
		return a.main.temp_min < x.main.temp_min ? a : x;
	});

	return temp(lo.main.temp_min);
}

console.log('The lowest current temperature is ' + loTemp());

function hiTemp () {
	var hi = reduce(data.list, function(a, x) {
		return a.main.temp_max > x.main.temp_max ? a : x;
	});

	return temp(hi.main.temp_max);
}

console.log('The highest current temperature is ' + hiTemp());

// lowest humidity and highest humidity

function loHumidity () {
	var lo = reduce(data.list, function(a, x) {
		return a.main.humidity < x.main.humidity ? a : x;
	});

	return lo.main.humidity + '%';
}

function hiHumidity () {
	var hi = reduce(data.list, function(a, x) {
		return a.main.humidity > x.main.humidity ? a : x;
	});

	return hi.main.humidity + '%';
}

console.log('The lowest humidity is ' + loHumidity());
console.log('The highest humidity is ' + hiHumidity());

// lowest wind speed and highest wind speed with cardinal directions

function loWind () {
	var lo = reduce(data.list, function(a, x) {
		return a.wind.speed < x.wind.speed ? a : x;
	});

	return lo.wind.speed + ' MPH';
}

function hiWind () {
	var hi = reduce(data.list, function(a, x) {
		return a.wind.speed > x.wind.speed ? a : x;
	});

	return hi.wind.speed + ' MPH';
}

console.log('The lowest wind speed is ' + loWind());
console.log('The highest wind speed is ' + hiWind());



