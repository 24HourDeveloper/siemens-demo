import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { WeatherType } from '@/types'
import { ThemedText } from './ThemedText'
import TemperatureText from './TemperatureText'

export default function CurrentView({ weather }: { weather: WeatherType | null }) {
  if (!weather) return null
  return (
    <View style={styles.container}>
      <ThemedText type="title">{weather.current.condition.text}</ThemedText>
      <View style={styles.currentTemp}>
        <TemperatureText size="lg" temp={weather.current.temp_f} />
        <Image
          source={{ uri: `https:${weather.current.condition.icon}` }}
          style={{ width: 50, height: 50 }}
          contentFit='cover'
        />
      </View>
      <TemperatureText size="sm" temp={weather.current.feelslike_f} extraText='Feels like'/>
      <TemperatureText size="sm" temp={weather.current.humidity} extraText='Humidity'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  currentTemp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  }
})