module.exports = class Weather {

  constructor(temperature, apparentTemperature, address, summary, humidity, windSpeed, windGust) {
    
    this.temperature = temperature,
      this.apparentTemperature = apparentTemperature,
      this.address = address,
      this.summary = summary,
      this.humidity = humidity,
      this.windSpeed = windSpeed,
      this.windGust = windGust
  }
}