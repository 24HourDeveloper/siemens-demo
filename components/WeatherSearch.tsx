import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from './ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

type WeatherSearchTypes = {
  setLastFive: (text: string) => void
}

export default function WeatherSearch({ setLastFive }: WeatherSearchTypes) {
  const color = useThemeColor({ light: "black", dark: 'white' }, 'text')
  const [input, setInput] = useState('')

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search for a city" style={styles.searchInput} onChangeText={(text) => setInput(text)}/>
      <TouchableOpacity
        onPress={() => setLastFive(input)}
        style={[styles.scannedItem, {borderColor: color}]}
      >
          <ThemedText style={{ fontSize: 22 }}>Search</ThemedText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    fontSize: 22,
    borderRadius: 10,
    height: 50,
    paddingLeft: 10,
    flex: 3
  },
  scannedItem: {
    borderWidth: 1,
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