'use strict';
/*global window */

(function($) {

	window.app = (function() {
		var lat;
		var lng;

		var apiKey = '5f3e03a9d231522f4416bb6a877af13f';
		var apiURL ='https://api.forecast.io/forecast/';

		var pub = {};

		pub.init = function init() {
			//initialization
			document.addEventListener("deviceready", startUp, false);
		};

		function startUp() {
			//startup
			geoLocate();
		}

		function geoLocate() {
			navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
		}

		function geoSuccess(pos) {
			lat = pos.coords.latitude;
			lng = pos.coords.longitude;

			checkWeather(lat, lng);
		}

		function checkWeather(lat, lng) {
			var url = apiURL + apiKey + '/' + lat + ',' + lng;
			var data = {
				units : 'us'
			};

			$.ajax({
					url : url,
					type : 'GET',
					data : data,
					dataType : 'jsonp'
			}).done(function(result) {
				var content = '<div class="panel panel-default">' + 
	  				'<div class="panel-heading">' +
	   			 	'<h3 class="panel-title">Today</h3>' +
	 				'</div>' +
	  				'<div class="panel-body">' +
	    			Math.round(result.currently.temperature) + '&deg;' +
	 				'</div>' +
					'</div>';

					$('#weather').html(content)

					for(var i = 1, total = result.daily.data.length; i < total; i++) {
						var summary = result.daily.data[i].summary;
						var high = result.daily.data[i].temperatureMax;
						var low = result.daily.data[i].temperatureMin;

						var day = moment().add(i, 'days').format('dddd MMM Do YYYY');

						var content = '<div class="panel panel-default">' + 
			  				'<div class="panel-heading">' +
			   			 	'<h3 class="panel-title">' + day + '</h3>' +
			 				'</div>' +
			  				'<div class="panel-body">' +
			  				'<h3>' + summary + '</h3>' +
			    			'<p><strong>High</strong>:' + high + '<br />' +
			    			'<strong>Low</strong>:' + low + '<br /></p>' +
			 				'</div>' +
							'</div>';

							$('#weather').append(content);
					}
			});
		}

		function geoError(err) {
			alert('I could not locate you.');
		}

		return pub;
	}());

	$(document).ready(function() {
		app.init();



	});

})(window.jQuery)