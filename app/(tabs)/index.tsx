import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { type ErrorBoundaryProps } from 'expo-router'
import { IconSymbol } from '@/components/ui/IconSymbol';
import { WeatherType } from '@/types'
import CurrentView from '@/components/CurrentView'
import ForecastListView from '@/components/ForecastListView'

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30}}>Sorry problem fetching weather.</Text>
      <IconSymbol size={50} name="circle.slash" color="red" />
      <Text onPress={retry}>Try Again?</Text>
    </View>
  );
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherType | null>(null)
  const { EXPO_PUBLIC_FORECAST_URL, EXPO_PUBLIC_WEATHER_API_KEY } = process.env
  const url = `${EXPO_PUBLIC_FORECAST_URL}${EXPO_PUBLIC_WEATHER_API_KEY}&q=30331&days=5&aqi=no&alerts=no`
  const fetchWeather = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setWeather(data)
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  if (!weather) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  
  const { forecastday } = weather.forecast

  return (
    <>
      <CurrentView weather={weather} />
      <ForecastListView forecastDays={forecastday} />
    </>
  )
}