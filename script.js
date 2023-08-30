var i;
var route;
var map = L.map('mapid', {
	setView: true,
  center: [35, 138],
  zoom: 17
});
var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
});
tileLayer.addTo(map);

alert('周りに気を付けて走行しましょう');


navigator.geolocation.watchPosition(function (position) {
  var userLongitude = position.coords.longitude;
  var userLatitude = userLatitude = position.coords.latitude;
  var api = "https://api.openweathermap.org/data/2.5/weather?lat=" + userLatitude + "&lon=" + userLongitude + "&lang=ja&appid=42f4c0d0751aec9a6be5fd8050304213";
	
  $.getJSON(api, function (data) {
    var tempKelvin = data.main.temp;
    var tempCelsius = (tempKelvin - 273.15).toFixed(0);
    var userWeatherType = data.weather[0].description;
    $('#userTemp').html("温度: &nbsp;" + tempCelsius + " \xB0" + "C");
    const Etemp = userWeatherType;
    $('#userWeatherType').html("天候: &nbsp;" + Etemp);
  });
	  var Speed = position.coords.speed || 0;
	Speed = Speed * 3.6;
    $('#userSpeed').html("速度: &nbsp;" + Speed.toPrecision(3) + "km/h");
	
  if (i) {
    i.setLatLng([position.coords.latitude,position.coords.longitude])
  }else{
  i = L.marker([position.coords.latitude,position.coords.longitude]).addTo(map).bindPopup("現在地");	map.setView([position.coords.latitude,position.coords.longitude],17);
	}
});

map.on('locationerror', ()=>{
	alert(e.message);
});


map.on('click', (e)=>{
	  if (route) {
    map.removeControl(route);
  }
  route = L.Routing.control({
    waypoints: [
      L.latLng(i._latlng.lat, i._latlng.lng),
      L.latLng(e.latlng.lat, e.latlng.lng)
    ],
    routeWhileDragging: true
  }).addTo(map);
});
