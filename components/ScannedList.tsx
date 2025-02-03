import { FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useColorScheme } from '@/hooks/useColorScheme'

type ScannedListTypes<T> = {
  items: T[]
  onPress: (item: T) => void
  children: (item: T) => React.ReactNode
}

export default function ScannedList<T extends { id: string }>({ items, onPress, children }: ScannedListTypes<T>) {
  const theme = useColorScheme() ?? 'light'
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => onPress(item)}
          style={[styles.scannedItem, {backgroundColor: theme === 'light' ? 'white' : '#121211'}]}
        >
          {children(item)}
        </TouchableOpacity>
      )}}
      keyExtractor={item => item.id}
    />
  )
}

const styles = StyleSheet.create({
  scannedItem: {
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
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