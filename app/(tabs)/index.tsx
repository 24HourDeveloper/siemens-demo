import { View, Text, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { Image } from 'expo-image';

type WeatherType = {
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
    forecastday: {
      date: string,
      day: {
        condition: {
          text: string
        },
        maxtemp_f: number,
        mintemp_f: number
      }
    }[]
  }
}

const formatToDay = (date: string) => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('en-US', { weekday: 'short' })
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

  return (
    <View>
      <View style={{ display: 'flex', alignItems: 'center', gap: 10}}>
        <Text>{weather.current.condition.text}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 48}}>{weather.current.temp_f}</Text>
          <Image
            source={{ uri: `https:${weather.current.condition.icon}` }}
            style={{ width: 60, height: 60 }}
          />
        </View>
        <Text>Feels like {weather.current.feelslike_f}°</Text>
        <Text>Humidity: {weather.current.humidity}°</Text>
      </View>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10}}>  
        <Text>5 Day Forecast</Text>
        <ScrollView horizontal contentContainerStyle={{ display: 'flex', width: '90%', gap: 10}}>
          {weather.forecast.forecastday.map((day: any) => (
            <View key={day.date} style={{borderWidth: 1, borderRadius: 8, display: 'flex', alignItems: 'center', padding: 10}}>
              <Text>{formatToDay(day.date)}</Text>
              <Image
                source={{ uri: `https:${day.day.condition.icon}` }}
                style={{ width: 60, height: 60 }}
              />
              <Text>{day.day.maxtemp_f}°</Text>
              <Text>{day.day.mintemp_f}°</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}