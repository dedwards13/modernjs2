/*class Weather {
  constructor(city, state) {
    this.apiKey = '1d04cee8b1f03df6a939a49a136b8f12';
    this.city = city;
    this.state = state;
  }

  // Fetch weather from API
  async getWeather() {
    // const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${this.apiKey}.json`);
    // http://api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}
    const response = await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/56186?apikey=9iHAYolfpIZFCHqIL7BaOaFBQ2ddua08&metric=true.json`);

    const responseData = await response.json();

    return responseData;
  }

  // Change weather location
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}*/

class Weather {
  constructor(city, state) {
    this.apiKey = '9iHAYolfpIZFCHqIL7BaOaFBQ2ddua08';
    this.city = city;
    this.state = state;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json`);

    // https://dataservice.accuweather.com/forecasts/v1/daily/5day/56186?apikey=9iHAYolfpIZFCHqIL7BaOaFBQ2ddua08&metric=true.json

    const responseData = await response.json();

    return responseData.current_observation;
  }

  // Change weather location
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}