import { View, ScrollView, StyleSheet, FlatList } from 'react-native'
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
      <ThemedText type="title">5 Day Forecast</ThemedText>
      <FlatList
        data={forecastDays}
        horizontal
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={[styles.forecastItem, { borderColor: color }]}>
            <ThemedText style={{ fontSize: 22 }}>{formatToDay(item.date)}</ThemedText>
            <Image
              source={{ uri: `https:${item.day.condition.icon}` }}
              style={{ width: 60, height: 60 }}
            />
            <ThemedText style={{ fontSize: 22 }}>{item.day.maxtemp_f}°</ThemedText>
            <ThemedText style={{ fontSize: 22 }}>{item.day.mintemp_f}°</ThemedText>
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
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    
  }
})