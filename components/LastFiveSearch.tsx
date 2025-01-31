import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

type LastFiveSearchTypes<T> = {
  items: T[]
}

export default function LastFiveSearch({ items }: LastFiveSearchTypes<string>) {
  const color = useThemeColor({ light: "black", dark: 'white' }, 'text')
  return (
    <View style={styles.container}>
      <ThemedText type="title">Last Five Searched</ThemedText>
      <FlatList
        data={items.slice(0, 5)}
        renderItem={({ item }) => {
        return (
          <View
            style={[styles.scannedItem, {borderColor: color}]}
          >
            <ThemedText style={{ fontSize: 22 }}>{item}</ThemedText>
          </View>
        )}}
        keyExtractor={item => item}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 20,
      height: 200,
    },
    scannedItem: {
      borderWidth: 1,
      borderRadius: 10,
      padding: 8,
      marginBottom: 10,
      display: 'flex',
    }
  })