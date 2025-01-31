import { View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { formatToDay } from '@/utils/formatToDay'
import { WeatherDayType } from '@/types'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from './ThemedText'

export default function ForecastListView({ forecastDays }: { forecastDays: WeatherDayType[] }) {
  const color = useThemeColor({ light: "black", dark: 'white' }, 'text')
  return (
    <View style={styles.container}>  
      <ThemedText>5 Day Forecast</ThemedText>
      <ScrollView horizontal contentContainerStyle={styles.forecastScrollContainer}>
        {forecastDays.map((dayOfWeek: WeatherDayType) => (
          <View key={dayOfWeek.date} style={[styles.forecastItem, { borderColor: color }]}>
            <ThemedText>{formatToDay(dayOfWeek.date)}</ThemedText>
            <Image
              source={{ uri: `https:${dayOfWeek.day.condition.icon}` }}
              style={{ width: 60, height: 60 }}
            />
            <ThemedText>{dayOfWeek.day.maxtemp_f}°</ThemedText>
            <ThemedText>{dayOfWeek.day.mintemp_f}°</ThemedText>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20
  },
  forecastScrollContainer: {
    display: 'flex',
    width: '90%',
    gap: 10
  },
  forecastItem: {
    borderWidth: 1,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    padding: 10
  }
})