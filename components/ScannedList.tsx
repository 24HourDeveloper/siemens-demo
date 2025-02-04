import { FlatList } from 'react-native'
import React from 'react'
import ListItemContainer from './ListItemContainer'

type ScannedListTypes<T> = {
  items: T[]
  onPress: (item: T) => void
  children: (item: T) => React.ReactNode
}

export default function ScannedList<T extends { id: string }>({ items, onPress, children }: ScannedListTypes<T>) {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
      return (
        <ListItemContainer onPress={() => onPress(item)} touchable={true}>
          {children(item)}
        </ListItemContainer>
      )}}
      keyExtractor={item => item.id}
    />
  )
}
