import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { formatToDay } from '@/utils/formatToDay'
import { WeatherDayType } from '@/types'
import { ThemedText } from './ThemedText'
import { useColorScheme } from '@/hooks/useColorScheme'
import TemperatureText from './TemperatureText'

export default function ForecastListView({ forecastDays }: { forecastDays: WeatherDayType[] | undefined }) {
  const theme = useColorScheme() ?? 'light'
  const color = theme === 'light' ? 'white' : '#121211'
  if (!forecastDays) return null
  return (
    <View style={styles.container}>  
      <ThemedText type="title">5 Day Forecast</ThemedText>
      <FlatList
        data={forecastDays}
        horizontal
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={[styles.forecastItem, { backgroundColor: color }]}>
            <ThemedText style={{ fontSize: 24 }}>{formatToDay(item.date)}</ThemedText>
            <Image
              source={{ uri: `https:${item.day.condition.icon}` }}
              style={{ width: 60, height: 60 }}
            />
            <TemperatureText size="sm" temp={item.day.maxtemp_f} />
            <TemperatureText size="sm" temp={item.day.mintemp_f} />
          </View>
        )}
        contentContainerStyle={styles.forecastScrollContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  forecastScrollContainer: {
    display: 'flex',
    gap: 10,
  },
  forecastItem: {
    borderRadius: 10,
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
    marginBottom: 10
  }
})