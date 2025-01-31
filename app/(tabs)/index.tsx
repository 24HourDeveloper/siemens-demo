import { View, Text } from 'react-native'
import { type ErrorBoundaryProps } from 'expo-router'
import { IconSymbol } from '@/components/ui/IconSymbol'
import CurrentView from '@/components/CurrentView'
import ForecastListView from '@/components/ForecastListView'
import useForecast from '@/hooks/useForecast'

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
  const weather = useForecast()

  if (!weather) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  
  return (
    <>
      <CurrentView weather={weather} />
      <ForecastListView forecastDays={weather.forecast.forecastday} />
    </>
  )
}