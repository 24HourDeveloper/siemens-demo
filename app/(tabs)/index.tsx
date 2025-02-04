import { useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { type ErrorBoundaryProps } from 'expo-router'
import { IconSymbol } from '@/components/ui/IconSymbol'
import CurrentView from '@/components/CurrentView'
import ForecastListView from '@/components/ForecastListView'
import useForecast from '@/hooks/useForecast'
import WeatherSearch from '@/components/WeatherSearch'
import useWeatherSearch from '@/hooks/useWeatherSearch'
import LastFiveSearch from '@/components/LastFiveSearch'

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30}}>Sorry problem fetching weather.</Text>
      <IconSymbol size={50} name="circle.slash" color="red" />
      <Text onPress={retry}>Try Again?</Text>
    </View>
  )
}

export default function Weather() {
  const [lastFive, setLastFive] = useState<string[]>([])
  const {searchWeather, search} = useWeatherSearch()
  const {weather, loading} = useForecast(search)

  if (loading) {
    return (
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  const handleLastFive = (item: string) => {
    searchWeather(item)
    setLastFive((prev: string[]) => [...prev, item])
  }
  
  return (
    <View style={{padding: 10}}>
      <WeatherSearch setLastFive={handleLastFive}/>
      <CurrentView weather={weather} />
      <ForecastListView forecastDays={weather?.forecast.forecastday} />
      { lastFive.length <= 5 ? null : <LastFiveSearch items={lastFive} /> }
    </View>
  )
}