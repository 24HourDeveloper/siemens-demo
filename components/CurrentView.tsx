import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { WeatherType } from '@/types'
import { ThemedText } from './ThemedText'

export default function CurrentView({ weather }: { weather: WeatherType }) {
  if (!weather) return null
  return (
    <View style={styles.container}>
      <ThemedText type="title">{weather.current.condition.text}</ThemedText>
      <View style={styles.currentTemp}>
        <ThemedText style={{ fontSize: 48, lineHeight: 48 }}>{weather.current.temp_f}</ThemedText>
        <Image
          source={{ uri: `https:${weather.current.condition.icon}` }}
          style={{ width: 50, height: 50 }}
          contentFit='cover'
        />
      </View>
      <ThemedText style={{ fontSize: 22 }}>Feels like {weather.current.feelslike_f}°</ThemedText>
      <ThemedText style={{ fontSize: 22 }}>Humidity: {weather.current.humidity}°</ThemedText>
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