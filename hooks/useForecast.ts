import { useState, useEffect } from 'react'
import { WeatherType } from '@/types'
import Constants from 'expo-constants'

export default function useForecast(location: string) {
    const [weather, setWeather] = useState<WeatherType | null>(null)
    const [loading, setLoading] = useState(true)
    const WEATHER_API_KEY = Constants.expoConfig?.extra?.WEATHER_API_KEY
    const FORECAST_URL = Constants.expoConfig?.extra?.FORECAST_URL
    const url = `${FORECAST_URL}${WEATHER_API_KEY}&q=${location}&days=5&aqi=no&alerts=no`

    const fetchWeather = async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setLoading(false)
        setWeather(data)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching weather', error)
      }
    }
  
    useEffect(() => {
      fetchWeather()
    }, [location])

    return {weather, loading}
}