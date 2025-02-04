import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { formatToDay } from '@/utils/formatToDay'
import { WeatherDayType } from '@/types'
import { ThemedText } from './ThemedText'
import TemperatureText from './TemperatureText'
import ListItemContainer from './ListItemContainer'

export default function ForecastListView({ forecastDays }: { forecastDays: WeatherDayType[] | undefined }) {
  if (!forecastDays) return null
  return (
    <View style={styles.container}>  
      <ThemedText type="title">5 Day Forecast</ThemedText>
      <FlatList
        data={forecastDays}
        horizontal
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <ListItemContainer styles={styles.forecastItem}>
            <ThemedText style={{ fontSize: 24 }}>{formatToDay(item.date)}</ThemedText>
            <Image
              source={{ uri: `https:${item.day.condition.icon}` }}
              style={{ width: 60, height: 60 }}
            />
            <TemperatureText size="sm" temp={item.day.maxtemp_f} />
            <TemperatureText size="sm" temp={item.day.mintemp_f} />
          </ListItemContainer>
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
    gap: 10,
    display: 'flex',
  },
  forecastItem: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  }
})