import { Text, View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { formatToDay } from '@/utils/formatToDay'
import { WeatherDayType } from '@/types'

export default function ForecastListView({ forecastDays }: { forecastDays: WeatherDayType[] }) {
  return (
    <View style={styles.container}>  
      <Text>5 Day Forecast</Text>
      <ScrollView horizontal contentContainerStyle={styles.forecastScrollContainer}>
        {forecastDays.map((dayOfWeek: WeatherDayType) => (
          <View key={dayOfWeek.date} style={styles.forecastItem}>
            <Text>{formatToDay(dayOfWeek.date)}</Text>
            <Image
              source={{ uri: `https:${dayOfWeek.day.condition.icon}` }}
              style={{ width: 60, height: 60 }}
            />
            <Text>{dayOfWeek.day.maxtemp_f}°</Text>
            <Text>{dayOfWeek.day.mintemp_f}°</Text>
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
    gap: 10
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