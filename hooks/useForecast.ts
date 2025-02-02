import { useState, useEffect } from 'react'
import { WeatherType } from '@/types'

export default function useForecast(location: string) {
  const [weather, setWeather] = useState<WeatherType | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchWeather = async () => {
    try {   
      const response = await fetch(`/weather/${location}`)
      const data = await response.json()
  
      setLoading(false)
      setWeather(data)
    } catch (error) {
      console.error('Error fetching weather', error)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [location])

  return {weather, loading}
}