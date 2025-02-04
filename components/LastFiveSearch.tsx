import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'
import ListItemContainer from './ListItemContainer'

type LastFiveSearchTypes<T> = {
  items: T[]
}

export default function LastFiveSearch({ items }: LastFiveSearchTypes<string>) {
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={{ textAlign: 'center'}}>
        Last Five Searched
      </ThemedText>
      <FlatList
        data={items.slice(0, 5)}
        renderItem={({ item }) => {
        return (
          <ListItemContainer styles={{ display: 'flex', alignItems: 'center' }}>
            <ThemedText style={{ fontSize: 22 }}>{item}</ThemedText>
          </ListItemContainer>
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
  }
})