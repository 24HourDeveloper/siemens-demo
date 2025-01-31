import { useState, useEffect } from 'react'
import { WeatherType } from '@/types'
import Constants from 'expo-constants'
// import { WEATHER_API_KEY } from '@env'

export default function useForecast(location: string) {
    const [weather, setWeather] = useState<WeatherType | null>(null)
    console.log(process.env)
    const FORECAST_URL = Constants.expoConfig?.extra?.FORECAST_URL
    const { WEATHER_API_KEY } = process.env
    const url = `${FORECAST_URL}${WEATHER_API_KEY}&q=${location}&days=5&aqi=no&alerts=no`

    const fetchWeather = async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setWeather(data)
      } catch (error) {
        console.error('Error fetching weather', error)
      }
    }
  
    useEffect(() => {
      fetchWeather()
    }, [location])

    return weather
}