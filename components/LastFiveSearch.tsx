import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useColorScheme } from '@/hooks/useColorScheme'

type LastFiveSearchTypes<T> = {
  items: T[]
}

export default function LastFiveSearch({ items }: LastFiveSearchTypes<string>) {
  const color = useThemeColor({ light: "black", dark: 'white' }, 'text')
  const theme = useColorScheme() ?? 'light'
  return (
    <View style={styles.container}>
      <ThemedText type="title">Last Five Searched</ThemedText>
      <FlatList
        data={items.slice(0, 5)}
        renderItem={({ item }) => {
        return (
          <View
            style={[styles.scannedItem, {backgroundColor: theme === 'light' ? 'white' : '#121211'}]}
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
      gap: 10,
      marginTop: 20,
      height: 200,
    },
    scannedItem: {
      borderRadius: 10,
      padding: 8,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 1.0,
      elevation: 2,
    }
  })