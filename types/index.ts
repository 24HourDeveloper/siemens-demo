export type WeatherType = {
  current: {
    condition: {
      text: string
      icon: string
    },
    temp_f: number,
    feelslike_f: number,
    humidity: number,
  },
  forecast: {
    forecastday: WeatherDayType[]
  }
} | null
  
export type WeatherDayType = {
  date: string,
  day: {
    condition: {
      text: string,
      icon: string
    },
    maxtemp_f: number,
    mintemp_f: number
  }
}