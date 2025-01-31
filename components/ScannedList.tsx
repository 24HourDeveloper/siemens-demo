import { FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'

type ScannedListTypes<T> = {
  items: T[]
  onPress: (item: T) => void
  children: (item: T) => React.ReactNode
}

export default function ScannedList<T extends { id: string }>({ items, onPress, children }: ScannedListTypes<T>) {
  const color = useThemeColor({ light: "black", dark: 'white' }, 'text')
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => onPress(item)}
          style={[styles.scannedItem, {borderColor: color}]}
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
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 10
  }
})