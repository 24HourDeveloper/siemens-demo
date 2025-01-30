import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { WeatherType } from '@/types'

export default function CurrentView({ weather }: { weather: WeatherType }) {
  return (
    <View style={styles.container}>
      <Text>{weather.current.condition.text}</Text>
      <View style={styles.currentTemp}>
          <Text style={{ fontSize: 48 }}>{weather.current.temp_f}</Text>
          <Image
          source={{ uri: `https:${weather.current.condition.icon}` }}
          style={{ width: 60, height: 60 }}
          />
      </View>
      <Text>Feels like {weather.current.feelslike_f}°</Text>
      <Text>Humidity: {weather.current.humidity}°</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  currentTemp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})