import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from './ThemedText'
import { useColorScheme } from '@/hooks/useColorScheme'

type WeatherSearchTypes = {
  setLastFive: (text: string) => void
}

export default function WeatherSearch({ setLastFive }: WeatherSearchTypes) {
  const theme = useColorScheme() ?? 'light'
  const [input, setInput] = useState('')
  return (
    <View style={styles.container}>
      <TextInput placeholder="Search for a city" style={styles.searchInput} onChangeText={(text) => setInput(text)}/>
      <TouchableOpacity
        onPress={() => setLastFive(input)}
        style={[styles.scannedItem, {backgroundColor: theme === 'light' ? 'black' : '#121211'}]}
      >
          <ThemedText style={{ fontSize: 22, color: 'white' }}>Search</ThemedText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    fontSize: 22,
    borderRadius: 10,
    height: 50,
    paddingLeft: 10,
    flex: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.0,
    elevation: 2,
    backgroundColor: 'white',
  },
  scannedItem: {
    borderRadius: 10,
    padding: 8,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
})