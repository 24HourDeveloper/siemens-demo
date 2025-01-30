import { useState, useEffect } from 'react'
import { WeatherType } from '@/types'

export default function useForecast() {
    const [weather, setWeather] = useState<WeatherType | null>(null)
    const { EXPO_PUBLIC_FORECAST_URL, EXPO_PUBLIC_WEATHER_API_KEY } = process.env
    const url = `${EXPO_PUBLIC_FORECAST_URL}${EXPO_PUBLIC_WEATHER_API_KEY}&q=30331&days=5&aqi=no&alerts=no`

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
    }, [])

    return weather
}